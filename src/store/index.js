import Vue from 'vue';
import Vuex from 'vuex';

import events from './modules/events';
import speakers from './modules/speakers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    events,
    speakers,
  },
});
