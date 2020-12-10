import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import router from './router';
import VueBus from 'vue-bus';
import MyAppBar from '@/components/MyAppBar';
import WithAppBar from '@/components/WithAppBar';
import other from '@/plugins/other';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import save from "@/lib/save_data";
import get from "@/lib/get_data";
import relogin from "@/lib/relogin";
import SnackbarComponent from '@/components/snackbar';
import DialogComponent from '@/components/dialog';
import plusExtends from '@/lib/plus';
import '@/lib/check';

Vue.use(VueBus);
Vue.config.productionTip = false

Vue.use(SnackbarComponent, {
  vuetify,
  timeout: 3000,
});

Vue.use(DialogComponent, {
  vuetify,
});

Vue.use(other);
Vue.prototype.$save = save;
Vue.prototype.$get = get;
Vue.prototype.$relogin = relogin;
Vue.component(VueQrcode.name, VueQrcode);
Vue.prototype.$plusExtends = plusExtends;

Vue.component('my-app-bar', MyAppBar);
Vue.component('with-app-bar', WithAppBar);

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin === true) {  //判断是否需要登录
    if (get.getAuthData() !== false && get.getAuthData().full_cookie !== null) {
      if (to.meta.skipIfLoggedIn === true) {
        next({
          name: "Index"
        });
      } else {
        next();
      }
    } else {
      if (!get.getAuthData().full_cookie) {
        next({
          name: "Login",
          params: {
            from: to.fullPath
          }
        });
      } else {
        next();
      }
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
