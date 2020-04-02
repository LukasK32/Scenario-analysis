<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">

        <v-btn large color="primary" class="ma-2" @click="createProject()">Nowy projekt</v-btn>
        <v-btn large color="secondary" class="ma-2" @click="initProjectLoading()">
          Wczytaj projekt
        </v-btn>

      </v-row>
    </v-container>

    <input
      type="file"
      ref="fileInput"
      accept=".json"
      multiple="false"
      style="display:none"
      @change="loadProject"
    />

    <v-snackbar v-model="error" bottom color="error" :timeout="6000">
      {{ error_msg }}
      <v-btn dark text @click="error = false">Zamknij</v-btn>
    </v-snackbar>
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
    initProjectLoading() {
      this.$refs.fileInput.click();
    },
    async loadProject(event) {
      this.error = false;

      try {
        if (event.target.files.length !== 1) throw new Error('Nie wybrano pliku');

        const file = event.target.files[0];

        if (file.type !== 'application/json') throw new Error('Wybrano nieobsługiwany typ pliku');

        let parsedProject = {};

        try {
          parsedProject = await file.text();
        } catch (err) {
          throw new Error('Nie udało się odczytać danych z pliku');
        }

        const project = JSON.parse(parsedProject);

        // 'project' object should be checked here...

        await this.$store.commit('overwriteProject', project);
      } catch (e) {
        this.error = true;
        this.error_msg = e.message;
      }
    },
  },
};
</script>
