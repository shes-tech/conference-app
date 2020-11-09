<template>
  <footer class="footer mt-6">
    <div class="content has-text-centered">
      <div class="mb-5">
        <b-button
          class="mr-4"
          type="is-text"
          tag="a"
          href="https://italolelis.com/posts/shestech-app-pt/"
          rel="noopener"
          target="_blank"
          rounded
        >Sobre</b-button>
        <b-button
          class="mr-4"
          type="is-text"
          tag="a"
          href="https://github.com/shes-tech/conference-app"
          rel="noopener"
          target="_blank"
          rounded
        >GitHub</b-button>
      </div>
      <p>
        Este é um projeto de código aberto desenvolvido utilizando Vue.js
      </p>
      <p>
        Made with
        <b-icon icon="heart" size="is-small" class="vertical-align ml-2 mr-2" />
        by
        <a
          href="https://italolelis.com/"
          target="_blank"
          rel="”noopener”"
        ><b>Italo Lelis</b></a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
