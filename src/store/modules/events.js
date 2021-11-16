import Vue from 'vue';
import firebase from 'firebase/app';

import { parse, set, isAfter } from 'date-fns';

const db = firebase.firestore();

const INITIAL_FETCH_LIMIT = 4;
const UPDATE_FETCH_LIMIT = 6;
const CONFERENCE_FINISH = '2021-11-20T21:00:00.000Z';

const defaultState = {
  events: {},
  nextEvents: [],
  searchEvents: [],
  eventsByDay: {
    '2020-11-17': [],
    '2021-11-17': [],
    '2021-11-18': [],
    '2021-11-19': [],
    '2021-11-20': [],
  },
  canFetchMore: {
    next: false,
    search: false,
    '2020-11-17': false,
    '2021-11-17': false,
    '2021-11-18': false,
    '2021-11-19': false,
    '2021-11-20': false,
  },
  lastFetchedSnapshot: {
    next: null,
    search: null,
    '2020-11-17': null,
    '2021-11-17': null,
    '2021-11-18': null,
    '2021-11-19': null,
    '2021-11-20': null,
  },
  isEmpty: {
    search: false,
  },
  isConferenceFinished: false,
};

const actions = {
  fetchNextEvents: async ({ state, commit }) => {
    if (isAfter(new Date(), new Date(CONFERENCE_FINISH))) {
      commit('SET_CONFERENCE_FINISHED');
      return;
    }

    if (state.nextEvents.length > 0) return;

    const events = {};

    const now = new Date();
    const snapshot = await db.collection('events-2020')
      .orderBy('endTime')
      .orderBy('startTime')
      .where('endTime', '>=', now)
      .limit(INITIAL_FETCH_LIMIT)
      .get();

    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    const canLoadMore = Object.keys(events).length >= INITIAL_FETCH_LIMIT;

    commit('APPEND_EVENTS_TO_NEXT', { events });
    commit('SAVE_LAST_FETCHED_SNAPSHOT', { snapshot: lastSnapshot, type: 'next' });
    commit('CAN_FETCH_MORE', { status: canLoadMore, type: 'next' });
  },
  fetchMoreNextEvents: async ({ state, commit }) => {
    const lastElement = state.lastFetchedSnapshot.next;
    if (!lastElement || !state.canFetchMore.next) return;

    const events = {};
    const snapshot = await db.collection('events-2020')
      .orderBy('startTime')
      .startAfter(lastElement)
      .limit(UPDATE_FETCH_LIMIT)
      .get();
    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    const canLoadMore = Object.keys(events).length >= UPDATE_FETCH_LIMIT;

    commit('APPEND_EVENTS_TO_NEXT', { events });
    commit('SAVE_LAST_FETCHED_SNAPSHOT', { snapshot: lastSnapshot, type: 'next' });
    commit('CAN_FETCH_MORE', { status: canLoadMore, type: 'next' });
  },
  fetchEventsByDay: async ({ state, commit }, { day }) => {
    if (state.eventsByDay[day].length > 0) return;

    const events = {};

    const now = new Date();
    let start = parse(day, 'yyyy-MM-dd', now);
    start = set(start, { hours: 0, minutes: 0 });
    let end = parse(day, 'yyyy-MM-dd', now);
    end = set(end, { hours: 23, minutes: 59 });

    const snapshot = await db.collection('events-2020')
      .where('startTime', '>=', start)
      .where('startTime', '<=', end)
      .orderBy('startTime')
      .limit(INITIAL_FETCH_LIMIT)
      .get();

    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    const canLoadMore = Object.keys(events).length >= INITIAL_FETCH_LIMIT;

    commit('APPEND_EVENTS_TO_DAY', { events, day });
    commit('SAVE_LAST_FETCHED_SNAPSHOT', { snapshot: lastSnapshot, type: day });
    commit('CAN_FETCH_MORE', { status: canLoadMore, type: day });
  },
  fetchMoreEventsByDay: async ({ state, commit }, { day }) => {
    const lastElement = state.lastFetchedSnapshot[day];
    if (!lastElement || !state.canFetchMore[day]) return;

    const events = {};

    const now = new Date();
    let start = parse(day, 'yyyy-MM-dd', now);
    start = set(start, { hours: 0, minutes: 0 });
    let end = parse(day, 'yyyy-MM-dd', now);
    end = set(end, { hours: 23, minutes: 59 });

    const snapshot = await db.collection('events-2020')
      .where('startTime', '>=', start)
      .where('startTime', '<=', end)
      .orderBy('startTime')
      .startAfter(lastElement)
      .limit(UPDATE_FETCH_LIMIT)
      .get();

    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    const canLoadMore = Object.keys(events).length >= UPDATE_FETCH_LIMIT;

    commit('APPEND_EVENTS_TO_DAY', { events, day });
    commit('SAVE_LAST_FETCHED_SNAPSHOT', { snapshot: lastSnapshot, type: day });
    commit('CAN_FETCH_MORE', { status: canLoadMore, type: day });
  },
  fetchEventById: async ({ state, commit }, id) => {
    if (state.events[id]) return;

    const document = await db.collection('events-2020').doc(id).get();

    const event = {
      id: document.id,
      ...document.data(),
    };

    commit('SAVE_EVENT', { event });
  },

  clearSearch: ({ commit }) => {
    commit('CLEAR_SEARCH');
  },
  fetchSearchEvents: async ({ state, commit }, query) => {
    if (state.nextEvents.length > 0) return;
    if (state.isEmpty.search) return;

    const events = {};

    const snapshot = await db.collection('events-2020')
      .orderBy('title')
      .startAt(query)
      .endAt(`${query}${'\uf8ff'}`)
      .limit(INITIAL_FETCH_LIMIT)
      .get();

    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    const canLoadMore = Object.keys(events).length >= INITIAL_FETCH_LIMIT;
    const isEmpty = Object.keys(events).length === 0;

    commit('APPEND_EVENTS_TO_SEARCH', { events });
    commit('SAVE_LAST_FETCHED_SNAPSHOT', { snapshot: lastSnapshot, type: 'search' });
    commit('CAN_FETCH_MORE', { status: canLoadMore, type: 'search' });

    if (isEmpty) commit('SET_EMPTY', 'search');
  },
  fetchMoreSearchEvents: async ({ state, commit }, query) => {
    const lastElement = state.lastFetchedSnapshot.search;
    if (!lastElement || !state.canFetchMore.search) return;

    const events = {};
    const snapshot = await db.collection('events-2020')
      .orderBy('title')
      .startAt(query)
      .endAt(`${query}${'\uf8ff'}`)
      .startAfter(lastElement)
      .limit(UPDATE_FETCH_LIMIT)
      .get();

    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
    const canLoadMore = Object.keys(events).length >= UPDATE_FETCH_LIMIT;

    commit('APPEND_EVENTS_TO_SEARCH', { events });
    commit('SAVE_LAST_FETCHED_SNAPSHOT', { snapshot: lastSnapshot, type: 'search' });
    commit('CAN_FETCH_MORE', { status: canLoadMore, type: 'search' });
  },
};

