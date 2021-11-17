<template>
  <div
    class="tile is-child box pt-6 pb-6 is-unselectable is-tertiary placeholder-card"
  >
    <b-loading class="" :is-full-page="false" :active="true" />
  </div>
</template>

<script>
export default {
  name: 'PlaceholderEventPreviewCard',
};
</script>

<style lang="scss" scoped>
.placeholder-card {
  position: relative;
  height: 160px;
  z-index: 1;
}
</style>

<style lang="scss">
.placeholder-card {
  .loading-background {
    background-color: #343535;
  }
}
</style>
