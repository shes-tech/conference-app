import Vue from 'vue';
import firebase from 'firebase/app';

const db = firebase.firestore();
const COLLECTION_NAME = 'tags-2021';

const defaultState = {
  tags: {},
  allTags: [],
};

const actions = {
  fetchAllTags: async ({ commit }) => {
    const tags = {};

    const snapshot = await db.collection(COLLECTION_NAME).get();
    snapshot.forEach((doc) => {
      tags[doc.id] = { id: doc.id, ...doc.data() };
    });

    commit('SAVE_ALL_TAGS', { tags });
  },
  fetchTagById: async ({ commit }, id) => {
    const document = await db.collection(COLLECTION_NAME).doc(id).get();

    const tag = {
      id: document.id,
      ...document.data(),
    };

    commit('SAVE_TAG', { tag });
  },
};

const getters = {
  tags: state => state.tags,
  allTags: state => state.allTags.map(id => state.tags[id]),
};

const mutations = {
  SAVE_ALL_TAGS: (state, { tags }) => {
    state.tags = { ...tags };
    state.allTags = [...Object.keys(tags)];
  },
  SAVE_TAG: (state, { tag }) => {
    Vue.set(state.tags, tag.id, tag);
    if (state.allTags.length !== 0 && !state.allTags.includes(tag.id)) {
      state.allTags.push(tag.id);
    }
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
