<template>
  <transition
    tag="div"
    name="fade"
    appear
  >
    <div class="has-text-centered mt-4 mb-4">
      <p>
        <b-icon
          icon="laugh-beam"
          class="vertical-align p-5"
          size="is-large"
        />
      </p>
      <p>
        Obrigada por participar da
      </p>
      <p>
        She'sTech Conference 2021.
      </p>
      <p>
        Nos vemos em 2022!
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ThankYouNote',
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
