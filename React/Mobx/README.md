# Mobx 是如何实现的

## 1 Mobx 要点
### 1.1 定义状态并使其可观察
可以任何数据结构来存储状态，如对象、数组、类，打上mobx的标记会变为可观察。
```
import { observable } from 'mobx';
var appStore = observable({
    timer: 0;
});
```
### 1.2 创建视图响应状态变化
mobx 以最小限度更新视图，任何函数都可以成为响应式视图观察自身数据。 <br />
```
import {observer} from 'mobx-react';
@observer
class TimerView extends React.Component {
    render() {
        return (
            <button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>
        );
    }
    onReset() {
        this.props.appState.resetTimer();
    }
};
ReactDOM.render(<TimerView appState={appState} />, document.body);
```
### 1.3 更改状态
mobx会用简单直观的方式更改状态，使用action或者直接修改

## 2 概念及原则
### 2.1 State 状态
**状态**是驱动应用的数据。像待办事务列表的特定状态，还有像当前已选元素的视图状态。 <br />
状态就像有数据的 Excel表格。

### 2.2 derivations 衍生
什么是衍生， 源自状态并且不会再有进一步的相互作用的东西就是衍生。 <br />
- 用户界面 <br >
- 衍生数据，剩下的待办事项 <br >
- 后端集成，比如吧变化发送到服务器端 <br >
**mobx 集成了两种类型的衍生**
#### Computed values计算属性值
使用**纯函数**从当前可观察状态中衍生出的值。 <br >
#### Reactions 反应
是当 State 改变时需要自动发生的副作用。。需要有一个桥梁链接 **函数式编程** 和 **响应式编程** <br >
初次使用mobx会经常使用reactions，但是推荐使用computed，回到表格的概念，公式是计算值的衍生。 <br >
#### Actions 动作
动作  任意一段可以改变状态的代码。 用户操作，后端数据推送，预定事件等。 <br >
动作  类似在表格单元格中输入一个新值。  mobx中可以显示的定义动作，@action . <br >

## 3 原则
mobx支持单向的数据流，动作来改变状态，从而 状态State 的改变会更新受影响的视图。 <br>
action --->  state  ---> view <br />
当 State 改变时，所有衍生都会进行**原子级**自动更新 因此**不可能观察到中间值** <br >
全部的 衍生 默认都是同步更新  因此在动作之后，可以安全的检查计算值  <br  />
计算值 是延迟更新的。 任何不在使用状态的计算值都不会更新，直到需要时会进行 副作用（IO），不使用时会自动垃圾回收 <br />
计算值 不应该去改变状态，应该是一个纯洁的副作用。 <br />


## 4 核心API
```
主要api: Computed 、 observable 、 reactions 、 actions  
```
### 4.1 observable
```
observable(value);
@observable property = value;
```
Observable 观察的值可以是基本类型、引用类型、普通对象、类实例、数组和映射。 <br >
**主要类型转换规则**，或者通过装饰器微调(修饰class，函数)
- 如果被观察 value 是ES6实例，会返回一个新的Observe Map，基于ES6。如果不只是在更改某个entry时修改 <br >
而是，在添加或删除其他entry时做出反应，Observe Map 会很有用。 <br />
- 如果被观察 value 是数组，会返回一个 Observe Array <br />
- 如果 value 是么有原型的对象(对象可以灭有原型)或者原型是 Object.prototype ,对象会被克隆并且所有属性会被转换成可观察的 Observe Object <br />
- 如果 value 是有原型的，例如函数，数组，可以有4中方法处理 Boxed Observer
    - 显示的调用 observable.box(value)  有点神奇
    - @observable 常用
    - 调用 decorate()
    - 类中引入 extendObservable() 来引入属性 可用
装饰器默认是有感染的，observalbe 被自动应用于数据结构包含的任何值，<br />
**observable 是 extendObservable(this, {prototype: value}) 的语法糖**
observable.object(obj, decorator, option) 默认这些值都会转换成可观察 <br />
observable.array(obj, option) 会生成一个observable 数组，如果不想每个值都被观测，可设置 {deep: false} <br />
observable.map(obj, option) 无需局限于字符串

### 4.2 装饰器 Decorator
可用装饰的列表是这些：
- observable.deep  默认的 observable 装饰器 <br >
- computed 创建一个衍生，就是能自动获取已修改值的函数并返回新值 <br >
- action 创建 动作 <br >
- action.bound 创建有范围的动作 <br >

```
class TodoList {
    todos = {}
    get unfinishedTodoCount() {
        return values(this.todos).filter(todo => !todo.finished).length
    }
    addTodo() {
        const t = new Todo()
        t.title = 'Test_' + Math.random()
        set(this.todos, t.id, t)
    }
}
decorate(TodoList, {
    todos: observable,
    unfinishedTodoCount: computed,
    addTodo: action.bound
})   // 对类 Observable 转换 
```

### 4.3 计算属性 Computed
用法好几种，看起来只有一些细微的差别：
- computed( () => expression) <br >
- computed( () => expression, (newvalue) => void ) <br >
- computed( () => expression, option ) <br >
@computed({ equals: compareFn }) get property() { return expression; }  <br >
@computed get classProperty() { return expression; }  <br >

**Computed 自带很多操作属性 控制 Computed 行为** <br >
- 比较器算法  equals: (value, value) => boolean 用来重载默认检测规则的比较函数。 内置比较器有: comparer.identity, comparer.default, comparer.structural <br >
- 追踪 其他observable 类型属性值，等待返回之后在做计算 requiresReaction: boolean 在重新计算衍生属性之前，等待追踪的 observables 值发生变化
<br >
- get: () => value     <br >
- set: (value) => void     <br >
- keepAlive: boolean 保持计算值活动，不光是在值发生变化之后。     <br >

