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
        questions: [ ]
      }
    }
  },
  methods: { },
  components: {
    EditQuestionair
  }
}
</script>
