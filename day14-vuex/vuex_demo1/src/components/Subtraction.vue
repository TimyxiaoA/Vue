<template>
  <div>
    <h3>{{count}}</h3>
    <h3>{{processCount}}</h3>
    <button @click="handel1">-1</button>
    <button @click="subN(6)">-N</button>
    <button @click="subAsync(8)">async -N</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: '',

  data() {
    return {
      num: 8
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['processCount'])
  },
  /* computed: mapState({
    count: state => state.count,
    // 可以结合自有数据来加工数据
    newNum(state) {
      return state.count + this.num
    }
  }), */
  methods: {
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['subAsync']),
    handel1() {
      this.sub()
    }

  }
}
</script>

<style lang="less" scoped></style>
