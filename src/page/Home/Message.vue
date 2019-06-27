<template>
    <el-row>
      <el-col :span="24">
        <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <el-card v-bind:key="i" v-for="i in count" style="margin-bottom: 5px;">
            <h5>消息 {{ i }}</h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </el-card>
        </div>
        <p v-if="loading" style="text-align: center;">加载中...</p>
        <p v-if="noMore" style="text-align: center;">没有更多了</p>
      </el-col>
    </el-row>
</template>

<script>
// import Vue from 'vue'
// Vue.component('my-checkbox', {
//   data () {
//     return { checked: false, title: 'Check me' }
//   },
//   methods: {
//     check () {
//       this.checked = !this.checked
//     }
//   },
//   render () {
//     return <div class="checkbox-wrapper" onClick={ this.check }>
//       <div class={{ checkbox: true, checked: this.checked }}></div>
//       <div class="title">{ this.title }</div>
//     </div>
//   }
// })
// Vue.component('my-dialog', {
//   methods: {
//     dialog () {
//     }
//   },
//   render () {
//     return <el-button type="button" onClick={ this.somefunc }>打开嵌套表单的 Dialog</el-button>
//   },
//   props: {
//     somefunc: {
//       type: Function,
//       required: true
//     }
//   }
// })
// Vue.component('anchored-heading', {
//   render: function (createElement) {
//     return createElement(
//       'p', // 标签名称
//       {
//         style: {
//           color: this.mycolor,
//           fontSize: this.haha + 'px'
//         }
//       },
//       this.$slots.default // 子节点数组
//     )
//   },
//   props: {
//     level: {
//       type: Number,
//       required: true
//     },
//     haha: {
//       type: Number,
//       required: true
//     },
//     mycolor: {
//       type: String,
//       required: true
//     }
//   }
// })
const msgNum = 20
const msgLoadStep = 2
export default {
  data () {
    return {
      count: 0,
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count >= msgNum
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        if (this.count + msgLoadStep > msgNum) {
          this.count = msgNum
        } else {
          this.count += msgLoadStep
        }
        this.loading = false
      }, 1000)
    },
    load1 () {
      this.count += 2
    }
  }
}
</script>
