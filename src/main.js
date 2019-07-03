// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import axios from 'axios'
import utils from './utils'

/* theme */
import '../src/assets/theme/element-#1D365D/index.css'
import 'font-awesome/css/font-awesome.min.css'

/* bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* axios设置 */
axios.defaults.baseURL = 'http://129.204.53.183:8000'
// axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.withCredentials = true

/* 路由全局守卫 */
router.beforeEach((to, from, next) => {
  /* 若返回登录界面，则清除sessionStorage数据 */
  if (to.path === '/login') {
    sessionStorage.clear()
    utils.clearCookies()
  }

  /* 在sessionStorage中提取user */
  let user = JSON.parse(sessionStorage.getItem('user'))

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
