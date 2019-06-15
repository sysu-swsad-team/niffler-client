<template>
<el-row>
  <el-col :span="24">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="78px" size="mini" class="demo-ruleForm">
     <el-form-item label="姓名" prop="name" inline-message="true">
       <el-input v-model="ruleForm.name" placeholder="请输入您的真实姓名"></el-input>
     </el-form-item>
     <el-form-item label="学号" prop="id">
       <el-input v-model="ruleForm.id" placeholder="请输入您的学号"></el-input>
     </el-form-item>
     <el-form-item label="- 年龄" prop="age" style="height: 30px;">
       <el-input-number v-model="ruleForm.age" :min="1" :max="120"></el-input-number>
     </el-form-item>
     <el-form-item label="性别" prop="gender" style="height: 30px;">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="male"></el-radio>
        <el-radio label="female"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="年级" prop="grade" style="height: 30px;">
      <el-select v-model="ruleForm.grade" placeholder="请选择年级">
        <el-option label="大一" value="大一"></el-option>
        <el-option label="大二" value="大二"></el-option>
        <el-option label="大三" value="大三"></el-option>
        <el-option label="大四" value="大四"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="专业" prop="major">
       <el-input v-model="ruleForm.major" placeholder="请输入您的专业"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
       <el-input v-model="ruleForm.email" placeholder="请输入您的邮箱"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="verCode">
      <el-input v-model="ruleForm.verCode" style="width: 49%;" placeholder="验证码"></el-input>
      <el-button type="primary" style="width: 49%;">获取验证码</el-button>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="ackPassword">
      <el-input v-model="ruleForm.ackPassword" show-password placeholder="请再次输入密码"></el-input>
    </el-form-item>
     <el-form-item style="width:100%">
       <el-button type="primary" style="margin:0 auto; width: 45%; padding: 10px;">注册</el-button>
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
        id: '',
        age: '',
        gender: '',
        grade: '',
        major: '',
        email: '',
        verCode: '',
        password: '',
        ackPassword: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', triggr: 'blur' }
        ],
        id: [
          { required: true, message: '请输入学号', triggr: 'blur' },
          { min: 8, max: 8, message: '长度为8的数字序列', triggr: 'blur' }
        ],
        age: [ ],
        gender: [
          { required: true, message: '请选择性别', triggr: 'blur' }
        ],
        grade: [
          { required: true, message: '请选择年级', triggr: 'blur' }
        ],
        major: [
          { required: true, message: '请输入专业', triggr: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', triggr: 'blur' }
        ],
        verCode: [
          { required: true, message: '请输入验证码', triggr: 'blur' },
          { min: 6, max: 6, message: '长度为6的数字', triggr: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', triggr: 'blur' },
          { min: 6, max: 20, message: '长度不小于6，不大于20', triggr: 'blur' }
        ],
        ackPassword: [
          { required: true, message: '请再次输入密码', triggr: 'blur' },
          { min: 6, max: 20, message: '长度不小于6，不大于20', triggr: 'blur' }
        ]
      }
    }
  },
  methods: { }
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
