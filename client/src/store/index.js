import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
import VuexPersistence from 'vuex-persist';

import auth from './modules/auth';
import user from './modules/user';
import notification from './modules/notification';
import cache from './modules/cache';
import dialog from './modules/dialog';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'cache',
  storage: window.localStorage,
  reducer: state => ({
    auth: state.auth,
    user: state.user,
    cache: state.cache
  })
});

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    notification,
    cache,
    dialog
  },
  plugins: [vuexLocal.plugin]
});

// if (store.getters.isAuthenticated) {
//   setInterval(async () => {
//     try {
//       const response = await axios({
//         method: 'put',
//         url: '/note',
//         data: {
//           notes: store.state.cache.editedNotes
//         }
//       });

//       console.log(response);
//     } catch (error) {
//       console.log(error.response);
//     }
//   }, 30000);
// }

export default store;
