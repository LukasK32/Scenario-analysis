<template>
  <div v-if="factor !== null" class="card">
    <div class="card-content">
      <div class="media columns is-vcentered">

        <div class="column is-3">
          <p class="title is-6">{{ factor.name }}</p>
        </div>

        <div class="column is-3 has-text-centered">
          {{ changeName }}
        </div>
        <div class="column is-3 has-text-centered">
          {{ factor.influence }}
        </div>

        <div class="column is-3 buttons has-text-right">
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
    changeName() {
      switch (this.factor.change) {
        case -1:
          return 'Spadek';
        case 0:
          return 'Stabilizacja';
        case 1:
          return 'Wzrost';
        default:
          return '-';
      }
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
