## react 事件机制
react事件三个要素
- 事件注册 **ReactEventListener** 将 事件 注册到document节点上，事件分发主要靠的是 dispatchEvent（触发事件）进行，向父节点遍历。 <br />
- 事件触发 **ReactEventEmitter** 负责每个组件事件的执行。<br />
- 回调事件存储 **EventPluginHub** 负责回调事件存储。<br />

### 1 ReactEventListener 负责事件注册事件分发
事件注册从 ReactDOMComponent在进行组件加载时，会调用入口方法 mountComponent，在组件更新时会调用 updateComponent方法<br >
这两个方法都会调用 **_updateDOMProperties** 方法，在这个函数有这样一段逻辑 -- <br >
```
ReactDOMComponent.Mixin = {
  /**
   * lastProp 表示上一次的属性
   * nextProp表示创建或者更新的属性
   */
  _updateDOMProperties: function (lastProps, nextProps, transaction) {
    ... 
    // 如果是props这个对象直接声明的属性，则处理
    else if (registrationNameModules.hasOwnProperty(propKey)) {
        // 对于mountComponent updateComponent 则 nextProp 不为null
        // 对于unmountComponent 则 nextProp 为null
        if (nextProp) {
            // enqueuePutListener 注册事件在 mount update 时
            enqueuePutListener(this, propKey, nextProp, transaction);
        } else if (lastProp) {
            // 删除注册的listener，防止内存泄漏，在 unmountComponent 时
            deleteListener(this, propKey);
        }
    }
  }
}
```
**关键一步** <br >
_updateDOMProperties调用 **enqueuePutListener** <br >
主要负责两件事，
- 1 在document上注册JSX中声明的事件 <br >
- 2 采用事务队列的方式存储 注册事件 <br >
```
/**
 * inst:             React 组件实例 instance
 * registrationName: React合成事件名，如onClick
 * listener:         React事件回调方法，如onClick=callback中的callback
 * transaction:      mountComponent或updateComponent所处的事务流，React都是基于事务流
 */
function enqueuePutListener(inst, registrationName, listener, transaction) {
  if (transaction instanceof ReactServerRenderingTransaction) {
    return;
  }
  var containerInfo = inst._hostContainerInfo;
  var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE;

  // 找到 组件上的document节点 从组件实例的 _hostContainerInfo
  var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;

  // 注册事件，将事件注册到document上，方便事件冒泡触发
  listenTo(registrationName, doc);

  // 存储事件,放入事务队列中，包括组件实例、事件名、回调函数
  transaction.getReactMountReady().enqueue(putListener, {
    inst: inst,
    registrationName: registrationName,
    listener: listener
  });
}
```
listenTo 方法注册事件，区分冒泡和捕获方式。 <br >
- 冒泡方式触发（默认），onClick   ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent <br >
- 捕获方式触发，onCaptureClick   ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent <br >
listenTo 源码： <br />
```
//ReactEventListener.js
var ReactEventListener = {
  ...
  trapBubbledEvent: function (topLevelType, handlerBaseName, element) {
    ...
    return EventListener.listen(
        element,          //绑定到的DOM节点
        handlerBaseName,  //事件类型
        ReactEventListener.dispatchEvent.bind(null, topLevelType)  //绑定回调函数
      );
  },
  trapCapturedEvent: function (topLevelType, handlerBaseName, element) {
    var handler = ReactEventListener.dispatchEvent.bind(null, topLevelType);
    return EventListener.capture(element, handlerBaseName, handler);
  }
  // 添加事件监听  兼容浏览器
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      // 标准规范方式
      target.addEventListener(eventType, callback, false);
      return {
        // 合成事件会自动销毁
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      // IE的方式
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },
  //事件分发，都执行统一的回调函数 handleTopLevelImpl
  dispatchEvent: function (topLevelType, nativeEvent) {
    ...
    ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
    ...
  }
}

```
### 2 存储事件
在 **函数enqueuePutListener** 中会调用 putListener 存储事件。 <br >
```
/**
* EventPluginHub用来存储React事件, 将listener存储到`listenerBank[registrationName][key]`
*
* @param {object} inst: 事件源
* @param {string} 事件属性，比如onClick
* @param {function} callback
*/
putListener: function (inst, registrationName, listener) {

	// 找到React对象关键字，key的格式为'.nodeId'
	var key = getDictionaryKey(inst);

	// 找到注册事件
	var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
	
	// listenerBank[registrationName] 相当于同类事件汇总对象
	// React事件都在 listenerBank 中
	// 将listener事件存入listenerBank[registrationName][key]中,比如listenerBank['onclick'][nodeId]
	bankForRegistrationName[key] = listener;
},

// 获取字典关键字
var getDictionaryKey = function (inst) {
	return '.' + inst._rootNodeID;
}
```
### 3 事件触发
React事件注册在 **document** 上，触发事件都是通过 **ReactEventListener.dispatchEvent** <br />
dispatchEvent 事件源码实现 <br>
```
var ReactEventListener = {
    // topLevelType：事件名
    // nativeEvent: 用户触发onClick等事件时浏览器原生事件
    dispatchEvent: function (topLevelType, nativeEvent) {
        ...
        // React 事件流放入批处理队列
        ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
        ...
    }
}
// handleTopLevelImpl 是事件分发执行的核心点，也是 React 事件分发的体现
function handleTopLevelImpl(bookKeeping) {
    // 根据原生的事件对象，找到事件触发的dom元素 
    var nativeEventTarget = getEventTarget(bookKeeping.nativeEvent);

	// 根据事件对象找到 component 实例
    var targetInst = ReactDOMComponentTree.getClosestInstanceFromNode(nativeEventTarget);

    // 执行事件回调前, 由当前组件向上遍历它的所有父组件。
    // 因为事件回调中可能会改变Virtual DOM结构, 所以要先遍历好组件层级， 得到ancestors祖先数组
    var ancestor = targetInst;
    do {
        bookKeeping.ancestors.push(ancestor);
        ancestor = ancestor && findParent(ancestor);
    } while (ancestor);

    // 从当前组件向父组件遍历,依次执行注册的回调方法.
	// 我们遍历祖先数组时, 是从当前组件向父组件回溯的, 事件回调也是这个顺序。
    // 这个顺序就是冒泡的顺序,并且我们发现 -- 不能通过stopPropagation来阻止冒泡 --。
    for (var i = 0; i < bookKeeping.ancestors.length; i++) {
        targetInst = bookKeeping.ancestors[i];

        // _handleTopLevel是初始化时用 ReactEventEmitterMixin 注入进来的
        ReactEventListener._handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
    }
}

// ReactEventEmitterMixin.js
// ReactEventEmitterMixin一方面生成合成的事件对象，另一方面批量执行定义的回调函数

var ReactEventEmitterMixin = {
    // handleTopLevel方法是事件回调函数调用的核心。DOM事件绑定在了document原生对象上, 每次事件触发, 都会调用到handleTopLevel
    handleTopLevel: function (...) {
    // 利用浏览器回传的原生事件构造出React合成事件。不同的eventType的合成事件可能不同
    var events = EventPluginHub.extractEvents(...); 
        //采用队列的方式处理回调函数
        runEventQueueInBatch(events); 
    }
}
//进行批量更新
function runEventQueueInBatch(events) {
    EventPluginHub.enqueueEvents(events);
    EventPluginHub.processEventQueue(false);
}

// 阻止合成事件的冒泡
e.stopPropagation();
// 阻止与原生事件的冒泡
e.nativeEvent.stopImmediatePropagation();
```
### 4 生成合成事件
```
// EventPluginHub.js
var EventPluginHub = {
    extractEvents: function (...) {
        var events;
        // EventPluginHub可以存储React合成事件的callback,也存储了一些plugin,这些plugin在EventPluginHub初始化时注册的
        var plugins = EventPluginRegistry.plugins;
        for (var i = 0; i < plugins.length; i++) {
			var possiblePlugin = plugins[i];
			if (possiblePlugin) {
			
				// 根据eventType构造不同的合成事件SyntheticEvent
				var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
				if (extractedEvents) {
					// 将构造好的合成事件extractedEvents添加到events数组中,这样就保存了所有plugin构造的合成事件
					events = accumulateInto(events, extractedEvents);
				}
			}
		}
		return events;
    }
}

```

<br >
<br >
<br >
<br >
<br >