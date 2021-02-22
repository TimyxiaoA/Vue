import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 所用的任务列表
    list: [],
    // input 框数据
    inputValue: 'aaa',
    // 任务选择组 默认为 'all'
    selectKey: 'all'
  },
  mutations: {
    // 接值
    initList(state, data) {
      state.list = data
    },
    // 改变输入框的值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加任务到 list 中
    addItem(state) {
      const obj = {
        id: store.getters.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
    },
    // 在 list 中删除任务
    removeItem(state, id) {
      const index = state.list.findIndex(item => item.id === id)
      if (index === -1) {
        return alert('删除任务失败,请稍后再试!')
      }
      state.list.splice(index, 1)
    },
    // 根据 id 在 list 中改变此任务的状态
    changeStatus(state, id) {
      state.list.some(item => {
        if (item.id === id) {
          item.done = !item.done
          return true
        }
      })
    },
    // 清除已完成的任务
    clearDone(state) {
      state.list = state.list.filter(item => item.done === false)
    },
    // 根据选中的 key 改变任务列表
    changeKey(state, key) {
      state.selectKey = key
    }
  },
  actions: {
    async getList(context) {
      const { data: res } = await axios.get('/list.json')
      // 传值
      // console.log(res)
      context.commit('initList', res)
    }
  },
  getters: {
    nextId: state => {
      const arr = []
      state.list.forEach(item => {
        arr.push(item.id)
      })
      return Math.max(...arr) + 1
    },
    undoneLength: state => {
      const undoneList = state.list.filter(item => item.done === false)
      // console.log(undoneList)
      return undoneList.length
    },
    listInfo: state => {
      if (state.selectKey === 'all') {
        return state.list
      } else if (state.selectKey === 'undone') {
        return state.list.filter(item => item.done === false)
      } else if (state.selectKey === 'done') {
        return state.list.filter(item => item.done === true)
      }
    }
  },
  modules: {}
})

export default store
