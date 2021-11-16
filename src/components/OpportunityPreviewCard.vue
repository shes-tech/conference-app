<template>
  <router-link
    tag="a"
    class="card-preview tile is-child box p-4 is-unselectable is-primary"
    :to="`/career/asdf`"
  >
    <div>
      <p
        class="
          subtitle
          is-uppercase
          date-text
          has-text-weight-semibold
          is-6
          pb-2
        "
      >
        <b-icon
          icon="map-marker-alt"
          size="is-small"
          class="vertical-align mr-3"
        />
        Belo Horizonte, MG
      </p>
      <p class="preview-title title is-5 has-text-white has-text-weight-bold">
        Vaga de Desenvolvedor Full-Stack
      </p>
      <p class="description is-5 has-text-white">
        Nome da Empresa
      </p>
    </div>
  </router-link>
</template>

<script>
// import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import { mapGetters } from 'vuex';

export default {
  name: 'OpportunityPreviewCard',
  props: {
    opportunity: Object,
  },
  computed: {
    ...mapGetters({
      tags: 'tags/tags',
    }),
    // speakersNames() {
    //   const speakers = this.opportunity.speakers || [];
    //   const { length } = speakers;
    //   let text = '';

    //   speakers.forEach((speaker, index) => {
    //     text += speaker.name;
    //     if (index < length - 2) text += ', ';
    //     if (index === length - 2) text += ' e ';
    //   });

    //   return text;
    // },
    // speakersPictures() {
    //   const speakers = this.opportunity.speakers || [];
    //   return speakers.map(speaker => speaker.picture);
    // },
    // tag() {
    //   const tagId = this.opportunity.tag;
    //   return this.tags[tagId] || {};
    // },
    // isEventHappening() {
    //   const { event } = this;
    //   const start = opportunity.startTime;
    //   const end = opportunity.endTime;

    //   if (!start || !end) return false;

    //   const now = new Date();
    //   const before = isBefore(now, end.toDate());
    //   const after = isAfter(now, start.toDate());

    //   return before && after;
    // },
  },
  filters: {
    // time(date) {
    //   return format(date, 'HH:mm', { locale: pt });
    // },
    // date(date) {
    //   return format(date, 'EEEE', { locale: pt });
    // },
    // day(date) {
    //   return format(date, 'dd/MM', { locale: pt });
    // },
    // trailText(text) {
    //   const length = 180;
    //   if (text.length <= length) return text;

    //   const trailedText = text.substring(0, length);
    //   const lastSpace = trailedText.lastIndexOf(' ');
    //   return `${trailedText.substring(0, lastSpace)}...`;
    // },
  },
};
</script>

<style lang="scss" scoped>
.preview-title {
  line-height: 1.4em;
  margin-bottom: 0.2em;
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
  border-radius: 2px;
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
