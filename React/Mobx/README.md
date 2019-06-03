## Mobx 学习
#### 基本写法
* 此处声明式的监控变量，与 ES6 的类修饰不同。
```
import { observable, action, computed, toJS } from 'mobx'
import { observer } from 'mobxReact'

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
var ins = new InstanceStore();
console.log('value form mobx computed', toJS(ins.getValue()))


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