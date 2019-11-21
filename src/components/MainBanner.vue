<template>
  <section class="banner hero is-medium is-primary has-background is-transparent is-bold">
    <img
      src="/universe.jpg"
      class="blend-object hero-background is-transparent"
      alt="No plano de fundo, imagem mostrando o universo"
    />
    <div class="hero-body">
      <div class="container">
        <p class="title is-3 pb-5">
          Programação
        </p>
        <p class="subtitle is-5">
          Junte-se a nós em três dias de workshops, palestras e
          painéis de especialistas no maior evento para mulheres
          na tecnologia do Brasil!
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
      opacity: 0.3;
    }
  }
}

.blend-object {
  mix-blend-mode: soft-light;
}
</style>