const getters = {
  events: state => state.events,
  nextEvents: state => state.nextEvents.map(id => state.events[id]),
  searchEvents: state => state.searchEvents.map(id => state.events[id]),
  isEmpty: state => state.isEmpty,
  eventsByDay: (state) => {
    const eventsByDay = { ...state.eventsByDay };
    Object.keys(eventsByDay).forEach((day) => {
      eventsByDay[day] = eventsByDay[day].map(id => state.events[id]);
    });
    return eventsByDay;
  },
};

const mutations = {
  APPEND_EVENTS_TO_NEXT: (state, { events }) => {
    state.events = { ...state.events, ...events };
    state.nextEvents = [...state.nextEvents, ...Object.keys(events)];
  },
  APPEND_EVENTS_TO_DAY: (state, { events, day }) => {
    state.events = { ...state.events, ...events };
    state.eventsByDay[day] = [...state.eventsByDay[day], ...Object.keys(events)];
  },
  SAVE_EVENT: (state, { event }) => {
    Vue.set(state.events, event.id, event);
  },
  CAN_FETCH_MORE: (state, { status, type }) => {
    state.canFetchMore[type] = status;
  },
  SAVE_LAST_FETCHED_SNAPSHOT: (state, { snapshot, type }) => {
    state.lastFetchedSnapshot[type] = snapshot;
  },
  SET_CONFERENCE_FINISHED: (state) => {
    state.isConferenceFinished = true;
  },

  CLEAR_SEARCH: (state) => {
    state.searchEvents = [];
    state.isEmpty.search = false;
    state.canFetchMore.search = false;
    state.lastFetchedSnapshot.search = null;
  },
  APPEND_EVENTS_TO_SEARCH: (state, { events }) => {
    state.events = { ...state.events, ...events };
    state.searchEvents = [...state.searchEvents, ...Object.keys(events)];
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
