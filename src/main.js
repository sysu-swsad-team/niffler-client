// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueRouter)

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
