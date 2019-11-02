import Vue from 'vue';
import firebase from 'firebase/app';

const db = firebase.firestore();

const defaultState = {
  events: {},
  eventsList: [],
};

const actions = {
  fetchAllEvents: async ({ commit }) => {
    const events = {};
    const snapshot = await db.collection('events').orderBy('startTime').get();
    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    commit('SET_LIST', events);
  },
  fetchEventById: async ({ state, commit }, id) => {
    if (state.events[id]) return;

    const document = await db.collection('events').doc(id).get();

    const event = {
      id: document.id,
      ...document.data(),
    };

    commit('APPEND_LIST', event);
  },
};

const getters = {
  events: state => state.events,
  eventsAsArray: state => state.eventsList.map(id => state.events[id]),
};

const mutations = {
  SET_LIST: (state, events) => {
    state.events = events;
    state.eventsList = Object.keys(events);
  },
  APPEND_LIST: (state, event) => {
    state.eventsList.push(event.id);
    Vue.set(state.events, event.id, event);
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
