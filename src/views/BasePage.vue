<template>
  <div>
    <nav-bar />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view/>
    </transition>
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
.fade-enter-active,
.fade-leave-active {
  transition-duration: 180ms;
  transition-property: opacity;
  transition-timing-function: ease-in;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
