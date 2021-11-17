<template>
  <div class="termos-de-uso">
    <h2>She'sTech Conference 2021</h2>
    <h3>Termos de Uso</h3>

    <p>
      Concordo com o tratamento de meus dados pessoais sensíveis
      para as finalidades descritas na
      <router-link to="/declaracao-de-privacidade">Declaração de Privacidade</router-link>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'TermosDeUso',
};
</script>

<style lang="scss" scoped>
.termos-de-uso {
  padding: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
}
</style>
