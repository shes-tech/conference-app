<template>
  <div>
    <section class="hero has-background-black-ter">
      <router-link tag="a" to="/events" class="m-4 has-text-light">
        &lt; Voltar para Atividades
      </router-link>
    </section>

    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <p class="subtitle is-7">{{ event.type }}</p>
          <h1 class="title is-4">
            {{ event.title }}
          </h1>
          <h2 v-if="event.speaker" class="subtitle is-6">
            {{ event.speaker.name }}
          </h2>
          <p class="mt-5">
            <b-icon
              icon="clock"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            {{ event.startTime.toDate() | time }}
          </p>
          <p class="mt-4">
            <b-icon
              icon="map-marker-alt"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            {{ event.location }}
          </p>
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

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

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
  filters: {
    time(date) {
      return format(date, 'EEEE, HH:mm', { locale: pt });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