### 4.4 动作 Actions
任何用来 修改状态 的东西 <br >
建议在任何更改 observable 或者有副作用的函数上进行 Actions修饰 <br >

### 4.5 流处理 Flow
flow(function* (args) {})   <br >
flow() 接收 generator 函数作为他的唯一输入 <br >
flow 的关键作用是 处理异步代码时确保代码被action包装 ，**因为正常的 observable state 对异步操作无法通过 enforceActions 检查。** <br >
**神奇的flow**可以解决这个异步不跟踪的问题 <br >
**$\color{#ff0000}{注意}$，异步函数必须是 generator ，而且在内部只能 yield promises** <br >

```
import { configure, flow } from 'mobx';

// 不允许在动作外部修改状态 严格模式的意思
configure({ enforceActions: true });

class Store {
    @observable githubProjects = [];
    @observable state = "pending"; // "pending" / "done" / "error"


    fetchProjects = flow(function* fetchProjects() { // <- 注意*号，这是生成器函数！
        this.githubProjects = [];
        this.state = "pending";
        try {
            const projects = yield someAsyncProcess(); // 用 yield 代替 await
            const filteredProjects = somePreprocessing(projects);

            // 异步代码自动会被 `action` 包装
            this.state = "done";
            this.githubProjects = filteredProjects;
        } catch (error) {
            this.state = "error";
        }
    })
}
```
Flows 可以撤销，调用promise的cancel() 方法会停止异步状态取值， 会继续执行 finally 子句 。<br >

## 5 observables 做出响应

### 5.1 computed 
计算值是可以根据现有的状态或其他计算值衍生的值。 <br >
概念上来讲，他们和表格中的值十分相似，比如汇总80分以上的同学。 <br >
计算属性 可以使实际可修改的值尽可能的小，计算属性也是高度优化过的，可以多用 <br >

### 5.2 computed &  autorun 
声明式的创建计算属性，可以在类任意的属性上使用装饰器
```
import { observable, computed } from 'mobx';

class orderline {
    @observable price = 10;
    @observable amount = 1;

    constructor(price) {
        this.price  = price;
    }
    @computed get total() {
        return this.price * this.amount;
    }

    
}






## Mobx 学习
#### 基本写法
* 此处声明式的监控变量，与 ES6 的类修饰不同。
```
import { observable, action, computed, toJS } from 'mobx'
import { observer } from 'mobx-react'

export default class InstanceStore
{
    @observable
    value = 1

    @action
    modifyValue(v) {
        this.value = v
    }
    @computed get getValue() {
        return this.value * 10;
    }
}
// computed 直接获取一个计算后的值。
// 如果一个值需要根据某个state计算，并且也需要被观察则可以使用 @computed autorun 类似
// autorun   用于执行一些和值变化有关的操作，比如异步请求，数据处理等
// computed  用于根据已有的值，计算出新的值返回一个对观察值追踪的结果
var ins = new InstanceStore();
console.log('value form mobx computed', toJS(ins.getValue()))

// autorun 在不需要继续使用的情况可以进行垃圾回收
var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));
var disposer = autorun(() => console.log(sum.get()));   // '6'
numbers.push(4);                                        // '10'

disposer();
numbers.push(5);                                        // 什么也不打印，因为disposer执行是不再对autorun reaction

// 过期状态值方式如下
var ins = new InstanceStore();
console.log(toJS(ins.value), 'get value from mobx');

// dispatch 修改值
var ins = new InstanceStore();
ins.modifyValue(1000);

// 在组件内可以使用观察者模式
@observer
class routeCreate extends Component {
    constructor(props) {
        super(props);
        this.store = new InstanceStore();
    }
    ...
}

// 使用 observer 修饰组件，并且在render内部有 mobx 值的引用，组件会多一个生命周期 componentWillReact
// redux 改变值的方式是通过拷贝原来的对象生成新的对象，触发组件的componentWillReceiveProps
// mobx 是以原始值的基础上生成新的对象，之前的引用不变所以mobx 不会触发ReceiveProps周期


```

#### 异步处理
mobx 状态值为同步更新。
```
export default class InstanceStore
{
    @observable
    value = 1

    @action
    modifyValue(v) {
        this.value = v;
        setTimeout(this.valueAdd, 100);
    }
    @action.bound
    valueAdd(v) {
        this.value = v + 20;
    }
}
```
// .bound 是js执行环境语法糖
// 过多action ? 需要简化写法
// mobx 自身提供了一个工具函数帮助跟新对应action中的值 runInAction
```
export default class InstanceStore
{
    @observable
    value = 1

    @action
    asyncModifyValue(v) {
        this.value = v;
        setTimeout(action('valueAdd', () => {
            this.value = v + 20
        }), 100);
    }

    @action
    asyncModify(v) {
        this.value = v;
        setTimeout(runInAction(() => {
            this.value = v + 20
        }), 100);
    }
}
```
//  异步action，action可以这样写
```
    @asyncAction
    changeValue() {
        this.value = 0;
        const data = yield Promise.resolve(1)
        this.value = data;
    }
```


toJS 将mobx state 序列转换为js可识别类型？

#### 更新action的约束
mobx 非强制使用action改变state；如果要加强制action触发state可以通过 
Mobx.configure({enforceActions: true}) 加限制条件，强制通过action更新，适用于大型项目




* 1, mobx 是否是同步更新 是
* 2, mobx toJS是如何实现的  
* 3，store对应单个变量，会按照类型预留数组空间，是什么原因
* 4，使用toJS获取数据，需要在class名称上面加 @observer 吗
* 5，为什么mobx取值，是如此的简介？，而且是支持多状态
* 6，extendObservable 可以按照扩展的方式 装饰函数或class里的对象