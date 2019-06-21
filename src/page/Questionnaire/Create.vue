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
      ruleForm: { }
    }
  },
  methods: { },
  components: {
    EditQuestionair
  }
}
</script>
