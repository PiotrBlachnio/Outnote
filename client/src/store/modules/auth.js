import axios from 'axios';

export default {
  state: {
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
    }
  },
  actions: {
    async authSignIn({ commit }, user) {
      try {
        const res = await axios({
          url: '/auth/login',
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
    }
  }
};
