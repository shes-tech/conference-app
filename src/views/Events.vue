<template>
  <div>
    <main-banner />

    <div class="container">
      <div class="columns is-desktop is-multiline flex-events">
        <div class="column is-4-desktop is-hidden-touch">
          <p class="title is-4 m-4 mt-5 mb-1 has-text-white">Filtrar</p>
        </div>
        <div class="column is-8-desktop">
          <p id="next-events" class="title is-4 m-4 mt-5 mb-1 has-text-white">Lista de Eventos</p>
        </div>
        <div class="column is-4-desktop">
          <filter-bar v-model="selectedTab" @search="setSearchQuery" />
        </div>
        <div class="column is-8-desktop">
          <next-events v-if="selectedTab === 'next'" />
          <search-events v-else-if="selectedTab === 'search'" :query='searchQuery' />
          <events-by-day v-else :day="selectedTab" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import MainBanner from '../components/MainBanner.vue';
import FilterBar from '../components/FilterBar.vue';
import NextEvents from './NextEvents.vue';
import SearchEvents from './SearchEvents.vue';
import EventsByDay from './EventsByDay.vue';

export default {
  name: 'Events',
  components: {
    'main-banner': MainBanner,
    'filter-bar': FilterBar,
    'next-events': NextEvents,
    'search-events': SearchEvents,
    'events-by-day': EventsByDay,
  },
  data: () => ({
    selectedTab: 'next',
    searchQuery: '',
    timeout: null,
  }),
  methods: {
    setSearchQuery(ev) {
      this.searchQuery = ev;
    },
  },
  created() {
    this.timeout = setTimeout(() => {
      window.location.reload(1);
    }, 300000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style lang="scss" scoped>
.flex-events {
  max-width: 100%;
  margin-right: 0 !important;
  margin: 0 !important;
}
</style>
