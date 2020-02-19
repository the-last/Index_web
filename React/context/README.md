## React.withContext & getChildContext


### withContext
```
var ContextMixin = {
    contextTypes: {
        name: React.PropTypes.string.isRequired
    },

    getName: function() {
        return this.context.name;
    }
};

var A = React.createClass({
    mixins: [ContextMixin],
    render: function() {
         return <div>My name is {this.getName()}</div>;
    }
});

React.withContext({'name': 'Jonas'}, function () {
    React.render(<A />, document.body);
});
```
- 1, withContext 两个api，context对象，回调函数 <br>
在回调函数内 render的组件都可以使用context，需要在组件内声明 contextType对象 <br>
- 2, 可以使用mixins，深层的子组件也可以调用context <br>
- 3, 可以在已经声明了 getChildContext的组件继续使用 withContext 声明的context，会有就近覆盖。 <br>

### getChildContext
```
var A = React.createClass({

    childContextTypes: {
         name: React.PropTypes.string.isRequired
    },

    getChildContext: function() {
         return { name: "就近取值。" };
    },

    render: function() {
         return <B />;
    }
});

var B = React.createClass({

    contextTypes: {
        name: React.PropTypes.string.isRequired
    },

    render: function() {
        return <div>My name is: {this.context.name}</div>;
    }
});

React.withContext({'name': 'Jonas'}, function () {
    React.render(<A />, document.body);//"My name is: 就近取值。"
});
```
这个是旧版context的用法，组件根据父组件state/props变化重新render，render时候在获取 context更新后的值 <br>
但在遇到中间组件使用 shouldUpdate 返回false时，子组件不去render，新的context没有被用到，新版已解决。 <br>

#### 可以取到context的周期函数：
- constructor(props, context)
- componentWillReceiveProps(nextPorps, nextContext)
- shouldComponentUpdate(nextProps, nextState, nextContext)
- componentWillUpdate (nextProps, nextState, nextContext)

### createContext
新版 context 提供 Provider Consumer 两个子组件，Provider接受value作为context值，可以是任何js类型。 <br >
Consumer 组件子组件必须是一个函数，默认传参是 Provider的value值。<br >

#### 特点： <br>
- 1, Provider 和 Consumer 必须来自同一次 React.createContext 调用。也就是说 NameContext.Provider 和 AgeContext.Consumer 是无法搭配使用的。
- 2, React.createContext 方法接收一个默认值作为参数。当 Consumer 外层没有对应的 Provider 时就会使用该默认值。
- 3, Provider 组件的 value prop 值发生变更时，其内部组件树中对应的 Consumer 组件会接收到新值并重新执行 children 函数。此过程不受 shouldComponentUpdete 方法的影响。
- 4, Provider 组件利用 Object.is 检测 value prop 的值是否有更新。注意 Object.is 和 === 的行为不完全相同。
- 5, Consumer 组件接收一个函数作为 children prop 并利用该函数的返回值生成组件树的模式被称为 Render Props 模式。