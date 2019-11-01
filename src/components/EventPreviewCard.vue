<template>
  <router-link
    tag="a"
    class="tile is-child box p-3 notification is-unselectable"
    :to="`/events/${event.id}`"
  >
    <div>
      <p class="subtitle is-7">{{ event.location }}</p>
      <p class="title is-6">{{ event.title }}</p>
      <p class="subtitle is-6">{{ event.start_date | time }} | {{ event.speaker.name }}</p>
    </div>
  </router-link>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'EventPreviewCard',
  props: {
    event: Object,
  },
  filters: {
    time(date) {
      return format(date, 'HH:mm');
    },
  },
};
</script>
