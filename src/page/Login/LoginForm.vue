<template>
<el-row>
  <el-col :span="24">
   <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="email">
        <el-input type="text" v-model="ruleForm.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" show-password v-model="ruleForm.password" placeholder="Password"></el-input>
      </el-form-item>
      <div class="link"><a href="#/">忘记密码?</a></div>
      <el-form-item style="width:100%">
        <el-button
        :loading="logining"
        @click.native.prevent="handleLogin"
        type="primary" class="form-btn">学生登录</el-button>
        <el-button
        :loading="logining"
        @click.native.prevent="handleLogin"
        type="primary" class="form-btn">商家登录</el-button>
      </el-form-item>
      <!-- <button type="button" @click="loginStudent">学生登录</button>
      <button type="button" @click="loginStudent">商家登录</button> -->
   </el-form>
   <!-- <div class="link"><router-link to="/register" :underline="false">原注册页面</router-link></div> -->
  </el-col>
</el-row>
</template>

<script>
/* 引入api */
import {requestLogin} from '../../api/api'

export default {
  data () {
    return {
      logining: false,
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* TODO */
    handleLogin () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = true
          let loginParams = {
            email: this.ruleForm.email,
            password: this.ruleForm.password
          }
          /* 调用axios登录接口 */
          requestLogin(loginParams).then(res => {
            this.logining = false
            console.log(res.data)
            let { code, msg, user } = res.data
            if (code === 200) {
              // 登录成功，用户信息就保存在sessionStorage中
              localStorage.setItem('user', JSON.stringify(user))
              // sessionStorage.setItem('user', JSON.stringify(user))
              this.$store.dispatch('setAuth')
              this.$router.push({ path: '/' })
            } else {
              // 登录失败，弹出element-ui中的提示组件
              this.$message({
                message: msg,
                type: 'error'
              })
            }
          }).catch(err => {
            console.log(err)
            return false
          })
          // this.$store.dispatch('setAuth')
          // this.$router.push({ path: '/' })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss_vars';
.form-btn, .form-btn:hover, .form-btn:focus {
  text-align: center;
  height: 54px;
  width: 49%;
  margin: 0 auto;
  // padding: 19.5px 44px;
  padding: 0px;
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
// button, button:hover, button:focus {
//   padding: 0.80rem 2.75rem;
//   outline: none;
//   cursor: pointer;
//   color: #fff;
//   font-family: inherit;

//   background: $color-primary;
//   border: 0px solid currentColor;
//   border-radius: 50px;
//   text-transform: uppercase;
//   font-size: 0.8rem;
//   letter-spacing: 0.1rem;
// }
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
