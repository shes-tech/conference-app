<template>
  <div>
    <h3>Próximos Eventos</h3>

    <event-preview-card
      v-for="(event, index) in events"
      :key="index"
      :event="event"
    />
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
      getEvents: 'events/getEvents',
    }),
  },
  computed: {
    ...mapGetters({
      events: 'events/events',
    }),
  },
  created() {
    this.getEvents();
  },
};
</script>

<style lang="scss" scoped>

</style>
