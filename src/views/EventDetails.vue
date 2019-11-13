<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <b-tag class="mb-4">{{ event.type }}</b-tag>
          <h1 class="title is-3">
            {{ event.title }}
          </h1>
          <h2 v-if="event.speaker" class="subtitle is-5">
            {{ event.speaker.name }}
          </h2>
          <p v-if="event.startTime" class="mt-5">
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
          <p class="title is-5">Detalhes</p>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </section>

    <speaker-preview-card
      :speaker="speaker"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import SpeakerPreviewCard from '../components/SpeakerPreviewCard.vue';

export default {
  name: 'NextEvents',
  components: {
    'speaker-preview-card': SpeakerPreviewCard,
  },
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
      speakers: 'speakers/speakersByEventId',
    }),
    event() {
      return this.events[this.eventId] || {};
    },
    speaker() {
      return this.speakers[this.eventId] || {};
    },
  },
  created() {
    window.scrollTo(0, 0);
    this.eventId = this.$route.params.id;
    this.fetchAll();
  },
  filters: {
    time(date) {
      return format(date, 'EEEE, HH:mm (dd \'de\' MMM)', { locale: pt });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
