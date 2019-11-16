<template>
  <div>
    <main-banner />

    <div class="container">
      <div class="columns is-desktop is-multiline">
        <div class="column is-4-desktop is-hidden-touch">
          <p class="title is-4 m-4 mt-5 mb-1">Filtrar</p>
        </div>
        <div class="column is-8-desktop">
          <p class="title is-4 m-4 mt-5 mb-1">Próximos Eventos</p>
        </div>
        <div class="column is-4-desktop">
          <filter-bar />
        </div>
        <div class="column is-8-desktop">
          <next-events />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import MainBanner from '../components/MainBanner.vue';
import FilterBar from '../components/FilterBar.vue';
import NextEvents from './NextEvents.vue';

export default {
  name: 'Events',
  components: {
    'main-banner': MainBanner,
    'filter-bar': FilterBar,
    'next-events': NextEvents,
  },
};
</script>
