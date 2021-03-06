import axios from 'axios';

export default {
  state: {
    status: null
  },
  mutations: {
    AUTH_SUCCESS(state) {
      state.status = true;
    },
    AUTH_FAIL(state) {
      state.status = false;
    },
    AUTH_LOGOUT(state) {
      state.user = null;
      state.status = false;
    }
  },
  actions: {
    async signIn({ commit }, user) {
      try {
        await axios({
          url: '/auth/login',
          method: 'post',
          data: user
        });

        commit('AUTH_SUCCESS');
        return { success: true };
      } catch (error) {
        commit('AUTH_FAIL');
        return { ...error.response, success: false };
      }
    },
    async signOut({ commit }) {
      try {
        await axios({
          url: '/auth/logout',
          method: 'post'
        });

        commit('AUTH_LOGOUT');
        commit('NOTES_CLEAR');
      } catch (error) {
        return { ...error.response, success: false };
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.status
  }
};
