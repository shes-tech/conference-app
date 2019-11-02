<template>
  <router-link
    tag="a"
    class="tile is-child box p-4 notification is-unselectable is-tertiary"
    :to="`/events/${event.id}`"
  >
    <div>
      <p class="subtitle is-7">{{ event.type }}</p>
      <p class="title is-6">{{ event.title }}</p>
      <p class="subtitle is-6">{{ event.speaker.name }}</p>

      <div class="quick-info-container subtitle is-6">
        <p class="quick-info-section">
          <b-icon
            icon="clock"
            size="is-small"
            class="vertical-align"
          ></b-icon>
          {{ event.startTime.toDate() | time }}
        </p>
        <p class="quick-info-section">
          <b-icon
            icon="map-marker-alt"
            size="is-small"
            class="vertical-align"
          ></b-icon>
          {{ event.location }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default {
  name: 'EventPreviewCard',
  props: {
    event: Object,
  },
  filters: {
    time(date) {
      return format(date, 'EEE, HH:mm', { locale: pt });
    },
  },
};
</script>

<style lang="scss" scoped>
.quick-info-container {
  display: flex;
  flex-direction: row;

  .quick-info-section {
    width: fit-content;
    margin: 0;
    margin-right: 2em;
  }
}
</style>
