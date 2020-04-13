<template>
  <section>
    <b-navbar fixed-top type="is-dark">
      <template slot="brand">
        <b-navbar-item tag="div">Metoda scenariuszowa</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item @click="infoDialog = true">
          <i class="material-icons-outlined">info</i>
        </b-navbar-item>
      </template>
    </b-navbar>

    <b-modal :active.sync="infoDialog" :width="500" scroll="keep">
      <div class="card">
        <div class="card-content">
          <h4 class="title is-4">
            Metoda scenariuszowa
          </h4>

          <p class="content">
            Aplikacja do przeprowadzania analizy otoczenia metodą scenariuszową.
          </p>

          <h4 class="title is-5">
            Autor
          </h4>

          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="https://github.com/LukasK32.png?size=96" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-5">Łukasz Kirylak</p>
              <p class="subtitle is-6">
                GitHub: <a href="https://github.com/LukasK32" target="_blank">LukasK32</a>
              </p>
            </div>
          </div>

          <p class="buttons is-right">
            <button class="button is-info" @click="infoDialog = false">Ok</button>
          </p>

        </div>
      </div>
    </b-modal>

    <ProjectExplorer v-if="loaded" />
    <ProjectLoader v-else />
  </section>
</template>

<script>
import ProjectLoader from './components/ProjectLoader.vue';
import ProjectExplorer from './components/ProjectExplorer.vue';

export default {
  name: 'App',
  components: {
    ProjectLoader,
    ProjectExplorer,
  },
  data: () => ({
    infoDialog: false,
  }),
  computed: {
    project() {
      return this.$store.state.project;
    },
    loaded() {
      return this.$store.state.loaded;
    },
  },
};
</script>

<style lang="scss">
html,
body {
  overflow-y: auto;
}

body {
  font-family: "Ubuntu", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 960px;
}
</style>
