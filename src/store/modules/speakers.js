import Vue from 'vue';
import firebase from 'firebase/app';

const db = firebase.firestore();

const defaultState = {
  speakers: {},
  speakersList: [],
  speakersByEventId: {},
};

const actions = {
  fetchSpeakerByEventId: async ({ state, commit, rootGetters }, eventId) => {
    const event = rootGetters['events/events'][eventId];
    const speakerId = event.speaker.id;

    if (state.speakers[speakerId]) return;

    const document = await db.collection('speakers').doc(speakerId).get();
    const speaker = {
      id: document.id,
      ...document.data(),
    };

    commit('APPEND_LIST', { speaker, event });
  },
};

const getters = {
  speakers: state => state.speakers,
  speakersAsArray: state => state.speakersList.map(id => state.speakers[id]),
  speakersByEventId: state => state.speakersByEventId,
};

const mutations = {
  APPEND_LIST: (state, { speaker, event }) => {
    state.speakersList.push(speaker.id);
    Vue.set(state.speakers, speaker.id, speaker);
    if (event) Vue.set(state.speakersByEventId, event.id, speaker);
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
