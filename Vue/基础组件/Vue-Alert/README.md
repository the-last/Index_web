# Vue-Alert
使用Vue.extend 扩展组件，以函数形式应用组件，提供确认/取消后的回调，样式可按需修改。

## 使用说明
udpate-time: 2017-10-30 10:50:00

- Vue 版本 2.4.2

- 使用方法 

```
  import Vue-Alert from '@../.../Vue-Alert'  // 组件路径

  Vue.prototype.$alert = Vue-Alert

  组件内使用： this.$alert(options)           // 全局扩展

  options : {
    title: '提示',  // 弹出框标题名称
    message: '',  // 弹出框提示信息
    onConfirm: false,  // 确认回调 非必须
    onCancle: false  // 取消回到 必须
  }

```
