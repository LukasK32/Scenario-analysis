<template>
  <div>
    <div class="buttons is-right">
      <button class="button is-success" @click="create">Dodaj</button>
    </div>

    <template v-for="ID in Object.keys(factors)">
      <Factor :key="`factor-${ID}`" :ID="ID" />
    </template>

    <FactorModal
      v-if="isFactorModalActive"
      :factor="{}"
      @cancel="isFactorModalActive = false"
      @submit="store"
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
  data: () => ({
    isFactorModalActive: false,
  }),
  computed: {
    factors() {
      return this.$store.state.factors;
    },
  },
  methods: {
    create() {
      this.isFactorModalActive = true;
    },
    store(factor) {
      this.isFactorModalActive = false;
      this.$store.commit('storeFactor', {
        ...factor,
      });
    },
  },
};
</script>
