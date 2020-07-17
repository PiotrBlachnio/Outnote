import axios from 'axios';

export default {
  state: {
    categories: []
  },
  mutations: {
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
  }
};
