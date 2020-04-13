<template>
  <b-modal :active.sync="isModalActive" scroll="clip" trap-focus>
    <div class="card" style="max-width: 450px; margin: 10px auto;">
      <div class="card-content">
        <div class="content">
          <h4 class="title is-4">
            {{ domainName ? 'Dodaj czynnik' : 'Edytuj czynnik' }}
            <small class="is-size-6 is-block" v-if="domainName">Strefa: {{ domainName }}</small>
          </h4>
          <p>
            <b-field label="Nazwa">
              <b-input type="text" v-model="factorData.name" />
            </b-field>

            <b-field label="Wpływ">
              <b-numberinput
                icon-pack="material-icons-outlined"
                min="-10"
                max="10"
                v-model="factorData.influence"
              />
            </b-field>
          </p>
          <p class="buttons is-right">
            <button class="button" @click="cancelModal">
              Anuluj
            </button>
            <button class="button is-success" @click="submitModal">
              {{ domainName ? 'Dodaj' : 'Zapisz' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    domainName: {
      default: '',
    },
    factor: {
      default: {},
    },
  },
  data: () => ({
    isModalActive: true,
    factorData: {
      domain: 0,
      name: '',
      influence: 0,
    },
  }),
  created() {
    this.factorData = {
      ...this.factorData,
      ...this.factor,
    };
  },
  methods: {
    cancelModal() {
      this.$emit('cancel');
    },
    submitModal() {
      this.$emit('submit', this.factorData);
    },
  },
  watch: {
    isModalActive() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss">
.material-icons-outlined {
  &.plus::after {
    content: 'add';
  }

  &.minus::after {
    content: 'remove';
  }
}
</style>
