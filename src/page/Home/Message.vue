<template>
    <el-row>
      <el-col :span="24">
        <my-checkbox></my-checkbox>
        <my-dialog :somefunc="function () { dialogFormVisible = true }"></my-dialog>
        <anchored-heading :level="6" :haha="10" :mycolor="'#f0f'">Hello world!</anchored-heading>
        <anchored-heading :level="5" :haha="20" :mycolor="'#f2b'">Hello world!</anchored-heading>
        <anchored-heading :level="4" :haha="30" :mycolor="'#f49'">Hello world!</anchored-heading>
        <anchored-heading :level="3" :haha="40" :mycolor="'#f68'">Hello world!</anchored-heading>
        <anchored-heading :level="2" :haha="50" :mycolor="'#f84'">Hello world!</anchored-heading>
        <anchored-heading :level="1" :haha="60" :mycolor="'#fa2'">Hello world!</anchored-heading>
      </el-col>
      <el-col :span="24">
        <!-- Form -->
        <el-button type="button" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
</template>

<script>
import Vue from 'vue'
Vue.component('my-checkbox', {
  data () {
    return { checked: false, title: 'Check me' }
  },
  methods: {
    check () {
      this.checked = !this.checked
      console.log(this.checked)
    }
  },
  render () {
    return <div class="checkbox-wrapper" onClick={ this.check }>
      <div class={{ checkbox: true, checked: this.checked }}></div>
      <div class="title">{ this.title }</div>
    </div>
  }
})
Vue.component('my-dialog', {
  methods: {
    dialog () {
    }
  },
  render () {
    return <el-button type="button" onClick={ this.somefunc }>打开嵌套表单的 Dialog</el-button>
  },
  props: {
    somefunc: {
      type: Function,
      required: true
    }
  }
})
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h1', // 标签名称
      {
        style: {
          color: this.mycolor,
          fontSize: this.haha + 'px'
        }
      },
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    },
    haha: {
      type: Number,
      required: true
    },
    mycolor: {
      type: String,
      required: true
    }
  }
})

export default {
  data () {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>
