// mobx使用方法比redux更简洁高效
// 声明observer action使用装饰器
import { observable, action, asyncAction, computed, toJS } from 'mobx'
import { observer } from 'mobxReact'

export default class InstanceStore
{
    @observable
    value = ''

    @action
    setValue(v) {
        this.value = v
    }

    @computed get getValue() {
        return this.value * 10;
    }

    @asyncAction
    changeValue() {
        this.value = 0;
        const data = yield Promise.resolve(1)
        this.value = data;
    }
}


// 过期状态值方式如下
var ins = new InstanceStore();
console.log(toJS(ins.value), 'get value from mobx');

// dispatch 修改值
var ins = new InstanceStore();
ins.setValue('new value');

// 在组件内可以使用观察者模式
@observer
class routeCreate extends Component {
    constructor(props) {
        super(props);
        this.store = new InstanceStore();
    }
}
