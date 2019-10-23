import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/BlankRouterLink.vue'),
      children: [
        {
          path: 'login',
          name: 'admin-login',
          component: () => import(/* webpackChunkName: "admin" */ './views/admin/AdminLogin.vue'),
        },
        {
          path: 'logged-in',
          name: 'admin-logged-in',
          component: () => import(/* webpackChunkName: "admin" */ './views/admin/AdminBasePage.vue'),
          children: [
            {
              path: 'events',
              name: 'admin-events',
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
