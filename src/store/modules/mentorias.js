import Vue from 'vue';
import firebase from 'firebase/app';

// import { parse, set, isAfter } from 'date-fns';

const db = firebase.firestore();
const COLLECTION_NAME = 'mentorias-2021';

const INITIAL_FETCH_LIMIT = 4;
const UPDATE_FETCH_LIMIT = 6;

const defaultState = {
  mentorias: {},
  nextMentorias: [],
  canFetchMore: {
    next: false,
  },
  lastFetchedSnapshot: {
    next: null,
  },
  isEmpty: {
    next: false,
  },
  isConferenceFinished: false,
};

const actions = {
  fetchNextMentorias: async ({ state, commit }) => {
    if (state.nextMentorias.length > 0) return;

    const mentorias = {};

    const snapshot = await db.collection(COLLECTION_NAME)
      .limit(INITIAL_FETCH_LIMIT)
      .get();

    snapshot.forEach((doc) => {
      mentorias[doc.id] = { id: doc.id, ...doc.data() };
    });

    const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    const canLoadMore = Object.keys(mentorias).length >= INITIAL_FETCH_LIMIT;

    commit('APPEND_MENTORIAS_TO_NEXT', { mentorias });
    commit('SAVE_LAST_FETCHED_SNAPSHOT', { snapshot: lastSnapshot, type: 'next' });
    commit('CAN_FETCH_MORE', { status: canLoadMore, type: 'next' });
  },
  fetchMoreNextMentorias: async ({ state, commit }) => {
    const lastElement = state.lastFetchedSnapshot.next;
    if (!lastElement || !state.canFetchMore.next) return;

    const mentorias = {};
    const snapshot = await db.collection(COLLECTION_NAME)
      .startAfter(lastElement)
      .limit(UPDATE_FETCH_LIMIT)
      .get();
    snapshot.forEach((doc) => {
      mentorias[doc.id] = { id: doc.id, ...doc.data() };
    });

    const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    const canLoadMore = Object.keys(mentorias).length >= UPDATE_FETCH_LIMIT;

    commit('APPEND_MENTORIAS_TO_NEXT', { mentorias });
    commit('SAVE_LAST_FETCHED_SNAPSHOT', { snapshot: lastSnapshot, type: 'next' });
    commit('CAN_FETCH_MORE', { status: canLoadMore, type: 'next' });
  },
  fetchMentoriaById: async ({ state, commit }, id) => {
    if (state.mentorias[id]) return;

    const document = await db.collection(COLLECTION_NAME).doc(id).get();

    const mentoria = {
      id: document.id,
      ...document.data(),
    };

    commit('SAVE_MENTORIA', { mentoria });
  },
};

const getters = {
  mentorias: state => state.mentorias,
  nextMentorias: state => state.nextMentorias.map(id => state.mentorias[id]),
  isEmpty: state => state.isEmpty.next,
};

const mutations = {
  APPEND_MENTORIAS_TO_NEXT: (state, { mentorias }) => {
    state.mentorias = { ...state.mentorias, ...mentorias };
    state.nextMentorias = [...state.nextMentorias, ...Object.keys(mentorias)];
  },
  SAVE_MENTORIA: (state, { mentoria }) => {
    Vue.set(state.mentorias, mentoria.id, mentoria);
  },
  CAN_FETCH_MORE: (state, { status, type }) => {
    state.canFetchMore[type] = status;
  },
  SAVE_LAST_FETCHED_SNAPSHOT: (state, { snapshot, type }) => {
    state.lastFetchedSnapshot[type] = snapshot;
  },
  SET_EMPTY: (state, type) => {
    state.isEmpty[type] = true;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
