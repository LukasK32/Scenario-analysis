<template>
  <div class="card" v-if="scenario !== null">
    <div class="card-content">
      <div class="media columns is-vcentered">

        <div class="column is-8">
          <p class="title is-5">
            {{ scenario.name }}
          </p>
        </div>

        <div class="column buttons has-text-right">
          <button class="button is-info" @click="edit">Edytuj</button>
          <button class="button is-danger" @click="destroy">Usuń</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ID: {
      default: '0',
    },
  },
  computed: {
    scenario() {
      const { scenarios } = this.$store.state;

      if (this.ID in scenarios) return scenarios[this.ID];

      return null;
    },
  },
  methods: {
    edit() {
      this.$buefy.dialog.prompt({
        message: `Podaj nową nazwę dla scenariusza <strong>${this.scenario.name}</strong>:`,
        inputAttrs: {
          placeholder: 'np. Optymistyczny',
          maxlength: 50,
          value: this.scenario.name,
        },
        cancelText: 'Anuluj',
        confirmText: 'Zapisz',
        trapFocus: true,
        onConfirm: this.update,
      });
    },
    update(name) {
      if (name === null || name === '' || name === this.scenario.name) return;

      this.$store.commit('updateScenario', {
        ID: this.ID,
        scenario: {
          name,
        },
      });
    },
    destroy() {
      this.$buefy.dialog.confirm({
        message: `Czy napewno chcesz usunąć scenariusz <strong>${this.scenario.name}</strong>?`,
        cancelText: 'Anuluj',
        confirmText: 'Usuń',
        type: 'is-danger',
        onConfirm: () => this.$store.dispatch('destroyScenario', this.ID),
      });
    },
  },
};
</script>
