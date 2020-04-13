<template>
  <div v-if="factor !== null" class="card">
    <div class="card-content">
      <div class="media columns is-vcentered">
        <div class="column">
          <p class="title is-6">{{ factor.name }}</p>
        </div>
        <div class="column has-text-centered">{{ factor.influence }}</div>
        <div class="column buttons has-text-right">
          <button class="button is-info is-small is-outlined" @click="isFactorModalActive = true">
            Edytuj
          </button>
          <button class="button is-danger is-small is-outlined" @click="destroy">Usuń</button>
        </div>
      </div>
    </div>

    <FactorModal
        v-if="isFactorModalActive"
        :factor="factor"
        @cancel="isFactorModalActive = false"
        @submit="update"
      />
  </div>
</template>

<script>
import FactorModal from './FactorModal.vue';

export default {
  components: {
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
    factor() {
      const { factors } = this.$store.state;

      if (this.ID in factors) return factors[this.ID];

      return null;
    },
  },
  methods: {
    update(factor) {
      this.isFactorModalActive = false;

      this.$store.commit('updateFactor', {
        ID: this.ID,
        factor,
      });
    },
    destroy() {
      this.$buefy.dialog.confirm({
        message: `Czy napewno chcesz usunąć czynnik <strong>${this.factor.name}</strong>?`,
        cancelText: 'Anuluj',
        confirmText: 'Usuń',
        type: 'is-danger',
        onConfirm: () => {
          this.$store.commit('destroyFactor', this.ID);
        },
      });
    },
  },
};
</script>
