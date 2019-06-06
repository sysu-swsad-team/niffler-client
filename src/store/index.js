/* Vuex介绍 https://segmentfault.com/a/1190000015782272 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 要设置的全局访问的state对象
const state = {
  // 要设置的初始属性值
  isCollapse: false,
  isAuth: false
}

// 实时监听state值的变化(最新状态)
const getters = {
  // 承载变化的isCollapse的值
  getIsCollapse (state) {
    return state.isCollapse
  },
  getIsAuth (state) {
    return state.isAuth
  }
}

// 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
const mutations = {
  expand (state) {
    state.isCollapse = false
  },
  collapse (state) {
    state.isCollapse = true
  },
  mutationsExpandOrCollapse (state) {
    state.isCollapse = !state.isCollapse
  },
  mutationsSetAuth (state) {
    state.isAuth = true
  },
  mutationsResetAuth (state) {
    state.isAuth = false
  }
}

// 自定义触发mutations里函数的方法，context与store实例具有相同方法和属性
const actions = {
  changeSideBar (context) {
    context.commit('mutationsExpandOrCollapse')
  },
  setAuth (context) {
    context.commit('mutationsSetAuth')
  },
  resetAuth (context) {
    context.commit('mutationsResetAuth')
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
