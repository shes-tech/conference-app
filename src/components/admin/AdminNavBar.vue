<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://static1.squarespace.com/static/583ca58137c5810ef26a2e95/t/5d43921770e0f000010369e9/1570679114281/?format=1500w"
          alt="She's Tech Conference 2019 logo"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">Início</b-navbar-item>
      <b-navbar-item href="#">Palestrantes</b-navbar-item>
      <b-navbar-item href="#">Eventos</b-navbar-item>
      <b-navbar-item href="#">Participantes</b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">About</b-navbar-item>
        <b-navbar-item href="#">Contact</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">Sair</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'AdminNavBar',
};
</script>
