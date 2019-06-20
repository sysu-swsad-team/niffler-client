// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Mock from './mock/index'

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
Mock.init()
// Vue.use(store)

Vue.config.productionTip = false
process.env.MOCK && require('@/mock')

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  /* 若返回登录界面，则清除localStorage数据 */
  if (to.path === '/login') {
    localStorage.removeItem('user')
  }
  let user = JSON.parse(localStorage.getItem('user'))
  console.log(user, to.path)
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    if (to.path === '/') {
      next({ path: '/home' })
    } else {
      next()
    }
  }
  // console.log(store.getters.getIsAuth, to.path)
  // if (!store.getters.getIsAuth && to.path !== '/login' && to.path !== '/register') {
  //   next({
  //     path: '/login'
  //   })
  // } else {
  //   if (to.path === '/') {
  //     next({
  //       path: '/home'
  //     })
  //   } else {
  //     next()
  //   }
  // }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
