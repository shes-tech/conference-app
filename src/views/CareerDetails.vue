<template>
  <div>
    <!-- Banner -->
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <b-button
            type="is-primary" icon-left="arrow-left" class="mb-5"
            tag="router-link" to="/career"
          >
            Voltar para oportunidades
          </b-button>

          <b-tag v-if="opportunity.type" class="mb-4">{{ opportunity.type }}</b-tag>
          <h1 class="title is-3">
            {{ opportunity.title }}
          </h1>
          <h2 class="subtitle is-5">
            Tema da Mentoria
          </h2>
          <p v-if="opportunity.startTime" class="mt-5">
            <b-icon
              icon="clock"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            {{ opportunity.startTime.toDate() | time }}
            <span v-if="opportunity.endTime">- {{ opportunity.endTime.toDate() | time }}</span>
          </p>
          <p class="has-text-success">
            <b-icon
              icon="genderless"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            Horários Disponíveis
          </p>
        </div>
      </div>
    </section>

    <div class="container p-5">
      <div class="columns is-desktop">
        <div class="column is-5-desktop">
          <!-- <placeholder-description v-if="isLoading" /> -->
          <!-- <p v-else-if="event.description">{{ event.description }}</p> -->
          <!-- <p v-else>Nenhum detalhe foi fornecido para este evento.</p> -->

          <p class="title is-5 has-text-white">Sobre a Mentora</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <a href="#">
            <b-icon
              icon="globe-americas"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            https://example.com
          </a>
        </div>
        <div class="column is-7-desktop mb-5">
          <p class="title is-5 has-text-white">Quadro de Horários</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CareerDetails',
  data() {
    return {
      opportunity: {
        title: '',
      },
    };
  },
};
</script>
