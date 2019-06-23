// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
// import axios from 'axios'
// import Mock from './mock/index'

/* theme */
// import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/theme/element-#1D365D/index.css'
/* font-awesome */
import 'font-awesome/css/font-awesome.min.css'

/* bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
// Mock.init()

axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.withCredentials = true

Vue.config.productionTip = false

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  console.log(this.$cookies)
  /* 若返回登录界面，则清除sessionStorage数据 */
  if (to.path === '/login') {
    sessionStorage.clear()
    console.log('CLEAR!')
  }

  /* 在sessionStorage中提取user */
  let user = JSON.parse(sessionStorage.getItem('user'))
  console.log(user, to.path, sessionStorage.getItem('token'))

  /* 若sessionStorage中没有user，则跳至login页面 */
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    if (user) {
      store.dispatch('setUser', user)
    }
    if (to.path === '/') {
      next({ path: '/home' })
    } else {
      next()
    }
  }
})

axios.interceptors.response.use(
  response => {
    sessionStorage.setItem('token', JSON.stringify(document.cookie))
    console.log('axios.interceptors.response cookie', document.cookie)
    return response
  },
  error => {
    console.log('axios.interceptors.response', error)
    return Promise.reject(error)
  }
)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
