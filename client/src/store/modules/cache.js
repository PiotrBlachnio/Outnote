import axios from 'axios';

export default {
  state: {
    categories: {}
  },
  mutations: {
    NOTES_FETCH_CATEGORIES(state, data) {
      state.categories = data;
    },
    NOTES_CLEAR(state) {
      state.categories = {};
    },
    NOTES_CATEGORIZE(state, { categoryId, notes }) {
      state.categories[categoryId].notes = notes;
    },
    NOTES_CACHE_NEW_CATEGORY(state, category) {
      state.categories[category._id] = category;
    },
    NOTES_REMOVE_CATEGORY(state, categoryId) {
      delete state.categories[categoryId];
    }
  },
  actions: {
    async fetchNotesCategories({ commit }) {
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
    async fetchNotes({ commit }, categoryId) {
      try {
        const response = await axios({
          url: '/note',
          method: 'get',
          params: {
            id: categoryId
          }
        });

        const notes = response.data.notes;

        commit('NOTES_CATEGORIZE', { categoryId, notes });
        return { data: response.data.notes, success: true };
      } catch (error) {
        return { ...error.response, success: false };
      }
    },
    async fetchSingleNote(Null, noteId) {
      try {
        const response = await axios({
          method: 'get',
          url: `/note/${noteId}`
        });

        return { data: response.data.note, success: true };
      } catch (error) {
        return { ...error.response, success: false };
      }
    },
    async addNewCategory({ commit }, name) {
      try {
        const response = await axios({
          url: '/category',
          method: 'post',
          data: {
            name: name
          }
        });

        commit('NOTES_CACHE_NEW_CATEGORY', response.data.category);
        return { success: true };
      } catch (error) {
        return { ...error.response, success: false };
      }
    },
    async removeCategory({ commit }, categoryId) {
      try {
        const response = await axios({
          url: '/category/' + categoryId,
          method: 'delete'
        });

        console.log(response);
        commit('NOTES_REMOVE_CATEGORY', categoryId);
        return { success: true };
      } catch (error) {
        return { ...error.response, success: false };
      }
    }
  },
  getters: {
    areCategoriesCached: state => !!Object.entries(state.categories).length
  }
};
