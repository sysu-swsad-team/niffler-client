<template>
<el-row>
  <el-col :span="24">
   <el-form v-if="isRememberPW" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" show-password v-model="ruleForm.checkPass" placeholder="Password"></el-input>
      </el-form-item>
      <div class="link"><a href="#" @click="isRememberPW = false">忘记密码?</a></div>
      <button type="button" @click="loginStudent">学生登录</button>
      <button type="button" @click="loginStudent">商家登录</button>
   </el-form>
   <el-form v-else :model="ruleForm2" status-icon ref="ruleForm2" class="demo-ruleForm" label-width="85px" size="mini">
    <el-form-item label="邮箱" prop="email" :rules="{ required: true }">
        <el-input v-model="ruleForm2.email" placeholder="请输入您的邮箱"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verCode" :rules="{ required: true }">
        <el-input v-model="ruleForm2.verCode" style="width: 50%;" placeholder="验证码"></el-input>
        <el-button type="info" icon="el-icon-message" circle></el-button>
      </el-form-item>
      <el-form-item label="新密码" prop="password" :rules="{ required: true }">
        <el-input v-model="ruleForm2.newPassword" show-password placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="ackPassword" :rules="{ required: true }">
        <el-input v-model="ruleForm2.ackPassword" show-password placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%">
        <el-button type="primary" @click="submitForm2('ruleForm2')" style="margin:0 auto; width: 45%; padding: 10px;">重置密码</el-button>
        <el-button  @click="isRememberPW = true" style="margin:0 auto; width: 45%; padding: 10px; color: #000; background-color: #fff;">取消</el-button>
      </el-form-item>
    </el-form>
   <!-- <div class="link"><router-link to="/register" :underline="false">原注册页面</router-link></div> -->
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        account: '',
        checkPass: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      isRememberPW: true,
      ruleForm2: {
        email: '',
        verCode: '',
        newPassword: '',
        ackPassword: ''
      }
    }
  },
  methods: {
    loginStudent () {
      this.$store.dispatch('setAuth')
      this.$router.push({ path: '/' })
    },
    loginShopper () {
      this.$store.dispatch('setAuth')
      this.$router.push({ path: '/' })
    },
    submitForm2 () { }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss_vars';
button, button:hover, button:focus {
  padding: 0.80rem 2.75rem;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-family: inherit;

  background: $color-primary;
  border: 0px solid currentColor;
  border-radius: 50px;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
}
.link {
  text-align: center;
  padding: 10px;
}
a {
  color: #697a79;
  content: '';
  border-bottom: 1px dashed currentColor;
  text-decoration: none;
  font-family: inherit;
}
</style>
