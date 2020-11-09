<template>
  <div class="pl-3 pr-3">
    <b-tabs
      v-model="selectedTab"
      type="is-toggle"
      variant="is-primary"
      :destroy-on-hide="true"
      :animated="false"
      @change="updateRange"
      expanded
    >
      <b-tab-item label="Agora" value="next"></b-tab-item>
      <b-tab-item label="Ter" value="2020-11-17"></b-tab-item>
      <b-tab-item label="Qua" value="2020-11-18"></b-tab-item>
      <b-tab-item label="Qui" value="2020-11-19"></b-tab-item>
      <b-tab-item label="Sex" value="2020-11-20"></b-tab-item>
      <b-tab-item label="Sáb" value="2020-11-21"></b-tab-item>
    </b-tabs>

    <!-- <b-field class="is-hidden-touch">
      <b-input placeholder="Pesquisar..."
        type="search"
      />
      <div class="control">
        <button class="button">
          <b-icon icon="search" class="pl-5 pr-5" />
        </button>
      </div>
    </b-field>-->
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
    selectedTab: 0,
    tabEnum: {
      0: 'next',
      1: '2020-11-17',
      2: '2020-11-18',
      3: '2020-11-19',
      4: '2020-11-20',
      5: '2020-11-21',
    },
  }),
  methods: {
    enumToString(value) {
      return this.tabEnum[value];
    },
    stringToEnum(value) {
      const foundEnum = Object.keys(this.tabEnum)
        .find(key => this.tabEnum[key] === value);
      if (!foundEnum) return 0;
      return Number(foundEnum);
    },
    updateRange(ev) {
      const range = this.enumToString(ev);
      this.$emit('change', range);
      return range;
    },
  },
  watch: {
    input(newValue) {
      if (!newValue) return;
      this.selectedTab = this.stringToEnum(newValue);
    },
  },
  created() {
    this.selectedTab = this.stringToEnum(this.input);
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
