<template>
<el-row>
  <el-col :span="12" :offset="6">
   <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="80px" class="demo-ruleForm register-container">
     <h3 class="title">欢迎注册<em>Niffler</em></h3>
     <el-form-item label="姓名" prop="name">
       <el-input v-model="ruleForm.name" placeholder="请输入您的真实姓名"></el-input>
     </el-form-item>
     <el-form-item label="学号" prop="id">
       <el-input v-model="ruleForm.id" placeholder="请输入您的学号"></el-input>
     </el-form-item>
     <el-form-item label="年龄" prop="age">
       <el-input-number v-model="ruleForm.age" :min="1" :max="120"></el-input-number>
     </el-form-item>
     <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="male"></el-radio>
        <el-radio label="female"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="年级" prop="grade">
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
      <el-input v-model="ruleForm.verCode" style="width:60%" placeholder="验证码"></el-input>
      <el-button type="primary" style="width:auto">获取验证码</el-button>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="ackPassword">
      <el-input v-model="ruleForm.ackPassword" show-password placeholder="请再次输入密码"></el-input>
    </el-form-item>
     <el-form-item style="width:100%">
       <el-button type="primary" style="width:40%; margin:auto 10px auto 10px">注册</el-button>
       <!-- <el-link type="primary" href="#login" :underline="false">已有账号？去登录</el-link> -->
       <router-link to="/login" :underline="false">已有账号？去登录</router-link>
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
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 8, max: 8, message: '长度为8的数字序列', trigger: 'blur' }
        ],
        age: [ ],
        gender: [
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
  methods: { }
}
</script>

<style lang="scss" scoped>
.register-container {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 5% auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
</style>
