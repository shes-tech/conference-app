<template>
  <b-table :data="events" :columns="columns" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TableEvents',
  data() {
    return {
      columns: [
        {
          field: 'title',
          label: 'Título',
        },
        {
          field: 'speaker.name',
          label: 'Palestrante',
        },
        {
          field: 'start_date',
          label: 'Início',
        },
        {
          field: 'end_date',
          label: 'Fim',
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      fetchNextEvents: 'events/fetchNextEvents',
    }),
  },
  computed: {
    ...mapGetters({
      events: 'events/events',
    }),
  },
  created() {
    this.fetchNextEvents();
  },
};
</script>
