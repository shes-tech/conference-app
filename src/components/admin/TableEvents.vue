<template>
  <b-table :data="data" :columns="columns" />
</template>

<script>
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
          field: 'speaker',
          label: 'Palestrante',
        },
        {
          field: 'start_time',
          label: 'Início',
        },
        {
          field: 'end_time',
          label: 'Fim',
        },
      ],
      data: [
        { title: 'Nome da Palestra' },
      ],
    };
  },
};
</script>
