/* Vuex介绍 https://segmentfault.com/a/1190000015782272 */
import Vue from 'vue'
import Vuex from 'vuex'

import avatar from '@/assets/images/login-background.jpg'
import logo from '@/assets/images/niffler-logo.png'

Vue.use(Vuex)

// 要设置的全局访问的state对象
const state = {
  // 要设置的初始属性值
  token: '',
  isCollapse: false,
  sysname: 'NIFFLER',
  name: 'pmlpml', // 用户名即真实姓名
  avatar: avatar,
  stuId: 16340000,
  birth: '1990-02',
  sex: '男',
  grade: '大一',
  major: '软件工程',
  email: 'pmlpml@niffler.com',
  balance: 10086, // 闲钱币数量
  msgNumUnread: 100, // 未读信息数量
  logo: logo
}

// 实时监听state值的变化(最新状态)
const getters = {
  // 承载变化的isCollapse的值
  getIsCollapse (state) {
    return state.isCollapse
  },
  getInfo (state) {
    return {
      sysname: state.sysname,
      name: state.name,
      avatar: state.avatar,
      stuId: state.stuId,
      birth: state.birth,
      sex: state.sex,
      grade: state.grade,
      major: state.major,
      email: state.email,
      balance: state.balance,
      msgNumUnread: state.msgNumUnread,
      logo: state.logo
    }
  },
  getUser (state) {
    return {
      email: state.email,
      avatar: state.avatar,
      balance: state.balance,
      name: state.name,
      stuId: state.stuId,
      birth: state.birth,
      sex: state.sex,
      grade: state.grade,
      major: state.major
    }
  }
}

// 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
// mutations: 对数据的同步更改（请勿使用，应使用actions里的方法）
const mutations = {
  mutationsChangeSideBar (state) {
    state.isCollapse = !state.isCollapse
  },
  mutationsSetInfo (state, payload) {
    console.log('mutationsSetInfo', payload['itemName'], payload['itemValue'])
    state[payload['itemName']] = payload['itemValue']
  },
  mutationsSetUser (state, user) {
    for (var key in user) {
      state[key] = user[key]
    }
  }
}

// 自定义触发mutations里函数的方法，context与store实例具有相同方法和属性
// actions: 对数据的异步更改
const actions = {
  changeSideBar (context) {
    context.commit('mutationsChangeSideBar')
  },
  setInfo (context, payload) {
    context.commit('mutationsSetInfo', payload)
    localStorage.setItem('user', JSON.stringify(this.getters.getUser))
  },
  setUser (context, user) {
    context.commit('mutationsSetUser', user)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
