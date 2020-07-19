import axios from 'axios';

export default {
  state: {
    data: null
  },
  mutations: {
    USER_SAVE(state, userData) {
      state.data = userData;
    }
  },
  actions: {
    async fetchUserData({ commit }) {
      try {
        const response = await axios({
          url: '/user',
          method: 'get'
        });

        commit('USER_SAVE', response.data);
        return { success: true };
      } catch (error) {
        return { ...error.response, success: false };
      }
    }
  }
};
