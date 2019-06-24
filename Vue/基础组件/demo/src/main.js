// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MultiSelect from '@/extends/VueMultiselect'

// 将multiselect注册为公用组件
Vue.use(MultiSelect)

// 设置生成环境下不进行vue的警告提示
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
