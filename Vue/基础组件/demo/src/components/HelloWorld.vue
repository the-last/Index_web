<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2><button @click="config">切换</button></h2>
    <div class="demo-container">
      <multi-select :editAble="false" v-model="returnValue" :candidates="candi"></multi-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '《关于多选操作-组件demo演示》',
      candi: {left: [{
        name: 'test1',
        id: 101
      }, {
        name: 'test2',
        id: 102
      }], right: [] },
      returnValue: null
    }
  },
  methods: {
    config () {
      this.candi.left = [{
        name: 'nidaye',
        id: 808
      }, {
        name: 'nidama',
        id: 809
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.demo-container {
  display: block;
  width: 50%;
  margin: 80px auto;
}
</style>
