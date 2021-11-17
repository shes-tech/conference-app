<template>
  <div>
    <!-- Banner -->
    <section v-if="!isLoading" class="banner has-background is-transparent hero is-primary is-bold">
      <img
        src="@/assets/universe.png"
        class="hero-background is-transparent"
        alt="No plano de fundo, imagem mostrando o universo"
      />
      <div class="hero-body">
        <div class="container">
          <b-button
            type="is-primary" icon-left="arrow-left" class="mb-5"
            tag="router-link" to="/mentoria"
          >
            Voltar para mentorias
          </b-button>

          <p
            :class="[
              'subtitle is-uppercase date-text',
              'has-text-weight-semibold is-6 pb-2',
              { 'has-text-success': mentoria.isAvailable },
              { 'has-text-danger': !mentoria.isAvailable },
            ]"
          >
            <b-icon
              icon="circle"
              size="is-small"
              class="vertical-align mr-3"
            />
            {{
              mentoria.isAvailable ?
              'Horários Disponíveis' :
              'Horários Indisponíveis'
            }}
          </p>
          <h1 class="title is-3">
            {{ mentoria.title }}
          </h1>
        </div>
      </div>
    </section>

    <!-- Banner (Placeholder) -->
    <section v-else class="banner has-background is-transparent hero is-primary is-bold">
      <img
        src="@/assets/universe.png"
        class="hero-background is-transparent"
        alt="No plano de fundo, imagem mostrando o universo"
      />
      <div class="hero-body">
        <div class="container">
          <placeholder-banner />
        </div>
      </div>
    </section>

    <div class="container p-5">
      <div class="columns is-desktop">
        <div class="column is-4-desktop">
          <placeholder-description v-if="isLoading" />
          <div v-else>
            <p class="title is-5 has-text-white">Sobre a Mentora</p>
            <speaker-preview-card
              :speaker="mentoria.mentora"
              class="mb-4"
            />
          </div>
        </div>

        <div class="column is-offset-1-desktop is-7-desktop mb-5">
          <div v-if="!isLoading">
            <p class="title is-5 has-text-white">Quadro de Horários</p>
            <p v-if="mentoria.link" class="has-text-centered">
              <vue-calendly :url="mentoria.link" :height="1000" class="calendar-iframe" />
              <a :href="mentoria.link" target="_blank" rel="noopener noreferrer">
                Abrir Calendly em uma nova aba
                <b-icon
                  icon="external-link-alt" size="is-small" class="vertical-align ml-2"
                />
              </a>
            </p>
          </div>
          <placeholder-description v-else />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import '@/plugins/calendly';
import firebase from 'firebase/app';

import { mapGetters, mapActions } from 'vuex';

import SpeakerPreviewCard from '../components/SpeakerPreviewCard.vue';
import PlaceholderEventDescription from '../components/placeholders/PlaceholderEventDescription.vue';
import PlaceholderEventBanner from '../components/placeholders/PlaceholderEventBanner.vue';

export default {
  name: 'CareerDetails',
  components: {
    'speaker-preview-card': SpeakerPreviewCard,
    'placeholder-description': PlaceholderEventDescription,
    'placeholder-banner': PlaceholderEventBanner,
  },
  data: () => ({
    mentoriaId: null,
    isLoading: true,
  }),
  methods: {
    ...mapActions({
      fetchMentoriaById: 'mentorias/fetchMentoriaById',
    }),
    async fetchAll() {
      const mentoriaId = this.$route.params.id;
      this.mentoriaId = mentoriaId;
      await this.fetchMentoriaById(mentoriaId);
      this.logAnalytics();
    },
    checkLoading() {
      if (this.mentoria.title) this.isLoading = false;
      else this.isLoading = true;
    },

    logAnalytics() {
      firebase.analytics().logEvent('view_mentoria', {
        mentoria_id: this.mentoriaId,
        mentoria_name: this.mentoria.title,
        mentoria_speaker: this.mentoria.mentora.name,
        mentoria_category: 'mentoria',
      });
    },
  },
  computed: {
    ...mapGetters({
      mentorias: 'mentorias/mentorias',
    }),
    mentoria() {
      return this.mentorias[this.mentoriaId] || {};
    },
  },
  watch: {
    mentoria() {
      this.checkLoading();
    },
  },
  created() {
    this.checkLoading();
    window.scrollTo(0, 0);
    this.eventId = this.$route.params.id;
    this.fetchAll();
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

.calendar-iframe {
  background-color: rgba(255, 255, 255, 0.9);
}

.hero {
  &.has-background {
    position: relative;
    overflow: hidden;
  }
  &-background {
    position: absolute;
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
    &.is-transparent {
      opacity: 0.9;
    }
  }
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

iframe {
  height: 100%;
}
</style>
