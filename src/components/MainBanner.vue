<template>
  <section class="banner hero is-medium is-primary has-background is-transparent is-bold">
    <img
      src="@/assets/universe.png"
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
          Programação
        </p>
        <p class="subtitle is-5">
          Junte-se a nós nesses 4 dias de workshops,
          palestras e painéis de especialistas no maior
          evento de mulheres na tecnologia do Brasil!
        </p>
        <p class="subtitle is-4 has-text-weight-bold">
          INSPIRAR > ENGAJAR > CAPACITAR
        </p>
        <p class="subtitle is-5">
          Teremos muito conteúdo, mentorias, trocas e
          interação no Chat do Discord e no Canal do Telegram.
        </p>
        <p class="subtitle is-4">
          Vamos Juntes!
        </p>
        <p class="is-5 pt-5 pb-1 mb-1">
          <b-button
            type="is-dark" size="is-medium" class="is-uppercase btn-discord mr-2"
            tag="a" href="https://discord.gg/gAss2vSTFM" target="_blank"
          >
            <b-icon icon="discord" pack="fab" class="vertical-align" />
            <span class="ml-3">Chat do Discord</span>
          </b-button>

          <b-button
            type="is-dark" size="is-medium" class="is-uppercase btn-telegram ml-2 mr-2"
            tag="a" href="https://t.me/shestech" target="_blank"
          >
            <b-icon icon="telegram" pack="fab" class="vertical-align" />
            <span class="ml-3">Canal do Telegram</span>
          </b-button>

          <b-button
            type="is-dark" size="is-medium" class="is-uppercase btn-linkedin ml-2"
            tag="a" href="https://br.linkedin.com/company/shestech" target="_blank"
          >
            <b-icon icon="linkedin-in" pack="fab" class="vertical-align" />
            <span class="ml-3">LinkedIn</span>
          </b-button>
        </p>
        <p class="is-5 pt-4 pb-1 mb-1">
          #ShesTechConference2021
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

.btn-linkedin {
  background-color: #0077b5;
}

.btn-telegram {
  background-color: #0088cc;
}

.btn-discord {
  background-color: #7289da;
}
</style>
