<template>
  <div class="base-main">
    <nav-bar />
    <router-view/>
    <custom-footer />

    <modal-lead />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import ModalLead from '../components/ModalLead.vue';

export default {
  name: 'BasePage',
  components: {
    'nav-bar': NavBar,
    'custom-footer': Footer,
    'modal-lead': ModalLead,
  },
  methods: {
    ...mapActions({
      fetchAllTags: 'tags/fetchAllTags',
    }),
  },
  created() {
    this.fetchAllTags();
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

<style lang="scss">
.base-main {
  background-color: #212222;
  color: #e8e6e3;
}
</style>
