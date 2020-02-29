import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/* 
*  此处说明，如需登入才能访问的页面请将 meta 的 requireLogin 值改为 true 
*  如果路由页面的 requireLogin 值为 true 而用户未登入，将会转至Login页面,
*  
*/

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      requireLogin: false,
      skipIfLoggedIn: true,
    }
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      requireLogin: false,
      skipIfLoggedIn: false,
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      requireLogin: false,
      skipIfLoggedIn: true,
    }
  },
  {
    path: '/Index',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    meta: {
      requireLogin: true,
      skipIfLoggedIn: false,
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
