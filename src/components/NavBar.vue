<template>
  <b-navbar class="is-dark" fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="@/assets/logo.png"
          alt="She's Tech Conference 2021"
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
        tag="router-link"
        to="/mentoria"
        :active="$route.path === '/mentoria'"
      >Mentoria</b-navbar-item>
      <b-navbar-item
        tag="a"
        target="_blank" rel="noopener noreferrer"
        href="https://forms.gle/VesWEZkgX57jVgKe8"
      >JOB.me</b-navbar-item>
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
