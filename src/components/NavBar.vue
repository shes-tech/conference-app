<template>
  <b-navbar class="is-dark" fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://static1.squarespace.com/static/583ca58137c5810ef26a2e95/t/5f5070f146e3c302a0c2a1f9/1604689057447/?format=320w"
          alt="She's Tech Conference 2019 logo"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        tag="a"
        href="https://shestech.org/"
      >Página Inicial</b-navbar-item>
      <b-navbar-item
        tag="router-link"
        to="/events"
        :active="$route.path === '/events'"
      >Programação</b-navbar-item>
      <b-navbar-item
        tag="a"
        href="https://shestech.org/conference-2019"
      >2019</b-navbar-item>
      <b-navbar-item
        tag="a"
        href="https://shestech.org/conference-2018"
      >2018</b-navbar-item>
      <b-navbar-item
        tag="a"
        href="https://shestech.org/conference-2017"
      >2017</b-navbar-item>
      <b-navbar-item
        tag="a"
        href="https://shestech.org/quem-somos"
      >Quem Somos</b-navbar-item>
      <b-navbar-item
        tag="a"
        href="https://shestech.org/contato"
      >Contato</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" href="https://admin.shestech.org/">
            <b-icon
              icon="user-cog"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            <strong>Login</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>
