import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/* 
*  此处说明，如需登入才能访问的页面请将 meta 的 role 值改为 true 
*  如果路由页面的 role 值为 true 而用户未登入，将会转至Login页面
*/

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      role: false
    }
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      role: false
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      role: false
    }
  },
  {
    path: '/Index',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    meta: {
      role: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
