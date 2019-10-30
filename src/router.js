import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: () => import(/* webpackChunkName: "admin" */ './views/BasePage.vue'),
      children: [
        {
          path: '',
          redirect: 'events',
        },
        {
          path: 'events',
          name: 'events',
          component: () => import(/* webpackChunkName: "admin" */ './views/NextEvents.vue'),
        },
        {
          path: 'speakers',
          name: 'speakers',
          component: () => import(/* webpackChunkName: "admin" */ './views/NextEvents.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/BlankRouterLink.vue'),
      children: [
        {
          path: 'login',
          name: 'admin-login',
          component: () => import(/* webpackChunkName: "admin" */ './views/admin/AdminLogin.vue'),
        },
        {
          path: '',
          name: 'admin',
          component: () => import(/* webpackChunkName: "admin" */ './views/admin/AdminBasePage.vue'),
          children: [
            {
              path: 'events',
              component: () => import(/* webpackChunkName: "admin" */ './views/BlankRouterLink.vue'),
              children: [
                {
                  path: '',
                  name: 'admin-events',
                  component: () => import(/* webpackChunkName: "admin" */ './views/admin/AdminEventsList.vue'),
                },
                {
                  path: ':id',
                  name: 'admin-event-details',
                  component: () => import(/* webpackChunkName: "admin" */ './views/admin/AdminEventDetails.vue'),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
