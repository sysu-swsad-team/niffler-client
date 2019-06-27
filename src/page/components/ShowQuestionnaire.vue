<template>
  <el-col :span="24" class="content-wrapper">
    <el-form :model="ruleForm" ref="ruleForm" label-position="left" label-width="80px" disabled style="font-weight: bold;" >
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
        :label="(index + 1) + ''" :key="index">
        <el-form-item v-if="question.type === 0">
          <h6>（单选）{{ question.title }}</h6>
          <el-radio v-for="(option, indexP) in question.options" :key="indexP" :label="indexP + ''">{{ option.value }}</el-radio>
        </el-form-item>
        <el-form-item v-if="question.type === 1">
          <h6>（多选）{{ question.title }}</h6>
          <el-checkbox-group>
            <el-checkbox v-for="(option, indexP) in question.options" :key="indexP" :label="indexP + ''">{{ option.value }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="question.type === 2">
          <h6>（填空）{{ question.title }}</h6>
          <el-input style="margin-bottom: 5px"></el-input>
        </el-form-item>
      </el-form-item>
      <el-divider></el-divider>
    </el-form>
  </el-col>
</template>

<script>
export default {
  name: 'ShowQuestionnaire',
  props: {
    ruleForm: {}
  },
  data () {
    return { }
  },
  methods: { }
}
</script>
