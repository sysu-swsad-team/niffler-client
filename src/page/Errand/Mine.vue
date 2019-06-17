<template>
    <el-row>
      <el-col :span="24">
          我的订单
          <anchored-heading :level="1">Hello world!</anchored-heading>
          <anchored-heading :level="2">Hello world!</anchored-heading>
          <anchored-heading :level="3">Hello world!</anchored-heading>
          <anchored-heading :level="4">Hello world!</anchored-heading>
          <anchored-heading :level="5">Hello world!</anchored-heading>
          <anchored-heading :level="6">Hello world!</anchored-heading>
      </el-col>
    </el-row>
</template>

<script>
import Vue from 'vue'
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level, // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
export default {
}
</script>
