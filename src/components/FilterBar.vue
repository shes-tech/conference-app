<template>
  <div class="pl-4 pr-4">
    <b-tabs
      v-model="radioButton"
      type="is-toggle"
      variant="is-primary"
      :destroy-on-hide="true"
      :animated="false"
      expanded
    >
      <b-tab-item label="Agora" value="next"></b-tab-item>
      <b-tab-item label="Dia 1" value="2019-11-21"></b-tab-item>
      <b-tab-item label="Dia 2" value="2019-11-22"></b-tab-item>
      <b-tab-item label="Dia 3" value="2019-11-23"></b-tab-item>
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
  data: () => ({
    timeRange: 'next',
    radioButton: null,
  }),
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
