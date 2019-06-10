import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/Login'

import Root from '@/page/Root'
import Home from '@/page/Home/Home'
import PersonInfo from '@/page/Home/PersonInfo'
import Settings from '@/page/Home/Settings'
import Questionnaire from '@/page/Questionnaire/Questionnaire'
import CreateQuestionnaire from '@/page/Questionnaire/Create'

import NotFound from '@/page/404'
import Register from '@/page/Register'
// import QuestionnaireCreate from '@/page/Questionnaire/Create'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Niffler',
      component: Root,
      children: [
        {
          path: '/home',
          name: '首页',
          component: Home,
          children: [
            {
              path: '/home/personinfo',
              name: '个人信息',
              component: PersonInfo
            },
            {
              path: '/home/settings',
              name: '设置',
              component: Settings
            }
          ]
        },
        {
          path: '/questionnaire',
          name: '问卷系统',
          component: Questionnaire,
          children: [
            {
              path: '/questionnaire/create',
              name: '创建问卷',
              component: CreateQuestionnaire
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
    // {
    //   path: '/questionnaire',
    //   name: 'questionnaire',
    //   component: QuestionnaireCreate
    // }
  ]
})

export default router
