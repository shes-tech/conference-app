<template>
  <div>
    <career-banner />

    <div class="container" style="height: 800px;">
      <div class="columns is-desktop is-multiline flex-events">
        <div class="column is-4-desktop is-hidden-touch">
          <p class="title is-4 m-4 mt-5 mb-1 has-text-white">
            O que é mentoria?
          </p>
        </div>
        <div class="column is-8-desktop">
          <p id="next-events" class="title is-4 m-4 mt-5 mb-1 has-text-white">
            Lista de Mentorias
          </p>
        </div>
        <div class="column is-4-desktop">
          <p class="pl-4 pr-4">
            Mentoria é um processo de aceleração de carreira através de um acompanhamento
            feito por uma pessoa profissional mais experiente na área de atuação de interesse.
            <br><br>
            Mentoria é um processo de aceleração de carreira através de um acompanhamento
            feito por uma pessoa profissional mais experiente na área de atuação de interesse.
          </p>
        </div>

        <div class="column is-8-desktop">
          <div class="tile is-parent is-vertical">
            <opportunity-preview-card
              v-for="event in []"
              :key="event"
              :event="event"
              class="mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CareerBanner from '../components/CareerBanner.vue';
import OpportunityPreviewCard from '../components/OpportunityPreviewCard.vue';

export default {
  name: 'Career',
  components: {
    'career-banner': CareerBanner,
    'opportunity-preview-card': OpportunityPreviewCard,
  },
};
</script>
