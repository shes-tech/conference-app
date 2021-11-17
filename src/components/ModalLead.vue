<template>
  <b-modal
    :active="isModalActive"
  >
    <div class="card modal-lead is-centered">
      <div class="card-content">
        <img
          src="@/assets/logo.png"
          alt="She's Tech Conference 2021"
          class="mb-4"
        />

        <div class="content">
          O maior evento de mulheres na tecnologia do Brasil. Viva essa experiência!
        </div>

        <section class="mb-5">
          <b-field label="Nome *" aria-required>
            <b-input
              v-model="form.nome"
              type="text"
              maxlength="60"
              :has-counter="false"
            />
          </b-field>
          <b-field label="Email *" aria-required>
            <b-input
              v-model="form.email"
              type="email"
              maxlength="60"
              :has-counter="false"
            />
          </b-field>
          <b-field label="Cargo ou Área de Atuação *" aria-required>
            <b-input
              v-model="form.cargo"
              type="text"
              maxlength="60"
              :has-counter="false"
            />
          </b-field>
          <b-field>
            <b-checkbox v-model="form.termos" aria-required>
              Aceito os
              <a href="/termos-de-uso" target="_blank">Termos de Uso</a>
              e a
              <a href="/declaracao-de-privacidade" target="_blank">Declaração de Privacidade</a>.
            </b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox v-model="form.jobMe">
              Quero fazer parte do JOB.me, programa de mentoria e banco de talentos
            </b-checkbox>
          </b-field>
        </section>


        <div class="buttons">
          <b-button
            class="mr-3"
            type="is-primary"
            :disabled="!isValid"
            :loading="isLoading"
            @click="sendLead()"
          >
            Entrar
          </b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import firebase from 'firebase/app';

const db = firebase.firestore();
const COLLECTION_NAME = 'leads-2021';

export default {
  name: 'ModalLead',
  data() {
    return {
      isModalActive: true,
      isLoading: false,
      form: {
        nome: '',
        email: '',
        cargo: '',
        termos: false,
        jobMe: false,
      },
    };
  },
  methods: {
    async sendLead() {
      this.isLoading = true;

      await this.saveLead();
      this.saveToLocalStorage();

      this.isLoading = false;
      this.closeModal();
    },

    getFromLocalStorage() {
      const status = JSON.parse(localStorage.getItem('lead'));
      if (status) this.isModalActive = false;
    },
    saveToLocalStorage() {
      localStorage.setItem('lead', JSON.stringify(true));
    },

    closeModal() {
      this.isModalActive = false;
    },

    async saveLead() {
      const form = {
        ...this.form,
        time: new Date(),
      };
      await db.collection(COLLECTION_NAME).add(form);
    },
  },
  computed: {
    isValid() {
      return this.form.termos
        && this.form.nome
        && this.form.email
        && this.form.cargo;
    },
  },
  created() {
    this.getFromLocalStorage();
  },
};
</script>

<style lang="scss" scoped>
.modal-lead {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
