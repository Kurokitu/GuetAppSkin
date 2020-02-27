import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from './user';
import userinfo from './userinfo';
import cookie from './cookie';

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user,
    userinfo,
    cookie
  }
});
