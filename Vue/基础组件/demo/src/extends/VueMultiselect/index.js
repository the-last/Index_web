import Vue from 'vue'
import MultipleSelectComponent from './multipleselect.vue'

const multiselect = {
  install: function (Vue) {
    Vue.component('MultiSelect', MultipleSelectComponent);
  }
}

export default multiselect
