export default {
  state: {
    active: false,
    content: null,
    type: null
  },
  mutations: {
    notificationShow(state, data) {
      state.active = true;
      state.content = data.content;
      state.type = data.type;
      if (data.time) state.time = data.time;
    },
    notificationHide(state) {
      state.active = false;
      state.content = null;
      state.type = null;
    }
  },
  actions: {
    notificationActivate({ commit, state }, data) {
      let closeDelay = data.time || 4500;

      if (state.active) {
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
    }
  }
};
