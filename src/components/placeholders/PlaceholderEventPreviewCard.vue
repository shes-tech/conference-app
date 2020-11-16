<template>
  <div
    class="tile is-child box pt-6 pb-6 is-unselectable is-tertiary placeholder-card"
  >
    <b-loading :is-full-page="false" :active="true" />
  </div>
</template>

<script>
export default {
  name: 'PlaceholderEventPreviewCard',
};
</script>

<style lang="scss" scoped>
.placeholder-card {
  background-color: #272828;
  position: relative;
  height: 160px;
}
</style>
