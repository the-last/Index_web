#### Hook
Hook from 16.8 . u can use state even if no class.

##### 使用场景
在编写函数组件并意识到需要向其添加一些 state时，像以前的做法是必须将其它转化为 class 才能使用state。<br />
然后再函数组件中使用 函数式的 Hook 可以像class一样使用state。

##### 调用 state 都做了什么
首先定义了一个 “state 变量”。名字可以是任意 比如 banana。<br />
是一种在函数调用时保存变量的方式 —— useState<br />
一般来说，在函数退出后变量就就会”消失”，而 state 中的变量会被 React 保留。<br />
它与 class 里面的 this.state 提供的功能完全相同。

##### useState 需要哪些参数
useState() 方法里面唯一的参数就是初始 state。<br />
不同于 class，可以按照需要使用数字或字符串对其进行赋值，而不一定是对象。<br />
如果想在 state 中存储两个不同的变量，只需调用 useState() 两次。

##### useState 方法的返回值是什么
返回值为：当前 state 以及更新 state 的函数。<br />
就是 const [count, setCount] = useState()。<br />
这与 class 里面 this.state.count 和 this.setState 类似<br />
唯一区别就是需要成对的获取，获取的方式不同。<br />
useState() 返回的是一个数组 [0] state， [1] setState

##### react 如何判断 useState 对应的是哪个组件
React 保持对当先渲染中的组件的追踪。<br />
Hook规范，Hook 只会在 React 组件中被调用 <br />
自定义 Hook —— 同样只会在 React 组件中被调用。<br />
每个组件内部都有一个「记忆单元格」列表 存储一些数据的 JavaScript 对象<br />
当用 useState() 调用一个 Hook 时，它会读取当前的单元格（或在首次渲染时将其初始化）<br />
然后把指针移动到下一个，这就是多个 useState() 调用会得到各自独立的本地 state 的原因。