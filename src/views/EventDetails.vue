<template>
  <div>
    <!-- Event Details Banner -->
    <section v-if="!isLoading" class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <b-button
            type="is-white" icon-left="arrow-left" class="mb-5"
            tag="router-link" to="/events#next-events"
          >
            Voltar para programação
          </b-button>

          <b-tag v-if="event.type" class="mb-4">{{ event.type }}</b-tag>
          <h1 class="title is-3">
            {{ event.title }}
          </h1>
          <h2 v-if="speakers.length !== 0" class="subtitle is-5">
            {{ speakersNames }}
          </h2>
          <p v-if="event.startTime" class="mt-5">
            <b-icon
              icon="clock"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            {{ event.startTime.toDate() | time }}
            <span v-if="event.endTime">- {{ event.endTime.toDate() | time }}</span>
          </p>
          <p v-if="event.startTime">
            <b-icon
              icon="genderless"
              size="is-small"
              class="vertical-align mr-3 transparent"
            ></b-icon>
            {{ event.startTime.toDate() | date }}
          </p>
          <p v-if="tag.name" class="mt-4">
            <b-icon
              icon="map-marker-alt"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            {{ tag.name }}
          </p>
          <p
            v-if="isEventHappening"
            class="live-event mt-5 subtitle is-4 has-text-danger is-unselectable"
          >
            <b-icon
              icon="podcast"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            Ao vivo
          </p>
          <!-- <p class="mt-5">
            <b-button type="is-white" icon-left="calendar-plus" outlined>
              Salvar evento no Google Agenda
            </b-button>
          </p> -->
        </div>
      </div>
    </section>

    <!-- Event Details Banner (Placeholder) -->
    <section v-else class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <placeholder-banner />
        </div>
      </div>
    </section>

    <div class="container p-5">
      <div class="columns is-desktop">
        <div class="column is-6-desktop mb-5">
          <div v-if="!isLoading">
            <p class="title is-5 has-text-white">Assistir Palco</p>
            <youtube-media
              :video-id="youtubeLink"
              :player-vars="{ autoplay: isEventHappening }"
              class="youtube-embed"
            />
          </div>
          <placeholder-description v-else />
        </div>
        <div class="column is-5-desktop is-offset-1-desktop">
          <p class="title is-5 has-text-white">Detalhes</p>
          <placeholder-description v-if="isLoading" />
          <p v-else-if="event.description">{{ event.description }}</p>
          <p v-else>Nenhum detalhe foi fornecido para este evento.</p>

          <p class="title is-5 mt-5 has-text-white">Palestrantes</p>
          <speaker-preview-card
            v-for="(speaker, index) in speakers"
            :key="index"
            :speaker="speaker"
            class="mb-4"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { format, isBefore, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { getIdFromURL } from 'vue-youtube-embed';

import SpeakerPreviewCard from '../components/SpeakerPreviewCard.vue';
import PlaceholderEventDescription from '../components/placeholders/PlaceholderEventDescription.vue';
import PlaceholderEventBanner from '../components/placeholders/PlaceholderEventBanner.vue';

export default {
  name: 'NextEvents',
  components: {
    'speaker-preview-card': SpeakerPreviewCard,
    'placeholder-description': PlaceholderEventDescription,
    'placeholder-banner': PlaceholderEventBanner,
  },
  data: () => ({
    eventId: null,
    isLoading: true,
  }),
  methods: {
    ...mapActions({
      fetchEventById: 'events/fetchEventById',
      fetchSpeakerByEventId: 'speakers/fetchSpeakerByEventId',
    }),
    async fetchAll() {
      const eventId = this.$route.params.id;
      await this.fetchEventById(eventId);
      // await this.fetchSpeakerByEventId(eventId);
    },
    checkLoading() {
      if (this.event.title) this.isLoading = false;
      else this.isLoading = true;
    },
    downloadCalendar() {},
  },
  computed: {
    ...mapGetters({
      events: 'events/events',
      tags: 'tags/tags',
    }),
    event() {
      return this.events[this.eventId] || {};
    },
    speakers() {
      return this.event.speakers || [];
    },
    speakersNames() {
      const speakers = this.event.speakers || [];
      const { length } = speakers;
      let text = '';

      speakers.forEach((speaker, index) => {
        text += speaker.name;
        if (index < length - 2) text += ', ';
        if (index === length - 2) text += ' e ';
      });

      return text;
    },
    tag() {
      const tagId = this.event.tag;
      return this.tags[tagId] || {};
    },
    youtubeLink() {
      const { link } = this.tag;
      const id = getIdFromURL(link);
      return id;
    },
    isEventHappening() {
      const { event } = this;
      const start = event.startTime;
      const end = event.endTime;

      if (!start || !end) return false;

      const now = new Date();
      const before = isBefore(now, end.toDate());
      const after = isAfter(now, start.toDate());

      return before && after;
    },
  },
  watch: {
    event() {
      this.checkLoading();
    },
  },
  created() {
    this.checkLoading();
    window.scrollTo(0, 0);
    this.eventId = this.$route.params.id;
    this.fetchAll();
  },
  filters: {
    time(date) {
      return format(date, 'HH:mm', { locale: pt });
    },
    date(date) {
      return format(date, 'EEEE (dd \'de\' MMM)', { locale: pt });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";

.hero-placeholder {
  background-color: $primary;
}

.transparent {
  opacity: 0;
}

.live-event {
  background-color: rgba(255, 255, 255, 0.9);
  width: fit-content;
  padding: 0.3em 0.6em;
  border-radius: 8px;
}
</style>

<style lang="scss">
.youtube-embed {
  iframe {
    width: 100%;
    height: 400px;

    @media only screen and (max-width: 600px) {
      height: 200px;
    }
  }
}
</style>
