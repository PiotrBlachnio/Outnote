import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import auth from './modules/auth';
import notification from './modules/notification';
import notes from './modules/notes';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'cache',
  storage: window.localStorage,
  reducer: state => ({
    user: state.user,
    notes: state.notes,
    isAuthenticated: state.isAuthenticated
  })
});

export default new Vuex.Store({
  modules: {
    auth,
    notification,
    notes
  },
  plugins: [vuexLocal.plugin]
});
