##

### Vue中事件主要分为两部分： DOM绑定事件，自定义事件

## 1 绑定事件
```
<button v-on:click="dododo">点击</button>
<button @click="dododo">点击</button>  // 语法糖写法
```
类似这种事件在dom上的列为DOM绑定事件，不是自定义事件。 <br />

## 2 自定义事件
Vue方便组件之间通信，提供了一些自定义事件(Event原型) <br />
类似 **$on、$off、$once、$emit** **$broadcast、$dispatch**不在使用 <br />
自定义事件