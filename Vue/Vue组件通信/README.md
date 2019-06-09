
## Vue 组件间通信的几种方式

- props/$emit

- Event emit/on

- $attrs/$listeners

- vuex

- provide/inject

- $parent / $children与 ref

### props/$emit
父组件向子组件传值，子组件获取父组件属性值，在子组件的props内置对象中获取。<br />
子组件以 注册事件的方式触发回调函数，执行父组件中的方法，实现回传的功能。

### Event emit/on 
事件的监听和响应，Vue实例提供两个全局接口，负责事件的监听注册和响应。具体用法如下： <br />
```
var Event=new Vue();
    Event.$emit(method, sourcedata);
    Event.$on(method, sourcedata => { console.log('获取响应事件的传参：', sourcedata); });
```

### $attrs/$listeners
- 向下
**$attrs** 可实现深层次组件间向下传值，跨级通信。<br />
在Vue中父组件向子组件传值，如在子组件的props未声明全部的父组件传值，其他未声明的值无法直接在子组件使用。<br />
Vue提供了另一个接口可以访问这些属性：**$attrs** 
```
props: ["val1"],     // 声明后可用
inheritAttrs: false,          // inheritAttrs为false时可以获取 $attrs 的值。
<next v-bind="$attrs"></next> // 通过bind可以实现向下深层组件传值

```
- 向上
**$listeners** 实现向上更高层级组件执行回调。 <br />
```
<child  @func1='Func1Click' />                    // 向子组件传递事件
<next v-bind="$attrs" v-on='$listeners'></next>   // 子组件声明$listeners，以普通事件的形式传给孙组件

handleFunc1() {
    this.$listeners.func1('props changed second') // 在孙组件中执行事件，通过 $listeners 获取上层组件的传值.
}

```
**实现了父子组件双向深层通信** 

### provide/inject  

**Vue的高级用法** 类似在react中使用Context上下文(Provider,Consumer)。 <br />
官方是这样解释的：这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。<br />

- **provide/inject**  必须一起使用，允许一个祖先组件向其所有子孙后代注入依赖。 <br />
相当于更强的父组件props，子组件props。

```
provide：    Object | () => Object                                         // 对象或返回对象的函数
inject：     Array<string> | { [key: string]: string | Symbol | Object }   // 数组 或对象

// 使用示例
// 父级组件提供 'foo'
export default {
  provide: {
    foo: 'bar'
  }
}

// 子组件注入 'foo'
export default {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar" 直接使用
  }
  data () {               // 初始化 data 数据接口
    return {
      bar: this.foo       
    }
  }

  props: {                // 作为props属性传入
    bar: {
      default () {
        return this.foo
      }
    }
  }
}
```
- Symbol类型写法。
```
const s = Symbol()

const Provider = {
  provide () {
    return {
      [s]: 'foo'
    }
  }
}

const Child = {
  inject: { s }
}
```

- 或添加默认值，从不同名字属性注入
```
inject: {
    foo: {
      from: 'bar',
      default: () => [1, 2, 3]
    }
}
```





### $parent/$children 与 ref

ref 组件别名，和react中ref中功能类似 this.$refs.xxx ，作用在组件上时代表组件实例，可以访问data属性和methods方法。 <br />
如果作用在dom元素上表示dom元素本身。 在react中可以使用 ReactDOM.findDOMNode 获取ref坐在节点或组件。 <br />

Vue提供了两个可以直接获取组件实例的接口：$parent $children，简称 **父链和子链**

## 常见的组件通信方式
- 父子组件通信，主要通过props/$emit , $parent/$children , $on/$emit , $attrs/$listeners
- 兄弟组件通信，Vuex , $on/$emit
- 跨级组件通信，provide/inject $attrs/$listeners


