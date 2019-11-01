<template>
  <div>
    <p class="title is-4">Próximos Eventos</p>

    <div class="tile is-parent is-vertical">
      <event-preview-card
        v-for="(event, index) in events"
        :key="index"
        :event="event"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EventPreviewCard from '../components/EventPreviewCard.vue';

export default {
  name: 'NextEvents',
  components: {
    'event-preview-card': EventPreviewCard,
  },
  methods: {
    ...mapActions({
      fetchAllEvents: 'events/fetchAllEvents',
    }),
  },
  computed: {
    ...mapGetters({
      events: 'events/eventsAsArray',
    }),
  },
  created() {
    this.fetchAllEvents();
  },
};
</script>

<style lang="scss" scoped>

</style>
