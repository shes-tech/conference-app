import firebase from 'firebase/app';

const db = firebase.firestore();

const defaultState = {
  list: [],
};

const actions = {
  getEvents: async ({ commit }) => {
    const events = [];
    const snapshot = await db.collection('events').get();
    snapshot.forEach(doc => events.push(doc.data()));
    commit('SET_LIST', events);
  },
};

const getters = {
  events: state => state.list,
};

const mutations = {
  SET_LIST: (state, events) => {
    state.list = events;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
