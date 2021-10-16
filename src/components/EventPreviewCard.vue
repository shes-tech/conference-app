<template>
  <router-link
    tag="a"
    class="card-preview tile is-child box p-4 is-unselectable is-primary"
    :to="`/events/${event.id}`"
  >
    <div>
      <p
        v-if="event.startTime"
        class="
          subtitle
          is-uppercase
          date-text
          has-text-weight-semibold
          is-6
          pb-2
        "
      >
        {{ event.startTime.toDate() | time }}
        <span v-if="event.endTime">- {{ event.endTime.toDate() | time }}</span
        >, &nbsp; &nbsp; {{ event.startTime.toDate() | date }} &nbsp;
        {{ event.startTime.toDate() | day }}
      </p>
      <p class="preview-title title is-5 has-text-white has-text-weight-bold">
        {{ event.title }}
      </p>
      <p class="description is-5 has-text-white">{{ event.description }}</p>
      <div class="flex">
        <div class="speaker-section subtitle has-text-grey is-6 speakers-text">
          <span>{{ speakersNames }}</span>
          <div
            v-for="(img, index) in speakersPictures"
            :key="index"
            class="container-img"
          >
            <img v-if="img" :src="img" class="speaker-img" />
          </div>
        </div>
        <div class="buttons">
          <router-link
            tag="a"
            class="button is-primary"
            :to="`/events/${event.id}`"
          >
            <strong>Assistir</strong>
          </router-link>
        </div>
      </div>

      <p class="arena subtitle is-5 has-text-grey-light">{{ tag.name }}</p>

      <p v-if="isEventHappening" class="is-live subtitle is-5 pl-3">
        <b-icon
          icon="podcast"
          size="is-small"
          class="vertical-align mr-3"
        ></b-icon>
        Ao vivo
        <span class="disclaimer">- Clique para Assistir</span>
      </p>
    </div>
  </router-link>
</template>

<script>
import { format, isBefore, isAfter } from "date-fns";
import pt from "date-fns/locale/pt";

import { mapGetters } from "vuex";

export default {
  name: "EventPreviewCard",
  props: {
    event: Object,
  },
  computed: {
    ...mapGetters({
      tags: "tags/tags",
    }),
    speakersNames() {
      const speakers = this.event.speakers || [];
      const { length } = speakers;
      let text = "";

      speakers.forEach((speaker, index) => {
        text += speaker.name;
        if (index < length - 2) text += ", ";
        if (index === length - 2) text += " e ";
      });

      return text;
    },
    speakersPictures() {
      const speakers = this.event.speakers || [];
      return speakers.map((speaker) => speaker.picture);
    },
    tag() {
      const tagId = this.event.tag;
      return this.tags[tagId] || {};
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
  filters: {
    time(date) {
      return format(date, "HH:mm", { locale: pt });
    },
    date(date) {
      return format(date, "EEEE", { locale: pt });
    },
    day(date) {
      return format(date, "dd/MM", { locale: pt });
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-title {
  line-height: 1.4em;
}
.flex {
  display: flex;
  justify-content: space-between;
  margin-top: 5vh;
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

.card-preview {
  background-color: #343535;
}

.date-text {
  color: #d28bb1;
}

.speakers-text {
  span {
    color: #b5b1aa;
  }
}

.is-live {
  color: #fe8a86;
  span.disclaimer {
    color: #b5b1aa;
  }
}

.arena {
  margin-top: 0.8em;
  margin-bottom: 0.2em;
}
.buttons {
  margin-left: 5vw;
}
</style>
