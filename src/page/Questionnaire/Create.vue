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
      alert(this.ruleForm.title)
    }
  },
  components: {
    EditQuestionair
  }
}
</script>
