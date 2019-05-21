# Hook
Hook from 16.8 . u can use state even if no class.

## 1 useState  or State Hook
### 使用场景
在编写函数组件并意识到需要向其添加一些 state时，像以前的做法是必须将其它转化为 class 才能使用state。<br />
然后再函数组件中使用 函数式的 Hook 可以像class一样使用state。

### 调用 state 都做了什么
首先定义一个 “state 变量” 名字可以是任意 比如 the-last。<br />
是一种在函数调用时保存变量的方式 —— useState<br />
一般来说，在函数退出后变量就就会”消失”，而 state 中的变量会被 React 保留。<br />
它与 class 里面的 this.state 提供的功能完全相同。

### useState 需要哪些参数
useState() 方法里面唯一的参数就是初始 state。<br />
不同于 class，可以按照需要使用数字、字符串、数组、对象等对其进行赋值，不一定是对象。<br />
如果想在 state 中存储两个不同的变量，只需调用 useState() 两次。

### useState 方法的返回值是什么
返回值为：当前 state 以及更新 state 的函数。<br />
就是 const [count, setCount] = useState()。<br />
这与 class 里面 this.state.count 和 this.setState 类似<br />
唯一区别就是需要成对的获取，获取的方式不同。<br />
useState() 返回的是一个数组 [0] state， [1] setState

### react 如何判断 useState 对应的是哪个组件
React 保持对当先渲染中的组件的追踪。<br />
Hook规范，Hook 只会在 React 组件中被调用 <br />
自定义 Hook —— 同样只会在 React 组件中被调用。<br />
每个组件内部都有一个「记忆单元格」列表 存储一些数据的 JavaScript 对象<br />
当用 useState() 调用一个 Hook 时，它会读取当前的单元格（或在首次渲染时将其初始化）<br />
然后把指针移动到下一个，这就是多个 useState() 调用会得到各自独立的本地 state 的原因。

## 2 useEffect  or Effect Hook

### 1、功能和作用
useEffect 当前函数组件内充当生命周期函数的角色<br />
类似 生命周期中 componentDidMount  componentDidUpdate  componentWillUnmount的组合 <br />
在react 组件中有两种常见的副作用操作。 需要被清除的、不需要被清除的 <br />

### 2、无需清除的 Effect

#### 无需清除的操作有哪些？
常见的记录日志、更新DOM、网络请求等。都是不需要被清除的操作。<br />
使用class做副作用操作会用到类似以下的生命周期函数。 <br />
```
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  // 在componentDidMount componentDidUpdate 需要写上重复的代码
```
##### 使用effect 可以同时满足以上两个函数达到的效果

### 3、Effect做了什么 ？
通过这个组件，可以通知React在渲染更新后执行某些操作。 并且React会保留这个函数（及 useEffect）<br />
所以，我们就可以在 useEffect中做一些事情。<br />

### 4、为何在组件内部调用 useEffect ?
放在组件内部让我们可以直接访问 组件是state变量，因为已经在函数的作用域中。<br />
React useEffect使用闭包机制 无需再引入特定api<br />

### 5、useEffect会在每次渲染后都执行吗 ？
是 默认情况下，它在第一次渲染后和每次渲染更新后都会执行。于是不用再考虑是挂在还是更新导致的渲染。<br />
React保证运行Effect时，DOM已是最新。<br />

### 6、Effect的详解
每次我们重新渲染，都会生成新的Effect，换掉之前的Effect。Effect更像是渲染结果的一部分 -- 每个Effect属于渲染结果的一部分。<br />
与 生命周期函数 略有不同。useEffect调用的Effect不会阻塞浏览器渲染，响应快.<br />
大部分情况下是异步执行， 在特殊情况下可以使用 useLayoutEffect <br />

