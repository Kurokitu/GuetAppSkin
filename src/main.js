import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import { ClientHolder, GUETPlugin } from '@/plugins/guetsdk_plugin'; // 引入GuetSKD

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(new GUETPlugin());

/*
*   关于GuetSDk:
*   SDK已经封装好了部分函数，可以直接调用，
*   详细请参考 /src/plugins/guetsdk 内的文件的注释示例以添加新的函数
*   GuetSDK By Rubicon L
*/

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.role === true) {  //判断是否需要登录
    if (ClientHolder.value.isLogin) {
      next();
    } else {
      next({
        name: "Login",
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
