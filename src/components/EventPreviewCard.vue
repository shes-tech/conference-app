<template>
  <div class="card">
    <div class="card-content">
      <p class="subtitle is-7">{{ event.location }}</p>
      <p class="title is-5">{{ event.title }}</p>
      <p class="subtitle is-6">{{ event.start_date | time }} | {{ event.speaker.name }}</p>
    </div>
  </div>
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
