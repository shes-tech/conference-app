<template>
  <div class="pl-4 pr-4">
    <b-dropdown
      v-model="selectedDay"
      aria-role="list"
      @change="updateRange"
      expanded
    >
      <button
        class="button is-primary fill-space is-outlined has-text-white"
        type="button" slot="trigger"
      >
        <template>
          <span>{{ selectedDay.label }}</span>
        </template>
        <b-icon icon="caret-down" class="ml-auto"></b-icon>
      </button>

      <b-dropdown-item
        v-for="(menu, index) in daysOptions"
        :key="index"
        :value="menu"
        aria-role="listitem"
      >
        <div class="media">
          <div class="media-content">
            <h3>{{ menu.label }}</h3>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  model: {
    prop: 'input',
    event: 'change',
  },
  props: {
    input: String,
  },
  data: () => ({
    selectedDay: { label: 'Agora', value: 'next' },
    daysOptions: [
      { label: 'Agora', value: 'next' },
      { label: '17/11 Terça-Feira', value: '2020-11-17' },
      { label: '18/11 Quarta-Feira', value: '2020-11-18' },
      { label: '19/11 Quinta-Feira', value: '2020-11-19' },
      { label: '20/11 Sexta-Feira', value: '2020-11-20' },
      { label: '21/11 Sábado', value: '2020-11-21' },
    ],

  }),
  methods: {
    updateRange(ev) {
      this.$emit('change', ev.value);
    },
  },
  watch: {
    input(newValue) {
      if (!newValue) return;
      this.selectedTab = this.daysOptions.find(day => day.value === newValue);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/variables.scss";

section.tab-content {
  padding: 0 !important;
}

.tabs.is-toggle li.is-active a {
  background-color: $secondary;
  border-color: $secondary;
}
</style>

<style lang="scss" scoped>
.fill-space {
  width: 100%;
}

.ml-auto {
  margin-left: auto !important;
}
</style>