### 7、需要清除的Effect
有些情况需要清除Effect很有必要，例如引用了外部数据源。清理将避免内存泄漏。<br />
在class的写法中清理副作用的情况，一般会这样写
```
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribe(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribe(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
}
// 在文档介绍Effect作用是，将这里描述为 拆分了逻辑代码
```
##### useEffect实现会简单很多。
```
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        // 执行订阅
        ChatAPI.subscribe(props.friend.id, handleStatusChange);

        // 在Effect之后清理，取消订阅，但是这里是个返回函数奇怪。
        return function cleanup() {
            ChatAPI.unsubscribe(props.friend.id, handleStatusChange);
        };
    });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
### 8、为什么会在Effect中返回一个函数 ？
其实是一个可选清除机制。<br />
每个Effect都会返回一个清除函数。或者你也可以不返回就没有取消或移除的逻辑。<br />
然后，就可以将添加订阅、移除订阅写在一起。

### 9、对React来说，何时会清除Effect呢 ？
在组件卸载的时候会清除Effect，也是执行当前Effect清除上一个Effect的原因。

### 10、为什么每次更新的时候都会执行Effect呢 ？
class的写法是 只在卸载的时候执行一次 componentWillUnmount回调函数，比Effect模式少了很多回调。<br />
effect 每次都跟新这个设计实际上会减少很多bug. <br />
如第7条提到的class实现好友上线订阅的情况，其实隐藏了bug ，正确的写法应该考虑到didUpdate情况，如下。
```
  componentDidMount() {
    ChatAPI.subscribe(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentDidUpdate(prevProps) {
    // 取消订阅之前的 friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // 订阅新的 friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribe(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```
使用Effect就不会有这种遗漏更新的bug出现，因为Effect默认是会处理。<br />
在调用一个Effect之前，清理上一个Effect，保证了更新

### 如何跳过useEffect 进行性能优化 ？
一般在class组件中 DidUpdate周期函数中做判断，判断更新是否是必要的。
```
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `点击${this.state.count} 次`;
  }
}
```
useEffect已经内置了这个判断，修改下useEffect的用法即可，写法如下 <br />
```
useEffect(() => {
  document.title = `点击${count} 次`;
}, [count]);

// 此时，如果count不发生变化不会执行useEffect函数。 
// 对于有清除操作的effect，同样适用。
```

## 3 useContext or  Context Hook
接受 Context 作为参数，其他不能接受。
```
const value = useContext(MyContext);
useContext(MyContext);            //正确
useContext(MyContext.Consumer);   //错误
useContext(MyContext.Provider);   //错误
```
useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。<br />
仍然需要上层组件提供 <MyContext.Provider> 给下层组件提供 context。

## useReducer or Reducer Hook
useState 的替代方案
```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
写法(state, action) => newState 的 reducer，并返回当前的state和dispatch配套方法。<br />
1，state比较复杂的情况<br />
2，state依赖上一个state值<br />
可以对触发**深更新**的组件做优化，向子组件传递dispatch而不是 回调函数。


## 4 Hooks 规则
hooks 本质上也是js函数，需要满足以下两个规则，可以参考linter插件 [hooks-linter](https://www.npmjs.com/package/eslint-plugin-react-hooks, 'hooks使用规范')<br />
* 只在最顶层使用Hook
不在循环，嵌套函数中使用Hook。能确保 Hook 在每一次渲染中都按照同样的顺序被调用<br />
保证在多次的useState和useEffect之间保持hook状态的正确性。
```
// 违反规则的写法，这个hook未在最顶层，后面会影响Hook的调用顺序导致bug。
if (name !== '') {
    useEffect(function persistForm () {
        localStorage.setItem('formData', name);
    });
}
// 正确的写法
useEffect(function persistForm() {
    // 👍 判断条件写在 effect 中
    if (name !== '') {
        localStorage.setItem('formData', name);
    }
});
```

* 只在React函数中调用Hook
不要在普通的js函数中调用Hook<br />
可以在自定义Hook中调用其他Hook，可以在函数组件中调用Hook。

* React 是如何知道useState对应的是哪个Hook ？
React靠的是调用的顺序，调用顺序相同，渲染结果一样。


## 5 自定义Hooks
##### 通过自定义的Hook，可以将组建逻辑提取到可重用的函数中。
##### hooks本身就是函数。

### 声明自定义Hook
提取自定义Hook，名称以’use‘开头，函数内部可以调用其他的Hook。<br />
像一个正常的函数，可以定义它的返回值，或者其他内部操作。<br />
```
import React, { useState, useEffect } from 'react';
// 自定义hook，传入用户ID作为参数，检查在线状态。
function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);

        return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
    });
    return isOnline;
}
```

### 使用自定义Hook
使用hook方法的实现。
```
function FriendListItem(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    );
}
```
自定义hook提取可复用逻辑的 hook
```
function FriendListItem(props) {
    const isOnline = useFriendStatus(props.friend.id); // 使用自定义hook，直接获取hook的返回值。

    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    );
}
```
自定义hook的代码和之前写法是一样的，完全等价。 <br />
##### 自定义Hook是一种自然遵循Hook设计的**约定**，并不是React特性。
必须以**use**开头，方便React检查函数中是否引用了hook，并且方便进行Hook规则的检查。

### 两个组件中使用相同hook会共享state吗 ？
不会，自定义Hook是一种重用状态逻辑的机制，其中所有state和副作用都是隔离的。

### 多个Hook之间传递信息
```
const [recipientID, setRecipientID] = useState(1);
const isRecipientOnline = useFriendStatus(recipientID);
```

## 6 总结
- 基础 Hook
    - useState
    - useEffect
    - useContext

- 额外的 Hook
    - useReducer
    - useCallback
    - useMemo
    - useRef
    - useImperativeHandle
    - useLayoutEffect
    - useDebugValue

**手动实践会有收获**