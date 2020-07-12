import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'cache',
  storage: window.localStorage,
  reducer: state => ({
    user: state.user,
    notes: state.notes,
    isAuthenticated: state.isAuthenticated
  })
});

export default new Vuex.Store({
  state: {
    notification: {
      active: false,
      content: null,
      type: null
    },
    cache: {
      categories: []
    },
    user: null,
    isAuthenticated: null
  },
  mutations: {
    authSuccess(state) {
      state.isAuthenticated = true;
    },
    authLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    authFetchUser(state, data) {
      state.user = data;
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
    },
    notesCategoriesCache(state, data) {
      state.cache.categories = data;
    },
    notesCache(state, data) {
      state.cache.notes = data;
    },
    notesClear(state) {
      state.cache.categories = [];
      state.cache.notes = [];
    }
  },
  actions: {
    async authSignIn({ commit }, user) {
      try {
        const res = await axios({
          url: '/login',
          method: 'post',
          data: user
        });

        console.log(res);
        commit('authSuccess');
        return { success: true };
      } catch (error) {
        return { ...error.response, success: false };
      }
    },
    authSignOut({ commit }) {
      commit('authLogout');
      commit('notesClear');
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
    },
    async notesCategoriesCache({ commit }) {
      try {
        const response = await axios({
          url: '/category',
          method: 'get'
        });

        commit('notesCategoriesCache', response.data.categories);
        return { data: response.data.categories, success: true };
      } catch (error) {
        return { ...error.response, success: false };
      }
    },
    async notesCache({ commit }) {
      try {
        const response = await axios({
          url: '/note',
          method: 'get'
        });

        commit('notesCache', response.data.notes);
        return { ...response.data.notes, success: true };
      } catch (error) {
        return { ...error.response, success: false };
      }
    }
  },
  modules: {},
  getters: {},
  plugins: [vuexLocal.plugin]
});
