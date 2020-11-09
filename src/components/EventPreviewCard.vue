<template>
  <router-link
    tag="a"
    class="tile is-child box p-4 is-unselectable is-tertiary"
    :to="`/events/${event.id}`"
  >
    <div>
      <p
        v-if="event.startTime"
        class="subtitle is-uppercase has-text-secondary has-text-weight-semibold is-6 pb-2"
      >
        {{ event.startTime.toDate() | time }}
        <span v-if="event.endTime">- {{ event.endTime.toDate() | time }}</span>,
        {{ event.startTime.toDate() | date }}
      </p>
      <p class="preview-title title is-5 has-text-weight-bold">{{ event.title }}</p>
      <div class="speaker-section subtitle is-6">
        <span>{{ speakersNames }}</span>
        <div
          v-for="(img, index) in speakersPictures"
          :key="index"
          class="container-img"
        >
          <img v-if="img" :src="img" class="speaker-img" />
        </div>
      </div>
      <p class="subtitle is-6 has-text-grey-light">{{ tag.name }}</p>
    </div>
  </router-link>
</template>

<script>
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { mapGetters } from 'vuex';

export default {
  name: 'EventPreviewCard',
  props: {
    event: Object,
  },
  computed: {
    ...mapGetters({
      tags: 'tags/tags',
    }),
    speakersNames() {
      const speakers = this.event.speakers || [];
      const { length } = speakers;
      let text = '';

      speakers.forEach((speaker, index) => {
        text += speaker.name;
        if (index < length - 2) text += ' , ';
        if (index === length - 2) text += ' e ';
      });

      return text;
    },
    speakersPictures() {
      const speakers = this.event.speakers || [];
      return speakers.map(speaker => speaker.picture);
    },
    tag() {
      const tagId = this.event.tag;
      return this.tags[tagId] || {};
    },
  },
  filters: {
    time(date) {
      return format(date, 'HH:mm', { locale: pt });
    },
    date(date) {
      return format(date, 'EEEE', { locale: pt });
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-title {
  line-height: 1.4em;
}

.quick-info-container {
  display: flex;
  flex-direction: row;

  .quick-info-section {
    width: fit-content;
    margin: 0;
    margin-right: 2em;
  }
}

.speaker-section {
  display: flex;
  flex-direction: row;
  height: 40px;
  margin-bottom: 0;

  .container-img {
    height: fit-content;
  }

  img {
    object-fit: cover;
    width: 40px;
    height: 40px;

    border-radius: 100px;
    margin-left: 0.4em;
    align-items: center;
    text-align: center;
  }

  span {
    height: fit-content;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 0.4em;
  }
}
</style>
