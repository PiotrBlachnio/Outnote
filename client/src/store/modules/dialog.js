export default {
  state: {
    isActive: false,
    data: {}
  },
  mutations: {
    DIALOG_OPEN(state, { title, type, mode, defaultValue }) {
      state.isActive = true;
      state.data.title = title;
      state.data.type = type || 'confirm';
      state.data.mode = mode || 'remove';
      if (defaultValue) state.data.defaultValue = defaultValue;
    },
    DIALOG_CLOSE(state) {
      state.isActive = null;
      state.data = {};
    }
  },
  actions: {
    openDialog({ commit }, dialogData) {
      commit('DIALOG_OPEN', dialogData);
    },
    closeDialog({ commit }) {
      commit('DIALOG_CLOSE');
    }
  }
};
