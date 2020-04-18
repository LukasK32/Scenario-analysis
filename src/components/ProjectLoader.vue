<template>
  <section class="hero is-light is-bold is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="buttons is-centered">

          <button class="button is-success is-medium" @click="createProject()">
            Nowy projekt
          </button>

          <button class="button is-info is-medium" @click="initProjectLoading()">
            Wczytaj projekt
          </button>

        </div>
      </div>
    </div>
    <input
        type="file"
        ref="fileInput"
        accept=".json"
        multiple="false"
        style="display:none"
        @change="loadProject"
      />
      <b-loading :is-full-page="true" :active.sync="isLoading" />
  </section>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
  }),
  methods: {
    async createProject() {
      if (this.isLoading) { return; }
      this.isLoading = true;

      this.$store.dispatch('loadProject');
    },
    initProjectLoading() {
      if (this.isLoading) { return; }

      this.$refs.fileInput.click();
    },
    async loadProject(event) {
      this.isLoading = true;

      try {
        if (event.target.files.length !== 1) throw new Error('Nie wybrano pliku');

        const file = event.target.files[0];

        if (file.type !== 'application/json') throw new Error('Wybrano nieobsługiwany typ pliku');

        let parsedProject = {};

        try {
          parsedProject = await file.text();
          const project = JSON.parse(parsedProject);

          // 'project' object should be checked here...

          await this.$store.dispatch('loadProject', project);
        } catch (err) {
          throw new Error('Nie udało się odczytać danych z pliku');
        }
      } catch (e) {
        this.isLoading = false;
        this.$buefy.snackbar.open({
          duration: 6000,
          message: e.message,
          type: 'is-danger',
          position: 'is-bottom-left',
          actionText: 'Ok',
          queue: false,
        });
      }

      event.target.value = ''; // eslint-disable-line no-param-reassign
    },
  },
};
</script>
