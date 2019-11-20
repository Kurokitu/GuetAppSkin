import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Optionske from '@/views/Page/Optionske.vue'
import Optionskc from '@/views/Page/Optionskc.vue'
import Coures from '@/views/Page/Coures.vue'
import iSelectedget from '@/views/Page/Selectedget.vue'
import Creadit from '@/views/Page/Creadit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Optionske',
      name: 'Optionske',
      component: Optionske
    },{
      path: '/Optionskc',
      name: 'Optionskc',
      component: Optionskc
    },
    {
      path: '/Coures',
      name: 'Coures',
      component: Coures
    },
    {
      path: '/iSelectedget/:t',
      name: 'iSelectedget',
      component: iSelectedget
    },{
      path: '/Creadit',
      name: 'Creaditc',
      component: Creadit
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
