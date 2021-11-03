<template>
  <div class="pl-4 pr-4">
    <b-field>
      <b-input placeholder="Pesquisar evento"
        type="search"
        icon="search"
        icon-clickable
        @input="changeSearchQuery"
      ></b-input>
    </b-field>

    <div class="columns mt-4">
      <div class="column is-full btn-next-day">
        <button-toggle
          :selected="isSelectedDay('next')"
          @select="setDay('next')"
        >Próximos</button-toggle>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column is-half btn-day-left">
        <button-toggle
          :selected="isSelectedDay('2020-11-17')"
          @select="setDay('2020-11-17')"
        >Qua 17/11</button-toggle>
      </div>
      <div class="column is-half btn-day-right">
        <button-toggle
          :selected="isSelectedDay('2021-11-18')"
          @select="setDay('2021-11-18')"
        >Qui 18/11</button-toggle>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column is-half btn-day-left">
        <button-toggle
          :selected="isSelectedDay('2021-11-19')"
          @select="setDay('2021-11-19')"
        >Sex 19/11</button-toggle>
      </div>
      <div class="column is-half btn-day-right">
        <button-toggle
          :selected="isSelectedDay('2021-11-20')"
          @select="setDay('2021-11-20')"
        >Sáb 20/11</button-toggle>
      </div>
    </div>

  </div>
</template>

<script>
import ButtonToggle from './ButtonToggle.vue';

export default {
  name: 'FilterBar',
  components: {
    'button-toggle': ButtonToggle,
  },
  model: {
    prop: 'input',
    event: 'change',
  },
  props: {
    input: String,
  },
  data: () => ({
    selectedDay: 'next',
    lastSelectedDay: 'next',
    timeout: null,
  }),
  methods: {
    updateRange(ev) {
      this.$emit('change', ev.value);
    },
    isSelectedDay(day) {
      return this.selectedDay === day;
    },
    setDay(day) {
      this.selectedDay = day;
      if (day !== 'search') this.lastSelectedDay = day;
      this.$emit('change', day);
    },
    changeSearchQuery(ev) {
      const query = ev;

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.setSearchQuery(query);
      }, 200);
    },
    setSearchQuery(query) {
      if (!query) {
        this.setDay(this.lastSelectedDay);
      } else {
        this.$emit('search', query);
        this.setDay('search');
      }
    },
  },
  watch: {
    input(newValue) {
      if (!newValue) return;
      this.selectedDay = newValue;
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

.btn-next-day {
  padding-bottom: 0.8em;
}

.btn-day-left {
  padding-right: 0.2em;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
}

.btn-day-right {
  padding-left: 0.2em;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
}
</style>
