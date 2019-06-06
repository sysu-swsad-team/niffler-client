<template>
  <div class="signin">
    <div class="signinpanel">
        <div class="row">
            <div class="col-sm-7">
                <div class="signin-info">
                    <div class="logopanel m-b">
                        <h1><em>Niffler</em></h1>
                    </div>
                    <div class="m-b"></div>
                    <h4>欢迎来到 <strong>Niffler</strong> 一个可以赚闲钱的平台</h4>
                    <ul class="m-b">
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 简介</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 简介</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 简介</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 简介</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 简介</li>
                    </ul>
                    <strong>还没有账号？  请</strong>
                    <router-link to="/register" style="color:red"><strong>注册</strong></router-link>
                    <!-- <a href="#register" style="color:red"><strong>注册</strong></a> -->
                </div>
            </div>
            <div class="col-sm-5">
                <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm loginform">
                    <h4 class="no-margins">登录</h4>
                    <el-form-item prop="account">
                      <input type="text" v-model="ruleForm2.account" placeholder="账号" class="form-control uname">
                    </el-form-item>
                    <el-form-item prop="checkPass">
                      <input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" class="form-control pword m-b">
                    </el-form-item>
                    <a href="#login" style="color:red">忘记密码了？</a>
                    <button type="button" class="btn btn-success btn-block" @click="loginStudent">学生登录</button>
                    <button type="button" class="btn btn-success btn-block" @click="loginShopper">商家登录</button>
                    <span class="window-tips" b></span>
                </el-form>
            </div>
        </div>
        <div class="signup-footer">
            <div class="pull-left">
                &copy; 2019 All Rights Reserved. SYSU
            </div>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      ruleForm2: {
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
      }
    }
  },
  methods: {
    loginStudent () {
      this.$store.dispatch('setAuth')
      this.$router.push({ path: '/' })
      // var id = this.username
      // var password = this.password
      // if (this.isNULL(id)) {
      //   alert('请填写账号！')
      // } else if (this.isNULL(password)) {
      //   alert('请填写密码！')
      // } else {
      //   var data = {
      //     'account': id,
      //     'password': password,
      //     'usertype': 'student'
      //   }
      // var postData = JSON.stringify(data)
      // var _self = this
      // $.ajax({
      //   type: 'POST',
      //   url: '/users/login',
      //   data: postData,
      //   contentType: 'application/json;charset=utf-8',
      //   dataType: 'json',
      //   timeout: 5000,
      //   success (result, xhr) {
      //     for (let key in result) {
      //       if (key === 'content') {
      //         _self.$store.commit('updateUserStatus', 'student')
      //         _self.$store.commit('updateUserInfo', data)
      //         _self.$router.push({ name: 'Home' })
      //       } else if (key === 'err') {
      //         alert('服务器错误')
      //       }
      //     }
      //   },
      //   error (result, xhr) {
      //     console.log(result)
      //     if (result.status === 441) {
      //       alert('账号或密码错误')
      //     }
      //   }
      // })
      // }
    },
    loginShopper () {
      this.$store.dispatch('setAuth')
      this.$router.push({ path: '/' })
      // var id = this.username
      // var password = this.password
      // if (this.isNULL(id)) {
      //   alert('请填写账号！')
      // } else if (this.isNULL(password)) {
      //   alert('请填写密码！')
      // } else {
      //   var data = {
      //     'account': id,
      //     'password': password,
      //     'usertype': 'shopper'
      //   }
      // var postData = JSON.stringify(data)
      // var _self = this
      // $.ajax({
      //   type: 'POST',
      //   url: '/users/login',
      //   data: postData,
      //   contentType: 'application/json;charset=utf-8',
      //   dataType: 'json',
      //   timeout: 5000,
      //   success (result, xhr) {
      //     for (let key in result) {
      //       if (key === 'content') {
      //         _self.$store.commit('updateUserStatus', 'shopper')
      //         _self.$store.commit('updateUserInfo', data)
      //         _self.$router.push({ name: 'Main' })
      //       } else if (key === 'err') {
      //         alert('服务器错误')
      //       }
      //     }
      //   },
      //   error (result, xhr) {
      //     console.log(result)
      //     if (result.status === 441) {
      //       alert('账号或密码错误')
      //     }
      //   }
      // })
      // }
    },
    isNULL (data) {
      if (data.length === 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

// <!-- <template>
//   <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
//     <h3 class="title">用户登录</h3>
//     <el-form-item prop="account">
//       <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
//     </el-form-item>
//     <el-form-item prop="checkPass">
//       <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
//     </el-form-item>
//     <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
//     <el-form-item style="width:100%;">
//       <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
//       <el-button type="primary" style="width:100%;">注册</el-button>
//     </el-form-item>
//   </el-form>
// </template>

// <script>
// // import { requestLogin } from '../api/api'
// // import NProgress from 'nprogress'
// export default {
//   data () {
//     return {
//       logining: false,
//       ruleForm2: {
//         account: 'niffler',
//         checkPass: '123456'
//       },
//       rules2: {
//         account: [
//           { required: true, message: '请输入账号', trigger: 'blur' }
//           // { validator: validaePass }
//         ],
//         checkPass: [
//           { required: true, message: '请输入密码', trigger: 'blur' }
//           // { validator: validaePass2 }
//         ]
//       },
//       checked: true
//     }
//   },
//   methods: {
//     handleReset2 () {
//       this.$refs.ruleForm2.resetFields()
//     },
//     handleSubmit2 (ev) {
//       // this.$refs.ruleForm2.validate验证表单
//       this.$refs.ruleForm2.validate((valid) => {
//         if (valid) {
//           this.logining = true
//           var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass }
//           console.log(loginParams)
//           if (this.ruleForm2.account !== 'niffler' || this.ruleForm2.checkPass !== '123456') {
//             this.$message({
//               message: '账号或密码错误',
//               type: 'error'
//             })
//             this.logining = false
//           } else {
//             this.$router.options.routes[1].meta.auth = true
//             this.$router.push({ path: '/' })
//           }
//           // requestLogin(loginParams).then(data => {
//           //   this.logining = false
//           //   // NProgress.done();
//           //   let { msg, code, user } = data
//           //   if (code !== 200) {
//           //     this.$message({
//           //       message: msg,
//           //       type: 'error'
//           //     })
//           //   } else {
//           //     sessionStorage.setItem('user', JSON.stringify(user))
//           //     this.$router.push({ path: '/table' })
//           //   }
//           // })
//         } else {
//           console.log('error submit!!')
//           return false
//         }
//       })
//     }
//   }
// }

// </script>

// <style lang="scss" scoped>
//   .login-container {
//     /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
//     -webkit-border-radius: 5px;
//     border-radius: 5px;
//     -moz-border-radius: 5px;
//     background-clip: padding-box;
//     margin: 180px auto;
//     width: 350px;
//     padding: 35px 35px 15px 35px;
//     background: #fff;
//     border: 1px solid #eaeaea;
//     box-shadow: 0 0 25px #cac6c6;
//     .title {
//       margin: 0px auto 40px auto;
//       text-align: center;
//       color: #505458;
//     }
//     .remember {
//       margin: 0px 0px 35px 0px;
//     }
//   }
// </style>
//  -->
