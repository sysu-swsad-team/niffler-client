<template>
    <el-row>
      <el-col :span="24" class="content-wrapper">
          <el-form :model="ruleForm" :rules="rules" label-position="left" label-width="80px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title" maxlength="30" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="结束时间" prop="dueDate">
              <el-date-picker v-model="ruleForm.dueDate" type="datetime"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-col :span="11">
                <el-form-item label="任务报酬(元)" prop="fee" label-width="120px">
                  <el-input-number v-model="ruleForm.fee" :min="0.01" :max="9999.0" :step="0.01"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item label="类型" label-width="100px" prop="tag">
                  <el-select v-model="ruleForm.tag" placeholder="请选择类型">
                    <el-option v-for="item in tags" :key="item.value" :label="item.value" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="任务描述" prop="description">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" v-model="ruleForm.description" maxlength="500" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="" label-width="80px">
              <el-button type="primary" icon="el-icon-s-claim" @click.prevent="summitForm" style="width:30%;margin-left:calc(30% + 20px)">提交任务</el-button>
            </el-form-item>
          </el-form>
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
  data () {
    return {
      ruleForm: {
        title: '',
        dueDate: '',
        fee: 0.01,
        tag: '',
        description: ''
      },
      tags: [{
        value: '快递'
      }, {
        value: '外卖'
      }],
      rules: {
        title: [
          { required: true, message: '请输入题目', triggr: 'blur' }
        ],
        description: [
          { required: true }
        ],
        fee: [
          { required: true }
        ],
        tag: [
          { required: true }
        ],
        dueDate: [
          { type: 'date', required: true, message: '', triggr: 'blur' }
        ]
      }
    }
  },
  methods: {
    summitForm () {
      if (this.ruleForm.title === '') {
        this.$message.error('请输入任务标题')
      } else if (this.ruleForm.dueDate === '') {
        this.$message.error('请输入任务截止时间')
      } else if (this.ruleForm.tag === '') {
        this.$message.error('请选择类型')
      } else if (this.ruleForm.description === '') {
        this.$message.error('请增加任务描述')
      } else {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
      }
    }
  }
}
</script>
