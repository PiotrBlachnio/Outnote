import axios from 'axios';

export default {
  state: {
    categories: {},
    editedNotes: {}
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
    },
    NOTES_ADD_NEW_NOTE(state, note) {
      if (!state.categories[note.categoryId].notes) {
        state.categories[note.categoryId].notes = {};
      }

      state.categories[note.categoryId].notes[note._id] = note;
    },
    NOTES_SAVE_NOTE(state, { note, field, data }) {
      if (!state.editedNotes[note._id]) state.editedNotes[note._id] = {};

      state.categories[note.categoryId].notes[note._id] = note;
      state.editedNotes[note._id][field] = data;
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
    async saveNote({ commit }, data) {
      commit('NOTES_SAVE_NOTE', {
        note: data.note,
        field: data.field,
        data: data.data
      });
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
