import firebase from 'firebase/app';

const db = firebase.firestore();

const defaultState = {
  list: [],
};

const actions = {
  getEvents: async ({ commit }) => {
    let events = [];
    const snapshot = await db.collection('events').get();
    snapshot.forEach(doc => events.push({
      id: doc.id,
      ...doc.data(),
    }));

    events = events.map(event => ({
      ...event,
      start_date: event.end_date.toDate(),
      end_date: event.end_date.toDate(),
    }));

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
