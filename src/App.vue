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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.

          <div class="has-text-right">
            <button class="button is-success" @click="infoDialog = false">Ok!</button>
          </div>

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
