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
      >{{ event.startTime.toDate() | time }}</p>
      <p class="preview-title title is-5 has-text-weight-bold">{{ event.title }}</p>
      <p class="subtitle is-6">{{ event.speaker.name }}</p>
      <p class="subtitle is-6 has-text-grey-light">{{ event.location }}</p>
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
      return format(date, 'HH:mm, EEEE', { locale: pt });
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
</style>
