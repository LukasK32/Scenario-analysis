<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">

        <v-btn large color="primary" class="ma-2" @click="createProject()">Nowy projekt</v-btn>
        <v-btn large color="secondary" class="ma-2" @click="loadProject()">Wczytaj projekt</v-btn>

        <v-snackbar v-model="error" bottom color="error" :timeout="6000">
          {{ error_msg }}
          <v-btn dark text @click="error = false">Zamknij</v-btn>
        </v-snackbar>

      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    error: false,
    error_msg: '...',
  }),
  methods: {
    async createProject() {
      this.error = false;

      try {
        await this.$store.dispatch('createProject');
      } catch (e) {
        this.error = true;
        this.error_msg = e;
      }
    },
    async loadProject() {
      this.error = false;

      try {
        await this.$store.dispatch('loadProject');
      } catch (e) {
        this.error = true;
        this.error_msg = e.message;
      }
    },
  },
};
</script>
