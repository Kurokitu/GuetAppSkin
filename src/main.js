import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import snackbar from '@/components/Snackbar/int';
import MyAppBar from '@/components/MyAppBar';
import WithAppBar from '@/components/WithAppBar';
import { VuePsysPlugin, VueDynamicCardPlugin } from '@/plugins/psys.js';
import { ClientHolder, GUETPlugin } from '@/plugins/guetsdk_plugin'; // 引入GuetSKD
import './usersaving';
import other from '@/plugins/other';
import VueQrcode from '@chenfengyuan/vue-qrcode';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$snackbar = snackbar;
Vue.use(new GUETPlugin());
Vue.use(new VuePsysPlugin());
Vue.use(new VueDynamicCardPlugin());
Vue.use(other);
Vue.component(VueQrcode.name, VueQrcode);

Vue.component('my-app-bar', MyAppBar);
Vue.component('with-app-bar', WithAppBar);

/*
*   关于GuetSDk:
*   SDK已经封装好了部分函数，可以直接调用，
*   详细请参考 /src/plugins/guetsdk 内的文件的注释示例以添加新的函数
*   GuetSDK By Rubicon L
*/

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin === true) {  //判断是否需要登录
    if (ClientHolder.value.isLogin) {
      if (to.meta.skipIfLoggedIn === true) {
        next({
          name: "Index"
        });
      } else {
        next();
      }
    } else {
      ClientHolder.value.askLogin().then((isLogin) => {
        if (isLogin === false) {
          next({
            name: "Login",
            params: {
              from: to.fullPath
            }
          });
        } else {
          next();
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
