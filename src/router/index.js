import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/page/Login/Login'

import Root from '@/page/Root'

import Home from '@/page/Home/Home'
import PersonInfo from '@/page/Home/PersonInfo'
import Message from '@/page/Home/Message'

import Questionnaire from '@/page/Questionnaire/Questionnaire'
import QuestionnaireCreate from '@/page/Questionnaire/Create'
import QuestionnaireMine from '@/page/Questionnaire/Mine'

import Errand from '@/page/Errand/Errand'
import ErrandCreate from '@/page/Errand/Create'
import ErrandMine from '@/page/Errand/Mine'

import NotFound from '@/page/404'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'NIFFLER',
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
              path: '/home/message',
              name: '设置',
              component: Message
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
              component: QuestionnaireCreate
            },
            {
              path: '/questionnaire/mine',
              name: '我的问卷',
              component: QuestionnaireMine
            }
          ]
        },
        {
          path: '/errand',
          name: '跑腿办事',
          component: Errand,
          children: [
            {
              path: '/errand/create',
              name: '创建订单',
              component: ErrandCreate
            },
            {
              path: '/errand/mine',
              name: '我的订单',
              component: ErrandMine
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
    }
  ]
})

export default router
