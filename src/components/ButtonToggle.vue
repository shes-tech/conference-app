<template>
  <b-button
    expanded
    :class="[
      'is-primary fill-space has-text-white',
      { 'is-outlined': !selected }
    ]"
    @click="$emit('select')"
  >
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  name: 'ButtonToggle',
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
