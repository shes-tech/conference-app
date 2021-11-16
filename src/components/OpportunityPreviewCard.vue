<template>
  <router-link
    tag="a"
    class="card-preview tile is-child box p-4 is-unselectable is-primary"
    :to="`/career/${mentoria.id}`"
  >
    <div>
      <p
        :class="[
          'subtitle is-uppercase date-text',
          'has-text-weight-semibold is-6 pb-2',
          { 'has-text-success': mentoria.isAvailable },
          { 'has-text-danger': !mentoria.isAvailable },
        ]"
      >
        <b-icon
          icon="genderless"
          size="is-small"
          class="vertical-align mr-3"
        />
        {{
          mentoria.isAvailable ?
          'Horários Disponíveis' :
          'Horários Indisponíveis'
        }}
      </p>
      <p class="preview-title title is-5 has-text-white has-text-weight-bold">
        {{ mentoria.title }}
      </p>
      <p class="description is-5 has-text-white">
        {{ mentoria.mentora.cargo }}
        <span v-if="mentoria.mentora.cargo">@ {{ mentoria.mentora.empresa }}</span>
      </p>

      <p class="description subtitle is-5 has-text-white mt-5">
        {{ mentoria.mentora.name }}
      </p>
    </div>
  </router-link>
</template>

<script>
// import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import { mapGetters } from 'vuex';

export default {
  name: 'OpportunityPreviewCard',
  props: {
    mentoria: Object,
  },
  computed: {
    ...mapGetters({
      tags: 'tags/tags',
    }),
  },
};
</script>

<style lang="scss" scoped>
.preview-title {
  line-height: 1.4em;
  margin-bottom: 0.2em;
}

.flex {
  display: flex;
  justify-content: space-between;
  margin-top: 5vh;
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

.speaker-section {
  display: flex;
  flex-direction: row;
  height: 40px;
  margin-bottom: 0;

  .container-img {
    height: fit-content;
  }

  img {
    object-fit: cover;
    width: 40px;
    height: 40px;

    border-radius: 100px;
    margin-left: 0.4em;
    align-items: center;
    text-align: center;
  }

  span {
    height: fit-content;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 0.4em;
  }
}

.card-preview {
  background-color: #343535;
  border-radius: 2px;
}

.date-text {
  color: #d28bb1;
}

.speakers-text {
  span {
    color: #b5b1aa;
  }
}

.is-live {
  color: #fe8a86;
  span.disclaimer {
    color: #b5b1aa;
  }
}

.arena {
  margin-top: 0.8em;
  margin-bottom: 0.2em;
}
.buttons {
  margin-left: 5vw;
}
</style>
