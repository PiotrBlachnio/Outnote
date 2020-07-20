export default {
  state: {
    active: false,
    content: null,
    type: null
  },
  mutations: {
    NOTIFICATION_SHOW(state, data) {
      state.active = true;
      state.content = data.content;
      state.type = data.type;
      if (data.time) state.time = data.time;
    },
    NOTIFICATION_HIDE(state) {
      state.active = false;
      state.content = null;
      state.type = null;
    }
  },
  actions: {
    notificationActivate({ commit, state }, data) {
      let closeDelay = data.time || 4500;

      if (state.active) {
        commit('NOTIFICATION_HIDE');
        closeDelay = data.time || 4500;

        setTimeout(() => {
          commit('NOTIFICATION_SHOW', data);
        }, 500);
      } else {
        commit('NOTIFICATION_SHOW', data);
      }

      setTimeout(() => {
        commit('NOTIFICATION_HIDE');
      }, closeDelay);
    }
  }
};
