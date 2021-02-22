<template>
  <div>
    <h3>{{$store.state.count}}</h3>
    <h3>{{$store.getters.processCount}}</h3>
    <button @click="handle1">+1</button>
    <button @click="handle2">+N</button>
    <button @click="handle3">async +N</button>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
    }
  },

  methods: {
    handle1() {
      this.$store.commit('add')
    },
    handle2() {
      // 传参写法 单个参数直接写,多个参数用对象或者数组传递
      // this.$store.commit('add', { num1: 3, num2: 5 })
      // 另一种写法
      this.$store.commit({
        type: 'addN',
        num1: 3,
        num2: 5
      })
    },
    handle3() {
      // 在调用 dispatch 函数触发 ations中的函数
      this.$store.dispatch('addAsync', { num1: 10 })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
