<template>
  <v-content>
    <v-container class="main-container">
      <v-row justify="end">
        <ProjectSaver />
      </v-row>
      <v-row>
        <ProjectNameField />
      </v-row>
      <v-row>
        <DomainExplorer @failed="handleError" />
      </v-row>
    </v-container>

    <v-snackbar v-model="error" bottom color="error" :timeout="6000">
      {{ error_msg }}
      <v-btn dark text @click="error = false">Zamknij</v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
import ProjectNameField from './ProjectNameField.vue';
import ProjectSaver from './ProjectSaver.vue';
import DomainExplorer from './DomainExplorer.vue';

export default {
  components: {
    ProjectNameField,
    ProjectSaver,
    DomainExplorer,
  },
  data: () => ({
    error: false,
    error_msg: '...',
  }),
  methods: {
    handleError(err) {
      this.error = false;

      setTimeout(() => {
        this.error_msg = err;
        this.error = true;
      }, 0);
    },
  },
};
</script>

<style lang="scss">
.main-container {
  display: block;
  padding-left: 20px !important;
  padding-right: 20px !important;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
