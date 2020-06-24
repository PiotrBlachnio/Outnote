import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'vuex',
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    auth: {
      status: null,
      rememberMe: false,
      token: localStorage.getItem('accessToken') || null
    },
    notification: {
      active: false,
      content: null,
      type: null
    },
    user: {}
  },
  mutations: {
    authSuccess(state, token) {
      state.auth.token = token;
      state.auth.status = true;
    },
    authError(state) {
      state.auth.status = false;
    },
    authLogout(state) {
      state.auth.status = false;
      state.auth.token = null;
    },
    authRememberData(state) {
      state.auth.rememberMe = true;
    },
    notificationShow(state, data) {
      state.notification.active = true;
      state.notification.content = data.content;
      state.notification.type = data.type;
    },
    notificationHide(state) {
      state.notification.active = false;
      state.notification.content = null;
      state.notification.type = null;
    }
  },
  actions: {
    async authSignIn({ commit }, user) {
      try {
        const response = await axios({
          url: '/login',
          method: 'post',
          data: user
        });

        commit('authSuccess', response.data.token);
        return { ...response, success: true };
      } catch (error) {
        commit('authError');
        return { ...error.response, success: false };
      }
    },
    authSignOut({ commit }) {
      commit('authLogout');
    },
    authRememberLoginData({ commit }) {
      commit('authRememberData');
    },
    notificationActivate({ commit }, data) {
      commit('notificationShow', data);

      setTimeout(() => {
        commit('notificationHide');
      }, 3000);
    }
  },
  modules: {},
  getters: {
    isAuthenticated: state => !!state.auth.token
  },
  plugins: [vuexLocal.plugin]
});
