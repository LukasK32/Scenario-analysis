<template>
    <div>
      <div class="buttons is-right">
        <button class="button is-success" @click="create">Dodaj</button>
      </div>

      <template v-for="ID in Object.keys(scenarios)">
        <Scenario :key="`scenario-${ID}`" :ID="ID" />
      </template>

    </div>
</template>

<script>
import Scenario from './Scenario.vue';

export default {
  components: {
    Scenario,
  },
  computed: {
    scenarios() {
      return this.$store.state.scenarios;
    },
  },
  methods: {
    create() {
      this.$buefy.dialog.prompt({
        message: 'Podaj nazwę dla nowego scenariusza:',
        inputAttrs: {
          placeholder: 'np. Optymistyczny',
          maxlength: 50,
        },
        cancelText: 'Anuluj',
        confirmText: 'Dodaj',
        trapFocus: true,
        onConfirm: this.store,
      });
    },
    store(name) {
      if (name === null || name === '') return;

      this.$store.commit('storeScenario', {
        name: name.trim(),
      });
    },
  },
};
</script>
