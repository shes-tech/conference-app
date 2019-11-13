<template>
  <div class="card has-background-light m-4">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ speaker.name }}</p>
          <p
            v-if="speaker.work"
            class="subtitle is-6"
          >{{ speaker.work.title }} | {{ speaker.work.company }}</p>
        </div>
      </div>

      <div class="content">{{ speaker.bio }}</div>

      <div v-if="speaker.social" class="card-footer pt-4">
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
};
</script>
