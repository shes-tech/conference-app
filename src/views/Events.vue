<template>
  <div>
    <main-banner />
    <next-events />
  </div>
</template>

<script>
import MainBanner from '../components/MainBanner.vue';
import NextEvents from './NextEvents.vue';

export default {
  name: 'Events',
  components: {
    'main-banner': MainBanner,
    'next-events': NextEvents,
  },
};
</script>
