<template>
  <div class="container">
    <div class="buttons is-right">
      <button class="button is-success" @click="addDomain">Dodaj sferę</button>
    </div>

    <div class="card" v-for="domain in domains" :key="domain.name">
      <div class="card-content">
        <div class="media columns is-vcentered">
          <div class="column">
            <p class="title is-4">{{ domain.name }}</p>
          </div>
          <div class="column buttons has-text-right">
            <button class="button is-success" @click="() => {}">Dodaj czynnik</button>
            <button class="button is-info" @click="editDomain(domain.name)">Edytuj</button>
            <button class="button is-danger" @click="removeDomain(domain.name)">Usuń</button>
          </div>
        </div>

        <div class="content">

          <div
            class="card"
            v-for="factor in domain.factors"
            :key="`${domain.name}:${factor.name}`"
          >
            <div class="card-content">
            <div class="media columns is-vcentered">
              <div class="column">
                <p class="title is-4">{{ factor.name }}</p>
              </div>
              <div class="column has-text-centered">
                {{ factor.influence }}
              </div>
              <div class="column buttons has-text-right">

                <button
                  class="button is-info is-small is-outlined"
                  @click="() => {}"
                >
                  Edytuj
                </button>
                <button
                  class="button is-danger is-small is-outlined"
                  @click="() => {}"
                >
                  Usuń
                </button>

              </div>
            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    domains() {
      return this.$store.state.project.domains;
    },
  },
  methods: {
    async addDomain() {
      this.$buefy.dialog.prompt({
        message: 'Podaj nazwę dla nowej sfery:',
        inputAttrs: {
          placeholder: 'np. Ekonomiczna',
          maxlength: 50,
        },
        cancelText: 'Anuluj',
        confirmText: 'Dodaj',
        trapFocus: true,
        onConfirm: async (name) => {
          if (name === null) return;

          try {
            await this.$store.dispatch('addDomain', name.trim());
          } catch (e) {
            this.displayError(e.message);
          }
        },
      });
    },
    async editDomain(oldName) {
      this.$buefy.dialog.prompt({
        message: `Podaj nową nazwę dla sfery <strong>${oldName}</strong>:`,
        inputAttrs: {
          placeholder: 'np. Ekonomiczna',
          maxlength: 50,
          value: oldName,
        },
        cancelText: 'Anuluj',
        confirmText: 'Dodaj',
        trapFocus: true,
        onConfirm: async (newName) => {
          if (newName === null || oldName === newName) return;

          try {
            await this.$store.dispatch('editDomain', {
              oldName,
              newName,
            });
          } catch (e) {
            this.displayError(e.message);
          }
        },
      });
    },
    async removeDomain(name) {
      this.$buefy.dialog.confirm({
        message: `Czy napewno chcesz usunąć sferę <strong>${name}</strong>?`,
        cancelText: 'Anuluj',
        confirmText: 'Usuń',
        type: 'is-danger',
        onConfirm: async () => {
          await this.$store.commit('removeDomain', name);
        },
      });
    },
    displayError(msg) {
      this.$buefy.snackbar.open({
        duration: 6000,
        message: msg,
        type: 'is-danger',
        position: 'is-bottom-left',
        actionText: 'Ok',
        queue: false,
      });
    },
  },
};
</script>
