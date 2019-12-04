import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import ElementUI from 'element-ui';
import vuetify from './plugins/vuetify';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/home.css';
import VueProgressBar from 'vue-progressbar';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import '@/plugins/guetsdk';


Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Vuex);

import '@/store';

const options = {
  color: '#ffffff',
  failedColor: '#874b4b',
  thickness: '4px',
  transition: {
    speed: '0.4s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
};

Vue.use(VueProgressBar, options);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
