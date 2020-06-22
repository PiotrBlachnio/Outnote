import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAuthStatus: false,
    token: localStorage.getItem('accessToken') || '',
    user: {}
  },
  mutations: {},
  actions: {},
  modules: {}
});
