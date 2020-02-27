import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import { ClientHolder, GUETPlugin } from '@/plugins/guetsdk_plugin';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(new GUETPlugin());

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.role === true) {//判断是否需要登录
    if (ClientHolder.value.isLogin) {
      next();
    } else {
      next({
        name: "login",
        params: {
          from: to.fullPath
        }
      });
    }

  } else {
    next();
  }
});

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
