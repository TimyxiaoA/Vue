<template>
  <div id="app">
    <!-- 输入框 -->
    <a-input
      placeholder="请输入事项"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    />
    <!-- 添加按钮 -->
    <a-button type="primary" @click="addItemToList">添加事项</a-button>
    <!-- {{ $store.getters.nextId }} -->
    <!-- 列表 -->
    <a-list bordered :data-source="listInfo" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox @change="cbStatusChange(item.id)" :checked="item.done">
          {{ item.info }}
        </a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer 区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ undoneLength }}条剩余</span>
        <!-- 操作按钮组 -->
        <a-button-group>
          <a-button
            :type="selectKey == 'all' ? 'primary' : 'default'"
            @click="changeList('all')"
            >全部</a-button
          >
          <a-button
            :type="selectKey == 'undone' ? 'primary' : 'default'"
            @click="changeList('undone')"
            >未完成</a-button
          >
          <a-button
            :type="selectKey == 'done' ? 'primary' : 'default'"
            @click="changeList('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 清除已完成的任务 -->
        <a @click="clearDoneList">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    ...mapState(['list', 'inputValue', 'selectKey']),
    ...mapGetters(['undoneLength', 'listInfo'])
  },
  created() {
    // 异步函数需要使用 dispatch
    this.$store.dispatch('getList')
  },
  methods: {
    // 输入框 change 事件
    handleInputChange(e) {
      console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    // 添加任务事件 在最后一行添加 //eslint-disable-line 解决 == 代替 ===
    addItemToList() {
      if (this.inputValue.trim().length === 0) {
        return alert('文本框内容不能为空!')
      }
      this.$store.commit('addItem')
    },
    // 删除任务事件
    removeItemById(id) {
      if (confirm('你确定删除吗?')) {
        this.$store.commit('removeItem', id)
      }
    },
    // 复选框状态改变
    cbStatusChange(id) {
      this.$store.commit('changeStatus', id)
    },
    // 清除已完成的
    clearDoneList() {
      this.$store.commit('clearDone')
    },
    // 改变 任务选项
    changeList(key) {
      this.$store.commit('changeKey', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
