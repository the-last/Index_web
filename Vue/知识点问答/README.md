## 1 v-modal 是什么
绑定在data声明的数据中的数据，包括 computed . 
## 2 v-on 可以监听多个方法吗
可以
```
<input
    type="text"
    v-on="{
        input:onInput,
        focus:onFocus,
        blur:onBlur
    }"
>
```

## 3 Vue 生命周期的作用是什么？

Vue生命周期的8个阶段： <br >
**beforeCreate**：new Vue()实例，只有默认的生命周期钩子和事件。在beforeCreate无法访问数据和方法 <br >
**create**：data 和 methods都被初始化，可以操作data <br>
**beforeMount**： Vue实例已编译为模板，但没挂载到页面 <br >
**mounted**：已完成挂载，实例化已完成，创建阶段 -> 运行阶段，可以操作页面上的DOM节点 <br >
**beforeUpdate**： 此时页面中的显示的数据还是老的，data数据已更新，页面没有更新完 <br >
**updated**：页面也已更新 <br >
**beforeDestory**：运行阶段 -> 销毁阶段，其中组件上 data、methods、指令、过滤器、计算属性都还可用 <br >
**destroyed**：组件已销毁 <br >
**第一次加载会触发的周期函数** : beforeCreate， created， beforeMount， mounted <br >

## 4 常用指令
v-for,v-show,v-modal,v-on，v-if, v-html, v-text <br >

**自定义指令** <br >
```
    Vue.directive('demo', {
        bind: function (el, binding, vnode) {
            console.log(el, binding, '使用绑定方式');
        }
    });
```

## 5 v-if v-for 哪个优先级更高
v-for 比 v-if 有更高的优先级 v-if 将分别重复运行于每个 v-for 的 item 中 .<br >

## 6 vue 组件中 data 为什么必须是一个函数
data 是在构造器的原型链上被创建的，data如果是对象，新的构造函数对象公用同一块data，不同的实例都可以修改data，不妥 <br >
如果data是函数，专业在原型链上大家会公用一个data函数名，函数内部的值不会比影响， 所以可以吧函数写到原型链上公用一个组返回值
返回值留在实例的this上，这样就是实现了实例data属性的分离。 <br >
data 可以这样实现：
```
const MyComponent = function() {
    this.data = this.data();
};
MyComponent.prototype.data = function() {
    return {
        a: 1,
        b: 2,
    }
};

```

## 7 Vue 如何获取一个dom
this.$refs.xxx, 保险起见，可以写在mounted的nextTick内

## 8 跨组件双向绑定
深层通信推荐  provide/inject  $attrs/$listeners

## 
