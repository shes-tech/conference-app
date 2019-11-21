import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: () => import(/* webpackChunkName: "base-page" */ './views/BasePage.vue'),
      children: [
        {
          path: '',
          redirect: 'events',
        },
        {
          path: 'events',
          name: 'events',
          component: () => import(/* webpackChunkName: "events" */ './views/Events.vue'),
        },
        {
          path: 'events/:id',
          name: 'event-details',
          component: () => import(/* webpackChunkName: "event-detail" */ './views/EventDetails.vue'),
        },
      ],
    },
    {
      path: '*',
      redirect: 'events',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  },
});
