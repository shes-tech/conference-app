<template>
  <div>
    <nav-bar />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view/>
    </transition>
    <custom-footer />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'BasePage',
  components: {
    'nav-bar': NavBar,
    'custom-footer': Footer,
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 160ms;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
