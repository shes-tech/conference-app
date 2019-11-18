<template>
  <section class="banner hero is-medium is-primary has-background is-transparent is-bold">
    <img src="https://images.unsplash.com/photo-1520034475321-cbe63696469a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb" class="blend-object hero-background is-transparent" alt="Fill Murray" />
    <div class="hero-body">
      <div class="container">
        <p class="title is-3 pb-5">
          Cronograma
        </p>
        <p class="subtitle is-5">
          Junte-se a nós em três dias de workshops, palestras e
          painéis de especialistas no maior evento para mulheres
          na tecnologia do Brasil!
        </p>

        <!-- <b-field class="mt-5">
          <b-input placeholder="Pesquisar..."
            type="search"
          />
          <div class="control">
            <button class="button is-secondary">
              <b-icon icon="search" class="pl-5 pr-5" />
            </button>
          </div>
        </b-field> -->
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
