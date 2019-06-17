<template>
  <el-col :span="24" class="content-wrapper">
    <el-form :model="ruleForm" ref="ruleForm" label-position="left" label-width="80px" :disabled="isDisable" style="font-weight: bold;">
      <el-form-item label="题目：" prop="title">
        <p>{{ ruleForm.title }}</p>
      </el-form-item>
      <el-form-item label="简介：" prop="description">
        <div>{{ ruleForm.description }}</div>
      </el-form-item>
      <el-form-item label="结束时间：" prop="dueDate" label-width="120px">
        <span>{{ ruleForm.dueDate }}</span>
      </el-form-item>
      <el-form-item lable-width="10px">
        <el-col :span="7">
          <el-form-item label="最大填写份数：" label-width="150px">
            <span>{{ ruleForm.maxNumber }} 份</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="每份金额：" label-width="150px">
            <span>{{ ruleForm.fee }} 元</span>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="标签：" label-width="80px">
            <el-tag type="success">学校</el-tag>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-divider content-position="center">问卷内容</el-divider>
      <el-form-item
        v-for="(question, index) in ruleForm.questions"
        :label="'问题 ' + index" :key="question.key" v-if="index > 0">
        <div>{{ question.title }}</div>
        <el-form-item v-if="question.type === 0">
          <el-radio-group v-for="(option) in question.options" :key="option.key">
            <el-radio style="margin: 0 20px 0 20px">{{ option.value }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="question.type === 1">
          <el-checkbox-group v-for="(option) in question.options" :key="option.key">
            <el-checkbox>{{ option.value }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="question.type === 2">
          <el-input style="margin-bottom: 5px"></el-input>
        </el-form-item>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
export default {
  name: 'ShowQuestionnaire',
  props: {
    ruleForm: {
      title: '',
      description: '',
      maxNumber: 1,
      fee: 0.01,
      dueDate: '',
      questions: [{
        title: '',
        type: -1,
        options: [{
          value: ''
        }]
      }]
    },
    isDisable: false
  },
  data () {
    return { }
  },
  methods: { }
}
</script>
