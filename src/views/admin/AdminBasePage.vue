<template>
  <div>
    <admin-base-page />
    <router-view />
  </div>
</template>

<script>
import AdminNavBar from '../../components/admin/AdminNavBar.vue';

export default {
  name: 'AdminBasePage',
  components: {
    'admin-base-page': AdminNavBar,
  },
};
</script>

<style lang="scss" scoped>

</style>
