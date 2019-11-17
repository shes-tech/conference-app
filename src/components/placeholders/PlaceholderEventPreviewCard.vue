<template>
  <div
    class="tile is-child box p-4 is-unselectable is-tertiary placeholder-card"
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
  position: relative;
  height: 160px;
}
</style>
