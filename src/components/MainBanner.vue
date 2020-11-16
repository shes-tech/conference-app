<template>
  <section class="banner hero is-medium is-primary has-background is-transparent is-bold">
    <img
      src="/universe.jpg"
      class="hero-background is-transparent"
      alt="No plano de fundo, imagem mostrando o universo"
    />
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title is-3 pb-5 is-uppercase">
          Programação
        </p>
        <p class="subtitle is-5">
          Junte-se a nós nesses 5 dias de workshops,
          palestras e painéis de especialistas no maior
          evento de mulheres na tecnologia do Brasil!
        </p>
        <p class="subtitle is-4">
          INSPIRAR > ENGAJAR > CAPACITAR
        </p>
        <p class="subtitle is-5">
          Teremos muito conteúdo, mentorias, trocas e
          interação no Canal do Discord e na Sala do Zoom.
        </p>
        <p class="subtitle is-4">
          Vamos Juntes!
        </p>
        <p class="is-5 pt-5 pb-1 mb-1">
          #ShesTechConference2020
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
</style>
