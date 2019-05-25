// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Login from './page/Login.vue'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/* bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* css */
import './assets/css/loginPage.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  console.log(router.options.routes[1].meta.auth)
  if (!router.options.routes[1].meta.auth && to.path !== '/login') {
    next({
      path: '/login'
    })
  }
  next()
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
