import Vue from 'vue';
import firebase from 'firebase/app';

import { parse, set } from 'date-fns';

const db = firebase.firestore();

const INITIAL_FETCH_LIMIT = 2;
const UPDATE_FETCH_LIMIT = 3;

const defaultState = {
  events: {},
  nextEvents: [],
  eventsByDay: {
    '2019-11-21': [],
    '2019-11-22': [],
    '2019-11-23': [],
  },
  canFetchMore: {
    next: false,
    '2019-11-21': false,
    '2019-11-22': false,
    '2019-11-23': false,
  },
};

const actions = {
  fetchNextEvents: async ({ state, commit }) => {
    if (state.nextEvents.length > 0) return;

    const events = {};

    const snapshot = await db.collection('events').orderBy('startTime').limit(INITIAL_FETCH_LIMIT).get();
    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    commit('APPEND_EVENTS_TO_NEXT', { events });
    commit('CAN_FETCH_MORE', { status: true, type: 'next' });
  },
  fetchMoreNextEvents: async ({ state, commit }) => {
    const lastElementID = state.nextEvents[state.nextEvents.length - 1];
    if (!lastElementID || !state.canFetchMore.next) return;

    const lastElement = state.events[lastElementID];

    const events = {};
    const snapshot = await db.collection('events')
      .orderBy('startTime')
      .startAfter(lastElement.startTime)
      .limit(UPDATE_FETCH_LIMIT)
      .get();
    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    commit('APPEND_EVENTS_TO_NEXT', { events });
  },
  fetchEventsByDay: async ({ state, commit }, { day }) => {
    if (state.eventsByDay[day].length > 0) return;

    const events = {};

    const now = new Date();
    let start = parse(day, 'yyyy-MM-dd', now);
    start = set(start, { hours: 0, minutes: 0 });
    let end = parse(day, 'yyyy-MM-dd', now);
    end = set(end, { hours: 23, minutes: 59 });

    const snapshot = await db.collection('events')
      .where('startTime', '>=', start)
      .where('startTime', '<=', end)
      .orderBy('startTime')
      .limit(INITIAL_FETCH_LIMIT)
      .get();

    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    commit('APPEND_EVENTS_TO_DAY', { events, day });
    commit('CAN_FETCH_MORE', { status: true, type: day });
  },
  fetchMoreEventsByDay: async ({ state, commit }, { day }) => {
    const lastElementID = state.eventsByDay[day][state.eventsByDay[day].length - 1];
    if (!lastElementID || !state.canFetchMore[day]) return;

    const lastElement = state.events[lastElementID];

    const events = {};

    const now = new Date();
    let start = parse(day, 'yyyy-MM-dd', now);
    start = set(start, { hours: 0, minutes: 0 });
    let end = parse(day, 'yyyy-MM-dd', now);
    end = set(end, { hours: 23, minutes: 59 });

    const snapshot = await db.collection('events')
      .where('startTime', '>=', start)
      .where('startTime', '<=', end)
      .orderBy('startTime')
      .startAfter(lastElement.startTime)
      .limit(UPDATE_FETCH_LIMIT)
      .get();

    snapshot.forEach((doc) => {
      events[doc.id] = { id: doc.id, ...doc.data() };
    });

    commit('APPEND_EVENTS_TO_DAY', { events, day });
  },
  fetchEventById: async ({ state, commit }, id) => {
    if (state.events[id]) return;

    const document = await db.collection('events').doc(id).get();

    const event = {
      id: document.id,
      ...document.data(),
    };

    commit('SAVE_EVENT', { event });
  },
};

const getters = {
  events: state => state.events,
  nextEvents: state => state.nextEvents.map(id => state.events[id]),
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
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};
