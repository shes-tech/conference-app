<template>
  <div>
    <p class="title is-4 m-4 mt-5 mb-1">Próximas Atividades</p>

    <div class="tile is-parent is-vertical">
      <event-preview-card
        v-for="(event, index) in events"
        :key="index"
        :event="event"
        id="event.id"
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
