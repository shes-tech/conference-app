<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ event.title }}
          </h1>
          <h2 v-if="event.speaker" class="subtitle m-b-8">
            {{ event.speaker.name }}
          </h2>
        </div>
      </div>
    </section>

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <p class="title is-6">Sobre o evento:</p>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NextEvents',
  data: () => ({
    eventId: null,
  }),
  methods: {
    ...mapActions({
      fetchEventById: 'events/fetchEventById',
      fetchSpeakerByEventId: 'speakers/fetchSpeakerByEventId',
    }),
    async fetchAll() {
      const eventId = this.$route.params.id;
      await this.fetchEventById(eventId);
      await this.fetchSpeakerByEventId(eventId);
    },
  },
  computed: {
    ...mapGetters({
      events: 'events/events',
      speakers: 'speakers/speakers',
    }),
    event() {
      return this.events[this.eventId] || {};
    },
  },
  created() {
    window.scrollTo(0, 0);
    this.eventId = this.$route.params.id;
    this.fetchAll();
  },
};
</script>

<style lang="scss" scoped>

</style>
