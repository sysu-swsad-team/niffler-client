<template>
  <el-form>
    <el-form-item label-position="left">
      <EditQuestionair :ruleForm="ruleForm"></EditQuestionair>
    </el-form-item>
    <el-form-item label="" label-width="80px">
      <el-button type="primary" icon="el-icon-document" @click.prevent="summitForm" style="width:30%;margin-left:calc(30% + 20px)">提交问卷</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import EditQuestionair from '../components/EditQuestionair'
export default {
  data () {
    return {
      ruleForm: {
        title: '',
        description: '',
        maxNumber: '',
        fee: '',
        dueDate: '',
        questions: [{
          title: '',
          type: -1,
          options: [{
            value: ''
          }]
        }]
      }
    }
  },
  methods: {
    summitForm () {
      if (this.ruleForm.title === '') {
        this.$message.error('请输入问卷标题')
      } else if (this.ruleForm.dueDate === '') {
        this.$message.error('请输入问卷截止时间')
      } else {
        this.$message({
          message: '问卷提交成功',
          type: 'success'
        })
      }
    }
  },
  components: {
    EditQuestionair
  }
}
</script>
