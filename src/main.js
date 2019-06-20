// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'

/* theme */
// import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/theme/element-#1D365D/index.css'

/* bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* font-awesome */
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
// Vue.use(store)

Vue.config.productionTip = false
process.env.MOCK && require('@/mock')

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  console.log(store.getters.getIsAuth, to.path)
  if (!store.getters.getIsAuth && to.path !== '/login' && to.path !== '/register') {
    next({
      path: '/login'
    })
  } else {
    if (to.path === '/') {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
