<template>
  <div class="container">
    <div class="buttons is-right">
      <button class="button is-success" @click="addDomain">Dodaj sferę</button>
    </div>

    <template v-for="domainID in Object.keys(domains)">
      <Domain
        :key="`domain-${domainID}`"
        :ID="domainID"
      />
    </template>

    <b-modal :active.sync="isFactorModalActive" scroll="clip" trap-focus>
      <div class="card" style="max-width: 450px; margin: 10px auto;">
        <div class="card-content">
          <div class="content">
            <h4 class="title is-4">
              {{ isEditingFactor ? `Edytuj czynnik` : 'Dodaj czynnik' }}
              <small class="is-size-6 is-block">Strefa: {{ factorDomain }}</small>
            </h4>
            <p>
              <b-field label="Nazwa">
                <b-input type="text" v-model="newFactor.name" />
              </b-field>

              <b-field label="Wpływ">
                <b-input type="number" min="-5" max="5" v-model="newFactor.influence" />
              </b-field>
            </p>
            <p class="buttons is-right">
              <button class="button" @click="isFactorModalActive = false">
                Anuluj
              </button>
              <button class="button is-success"
                @click="() => {storeFactor(); isFactorModalActive = false}">
                {{ isEditingFactor ? `Zapisz` : 'Dodaj' }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Domain from './Domain.vue';

export default {
  components: {
    Domain,
  },
  data: () => ({
    isFactorModalActive: false,
    isEditingFactor: false,
    factorDomain: '',
    oldFactorName: '',
    newFactor: {
      name: '',
      influence: 0,
    },
  }),
  computed: {
    domains() {
      return this.$store.state.domains;
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

          this.$store.commit('storeDomain', {
            name: name.trim(),
          });
        },
      });
    },
  },
};
</script>
