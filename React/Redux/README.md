## Redux用法

### redux主要解决了什么问题

- 组件间通信 共享数据
官方文档提到，redux提供**可预测**状态管理。 主要 用于解决React组件间通信、组件间共享数据。 <br />
主要包括api （store, action, reducer) . 

- 通过修改store驱动 组件生命周期

**优势**：代码更规范，区分容器组件和展示组件，参考redux-react connect的方法类似装饰器模式。<br />
在用法、写法、多store管理上mobx会比redux更简洁，mobx可以使用类装饰器、函数装饰器封装store的class类方便全局调用。<br />
redux全局唯一一个state，区分容器组件、展示组件在全局内共同维护，redux有代码规范性优势。<br />
 view -> aciton -> reducer 的更新思路。

### redux状态使用三原则
- 单一数据源
- store 不可以直接修改
- 尽量使用纯函数修改

### redux三要素
#### **Store** <br />
store发生改变会触发react 执行生命周期循环，直接驱动页面状态改变。 <br />
和store有关的操作
```
getState()
dispatch(action)
subscribe(listener)
replaceReducer(nextReducer)
```

#### **Action** <br />
redux中改变store的唯一途径
```
case TOGGLE_TODO:
  return Object.assign({}, state, {
    todos: state.todos.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        })
      }
      return todo
    })
  })
```

#### **Reducer** <br />
Action 只是表示会有一个事件发生，Reducer是描述具体如何发生。<br />
每个Reducer负责管理全局的state中的一部分。每个reducer的state参数不同，分别对应负责的那部分数据变化。<br />
不同种类的Reducer负责处理state数据中负责的一块数据。这样可能会有多个Reducer，为了管理方便redux提供了 combineReducers 。<br />

## redux 中间件
引入中间件， **处理callback回调和action动作之间的dispatch**
```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk)   //使用多个中间件可以用数组的形式，注意引入顺序中间件之间的依赖关系，例如redux-logger需要放在最后
);

```