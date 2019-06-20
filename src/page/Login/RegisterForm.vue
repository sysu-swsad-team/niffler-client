<template>
<el-row>
  <el-col :span="24">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="right" label-width="78px" size="mini" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name" inline-message="true">
        <el-input v-model="ruleForm.name" placeholder="请输入您的真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="stuId">
        <el-input v-model="ruleForm.stuId" placeholder="请输入您的学号"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birth">
          <el-date-picker :editable="false" style="width: 100%;"
            v-model="ruleForm.birth"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="请选择您的出生年月">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex" style="width: 100%;">
          <el-radio border label="male" style="width: 44%; margin: 0px;"></el-radio>
          <el-radio border label="female" style="width: 48%; margin-left: 8%;"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select v-model="ruleForm.grade" placeholder="请选择年级" style="width: 100%;">
          <el-option label="大一" value="大一"></el-option>
          <el-option label="大二" value="大二"></el-option>
          <el-option label="大三" value="大三"></el-option>
          <el-option label="大四" value="大四"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-select v-model="ruleForm.major" placeholder="请输入您的专业" style="width: 100%;">
          <el-option label="软件工程" value="软件工程"></el-option>
          <el-option label="工商管理" value="工商管理"></el-option>
          <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
          <el-option label="历史学系" value="历史学系"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入您的邮箱"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verCode">
        <el-input v-model="ruleForm.verCode" style="width: 56%;" placeholder="验证码"></el-input>
        <el-button type="primary" style="width: 42%; font-size: 12px; letter-spacing: 0px;">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="ackPassword">
        <el-input v-model="ruleForm.ackPassword" show-password placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%">
        <el-button type="primary" @click="submitForm('ruleForm')" style="margin:0 auto; width: 45%; padding: 10px;">注册</el-button>
        <el-button  @click="resetForm('ruleForm')" style="margin:0 auto; width: 45%; padding: 10px; color: #1D365D; background: #fff;">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        stuId: '',
        birth: '',
        sex: '',
        grade: '',
        major: '',
        email: '',
        verCode: '',
        password: '',
        ackPassword: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        stuId: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 8, max: 8, message: '长度为8的数字序列', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请输入出生年月', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请选择年级', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        verCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6的数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度不小于6，不大于20', trigger: 'blur' }
        ],
        ackPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度不小于6，不大于20', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss_vars';
button, button:hover, button:focus {
  outline: none;
  cursor: pointer;
  color: #fff;
  font-family: inherit;

  background: $color-primary;
  border: 1px solid currentColor;
  border-radius: 50px;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
}
</style>
