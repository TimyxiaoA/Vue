import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  // *只能通过mutations 中的方法处理 state 中的数据
  // *使用结构赋值直接获取参数 或者使用 payload获取对象数据
  mutations: {
    add(state) {
      this.state.count++
    },
    addN(state, { num1, num2 }) {
      state.count += num1
      // console.log(num2)
    },
    sub(state) {
      state.count--
    },
    subN(state, num1) {
      state.count -= num1
    }
  },
  // *异步操作要在 actions 中处理,但处理数据还得调用mutations中的方法
  actions: {
    addAsync(context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    subAsync(context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  getters: {
    processCount(state) {
      return state.count > 10 ? '大于10' : '小于10'
    }
  }

})
