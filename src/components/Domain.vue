<template>
    <div v-if="domain !== null" class="card">
      <div class="card-content">
        <div class="media columns is-vcentered">
          <div class="column">
            <p class="title is-4">{{ domain.name }}</p>
          </div>
          <div class="column buttons has-text-right">
            <button class="button is-success" @click="isFactorModalActive = true">
              Dodaj czynnik
            </button>
            <button class="button is-info" @click="update">Edytuj</button>
            <button class="button is-danger" @click="destroy">Usuń</button>
          </div>
        </div>

        <div class="content">

          <template v-for="factorID in Object.keys(factors)">
            <Factor :key="`factor-${factorID}`" :ID="factorID" />
          </template>

        </div>
      </div>

      <FactorModal
        v-if="isFactorModalActive"
        :domainName="domain.name"
        :factor="{domain: ID}"
        @cancel="isFactorModalActive = false"
        @submit="storeFactor"
      />
    </div>
</template>

<script>
import Factor from './Factor.vue';
import FactorModal from './FactorModal.vue';

export default {
  components: {
    Factor,
    FactorModal,
  },
  props: {
    ID: {
      default: '0',
    },
  },
  data: () => ({
    isFactorModalActive: false,
  }),
  computed: {
    domain() {
      const { domains } = this.$store.state;

      if (this.ID in domains) return domains[this.ID];

      return null;
    },
    factors() {
      const { factors } = this.$store.state;
      const myFactors = {};

      Object.keys(factors).forEach((ID) => {
        if (factors[ID].domain === this.ID) {
          Object.assign(myFactors, {
            [ID]: {
              ...factors[ID],
            },
          });
        }
      });

      return myFactors;
    },
  },
  methods: {
    update() {
      this.$buefy.dialog.prompt({
        message: `Podaj nową nazwę dla sfery <strong>${this.domain.name}</strong>:`,
        inputAttrs: {
          placeholder: 'Ekonomiczna',
          maxlength: 50,
          value: this.domain.name,
        },
        cancelText: 'Anuluj',
        confirmText: 'Zapisz',
        trapFocus: true,
        onConfirm: async (newName) => {
          if (newName === null || this.domain.name === newName) return;

          this.$store.commit('updateDomain', {
            ID: this.ID,
            domain: {
              name: newName,
            },
          });
        },
      });
    },
    destroy() {
      this.$buefy.dialog.confirm({
        message: `Czy napewno chcesz usunąć sferę <strong>${this.domain.name}</strong>?`,
        cancelText: 'Anuluj',
        confirmText: 'Usuń',
        type: 'is-danger',
        onConfirm: () => {
          this.$store.commit('destroyDomain', this.ID);
        },
      });
    },
    storeFactor(factor) {
      this.isFactorModalActive = false;
      this.$store.commit('storeFactor', {
        ...factor,
      });
    },
  },
};
</script>
