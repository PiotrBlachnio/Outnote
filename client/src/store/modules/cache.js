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
    NOTES_CATEGORIZE(state, notes) {
      state.categories.forEach(category => {
        notes.forEach(note => {
          if (note.categoryId === category._id) {
            category.notes.push(note);
          }
        });
      });
    },
    NOTES_CACHE_NEW_CATEGORY(state, category) {
      state.categories[category._id] = category;
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
    async fetchNotes({ commit }) {
      try {
        const response = await axios({
          url: '/note',
          method: 'get'
        });

        commit('NOTES_CATEGORIZE', response.data.notes);
        return { ...response.data.notes, success: true };
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
    }
  },
  getters: {
    areCategoriesCached: state => !!Object.entries(state.categories).length
  }
};
