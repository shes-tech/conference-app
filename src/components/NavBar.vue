<template>
  <b-navbar class="is-dark" fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://static1.squarespace.com/static/583ca58137c5810ef26a2e95/t/5d43921770e0f000010369e9/1570679114281/?format=1500w"
          alt="She's Tech Conference 2019 logo"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        tag="router-link"
        to="/events"
        :active="$route.path === '/events'"
      >Cronograma</b-navbar-item>
      <b-navbar-item
        tag="router-link"
        to="/speakers"
        :active="$route.path === '/speakers'"
      >Palestrantes</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>
