import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import auth from './modules/auth';
import user from './modules/user';
import notification from './modules/notification';
import notes from './modules/notes';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'cache',
  storage: window.localStorage,
  reducer: state => ({
    auth: state.auth,
    user: state.user,
    notes: state.notes
  })
});

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    notification,
    notes
  },
  plugins: [vuexLocal.plugin]
});

export default store;
