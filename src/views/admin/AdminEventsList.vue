<template>
  <div>
    <h2>Eventos</h2>
    <table-events />
  </div>
</template>

<script>
import TableEvents from '../../components/admin/TableEvents.vue';

export default {
  name: 'AdminEventsList',
  components: {
    'table-events': TableEvents,
  },
};
</script>
