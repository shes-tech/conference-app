<template>
  <div>
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
  name: 'BasePage',
  components: {
    'nav-bar': NavBar,
  },
};
</script>

<style lang="scss" scoped>

</style>
