import axios from 'axios';

export default {
  state: {
    categories: []
  },
  mutations: {
    NOTES_FETCH_CATEGORIES(state, data) {
      state.cache.categories = data;
    },
    NOTES_FETCH_NOTES(state, data) {
      state.cache.notes = data;
    },
    NOTES_CLEAR(state) {
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

        commit('NOTES_FETCH_CATEGORIES', response.data.categories);
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

        commit('NOTES_FETCH_NOTES', response.data.notes);
        return { ...response.data.notes, success: true };
      } catch (error) {
        return { ...error.response, success: false };
      }
    }
  }
};
