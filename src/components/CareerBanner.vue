<template>
  <section class="banner hero is-primary has-background is-transparent is-bold">
    <img
      src="/universe.jpg"
      class="hero-background is-transparent"
      alt="No plano de fundo, imagem mostrando o universo"
    />
    <div class="hero-body">
      <b-button
        type="is-primary" icon-left="arrow-left" class="back-btn mb-5"
        tag="a" href="https://shestech.org/"
      >
        Voltar para página inicial
      </b-button>
      <div class="container has-text-centered mt-6">
        <p class="title is-3 pb-5 is-uppercase">
          Central de Mentorias
        </p>
        <p class="subtitle is-5">
          Sua oportunidade de conversar com mulheres incríveis que
          podem ajudar você com os desafios de sua vida profissional!
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MainBanner',
};
</script>

<style lang="scss" scoped>
.hero {
  &.has-background {
    position: relative;
    overflow: hidden;
  }
  &-background {
    position: absolute;
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
    &.is-transparent {
      opacity: 0.9;
    }
  }
}

.blend-object {
  mix-blend-mode: soft-light;
}

.hero-body {
  position: relative;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
