import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/Login'
import Home from '@/page/Home'
import NotFound from '@/page/404'
import Register from '@/page/Register'
// import QuestionnaireCreate from '@/page/Questionnaire/Create'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { isCollapse: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: false }
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
