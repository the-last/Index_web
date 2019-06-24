import Vue from 'vue'
import AlertComponent from './alertDialog.vue'
let AlertConstructor = Vue.extend(AlertComponent)

let instance

const Alert = (options) => {
  if (Vue.prototype.$isServer) {
    return
  }
  instance = new AlertConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  instance.dom.style.zIndex = 9999
}

export default Alert
