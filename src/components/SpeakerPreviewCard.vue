<template>
  <div class="card has-background-light">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure v-if="speaker.picture" class="speaker-img image is-128x128">
            <img :src="speaker.picture" alt="Foto da Palestrante" class="is-rounded" />
          </figure>
          <b-icon
            v-else
            size="is-large"
            icon="user"
          />
        </div>
        <div class="media-content">
          <p class="title is-3 mt-2">{{ speaker.name }}</p>
          <div v-if="speaker.minibio" class="content" v-html="bio"></div>
        </div>
      </div>

      <div v-if="hasSocial" class="card-footer pt-4">
        <p class="mr-4">Siga:</p>
        <a v-if="speaker.social.site" :href="speaker.social.site" target="_blank" rel="”noopener”">
          <b-icon icon="globe-americas" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.linkedin"
          :href="speaker.social.linkedin"
          target="_blank"
          rel="”noopener”"
        >
          <b-icon icon="linkedin-in" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.instagram"
          :href="speaker.social.instagram"
          target="_blank"
          rel="”noopener”"
        >
          <b-icon icon="instagram" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.twitter"
          :href="speaker.social.twitter"
          target="_blank"
          rel="”noopener”"
        >
          <b-icon icon="twitter" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.facebook"
          :href="speaker.social.facebook"
          target="_blank"
          rel="”noopener”"
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
    width: 128px;
    height: 128px;
  }
}
</style>
