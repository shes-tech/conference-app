import Vue from 'vue';
import Vuex from 'vuex';

import events from './modules/events';
import speakers from './modules/speakers';
import mentorias from './modules/mentorias';
import tags from './modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    events,
    speakers,
    mentorias,
    tags,
  },
});
