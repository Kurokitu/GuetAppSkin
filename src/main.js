import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/home.css';
import VueProgressBar from 'vue-progressbar'
//import axios from 'axios'
//import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import { Service } from '@/plugins/api/Service'
import allLogin from '@/plugins/loginsdk'
//import { showLoading, hideLoading } from './plugins/loading'

Vue.prototype.$axios = Service;
Vue.use(allLogin);
Vue.use(ElementUI);
Vue.config.productionTip = false
//Vue.use(VueAxios,axios);
//Vue.use(showLoading);
//Vue.use(hideLoading);

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
}

Vue.use(VueProgressBar, options)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
