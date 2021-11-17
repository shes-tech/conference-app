<template>
  <div>
    <career-banner />

    <div class="container">
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
            As mentorias serão realizadas em sessões individuais de 15 minutos que podem ser
            acessadas e marcadas previamente através do calendly.
          </p>
        </div>

        <div class="column is-8-desktop">
          <next-mentorias />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CareerBanner from '../components/CareerBanner.vue';
import NextMentorias from './NextMentorias.vue';

import titleMixin from '@/mixins/titleMixin';

export default {
  name: 'Career',
  title: 'Mentoria',
  mixins: [titleMixin],
  components: {
    'career-banner': CareerBanner,
    'next-mentorias': NextMentorias,
  },
};
</script>
