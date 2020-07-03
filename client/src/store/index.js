import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({ auth: state.auth, user: state.user })
});

export default new Vuex.Store({
  state: {
    auth: {
      status: null,
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
    notificationShow(state, data) {
      state.notification.active = true;
      state.notification.content = data.content;
      state.notification.type = data.type;
      if (data.time) state.notification.time = data.time;
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
    notificationActivate({ commit, state }, data) {
      let closeDelay = data.time || 4500;

      if (state.notification.active) {
        commit('notificationHide');
        closeDelay = data.time || 4500;

        setTimeout(() => {
          commit('notificationShow', data);
        }, 500);
      } else {
        commit('notificationShow', data);
      }

      setTimeout(() => {
        commit('notificationHide');
      }, closeDelay);
    }
  },
  modules: {},
  getters: {
    isAuthenticated: state => !!state.auth.token
  },
  plugins: [vuexLocal.plugin]
});
