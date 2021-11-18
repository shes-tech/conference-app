<template>
  <div class="card has-background-light">
    <div class="card-content speaker-card">
      <div class="media">
        <div class="media-left">
          <figure v-if="speaker.picture" class="speaker-img image is-96x96">
            <img :src="speaker.picture" alt="Foto da Palestrante" class="is-rounded" />
          </figure>
          <b-icon
            v-else
            size="is-large"
            icon="user"
          />
        </div>
        <div>
          <p v-if="speaker.picture" class="title is-4 mt-5 has-text-white">{{ speaker.name }}</p>
          <p v-else class="title is-4 mt-3 has-text-white">{{ speaker.name }}</p>

          <p class="has-text-white is-6 subtitle mt-0">
            {{ speaker.cargo }}
            <span v-if="speaker.empresa"> @ {{ speaker.empresa }}</span>
          </p>
        </div>
      </div>

      <div v-if="speaker.minibio" class="content has-text-white" v-html="bio"></div>

      <div v-if="hasSocial" class="card-footer card-social pt-4">
        <p class="mr-4 has-text-white">Siga:</p>
        <a
          v-if="speaker.social.site"
          :href="speaker.social.site"
          target="_blank"
          rel="”noopener”"
          title="Link para o site da palestrante"
        >
          <b-icon icon="globe-americas" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.linkedin"
          :href="speaker.social.linkedin"
          target="_blank"
          rel="”noopener”"
          title="Linkedin"
        >
          <b-icon icon="linkedin-in" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.instagram"
          :href="speaker.social.instagram"
          target="_blank"
          rel="”noopener”"
          title="Instagram"
        >
          <b-icon icon="instagram" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.twitter"
          :href="speaker.social.twitter"
          target="_blank"
          rel="”noopener”"
          title="Twitter"
        >
          <b-icon icon="twitter" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.facebook"
          :href="speaker.social.facebook"
          target="_blank"
          rel="”noopener”"
          title="Facebook"
        >
          <b-icon icon="facebook-f" pack="fab" class="vertical-align mr-4" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeakerPreviewCard',
  props: {
    speaker: Object,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    checkLoad() {
      // if (this.speaker && this.speaker.name) this.isLoading = false;
      // else this.isLoading = true;
      return false;
    },
  },
  computed: {
    bio() {
      if (!this.speaker || !this.speaker.minibio) return '';

      let escapedText = this.speaker.minibio;
      escapedText = escapedText.replace(/(?:\r\n|\r|\n)/g, '<br>');
      return escapedText;
    },
    social() {
      if (!this.speaker || !this.speaker.social) return {};
      return this.speaker.social;
    },
    hasSocial() {
      const { social } = this;
      let hasSocial = Boolean(social.site);
      hasSocial += Boolean(social.linkedin);
      hasSocial += Boolean(social.instagram);
      hasSocial += Boolean(social.twitter);
      hasSocial += Boolean(social.facebook);
      return hasSocial;
    },
  },
  watch: {
    speaker() {
      this.checkLoad();
    },
  },
  mounted() {
    this.checkLoad();
  },
};
</script>

<style lang="scss" scoped>
.speaker-img {
  img {
    object-fit: cover;
    width: 96px;
    height: 96px;
  }
}

.speaker-card {
  background-color: #343535;
}

.card-social {
  a:hover {
    color: #8a8a8a;
    opacity: 0.8;
  }
}
</style>
