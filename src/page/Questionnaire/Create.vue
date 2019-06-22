<template>
  <el-form>
    <el-form-item label-position="left">
      <EditQuestionair :ruleForm="ruleForm"></EditQuestionair>
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
        tag: '',
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
      }
    }
  },
  methods: { },
  components: {
    EditQuestionair
  }
}
</script>
