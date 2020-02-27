import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/Index',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    meta: {
      role: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
