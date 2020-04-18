<template>
  <b-modal :active.sync="isModalActive" scroll="clip" trap-focus>
    <div class="card" style="max-width: 450px; margin: 10px auto;">
      <div class="card-content">
        <div class="content">
          <h4 class="title is-4">
            {{ domainName ? 'Dodaj czynnik' : 'Edytuj czynnik' }}
            <small
              class="is-size-6 is-block"
              v-if="domainName"
            >Strefa: {{ domainName }}</small>
          </h4>
          <p>
            <b-field label="Nazwa">
              <b-input type="text" v-model="factorData.name" />
            </b-field>

            <b-field label="Sfera">
              <b-select v-model="factorData.domain">
                <option
                  v-for="(domain, ID) in domains"
                  :value="ID"
                  :key="`factor-domain-${ID}`"
                >{{ domain.name }}</option>
              </b-select>
            </b-field>

            <div
              v-for="(scenario, ID) in scenarios"
              :key="`factor-scenarion-${ID}`"
              class="content"
            >
              <p class="title is-5">Scenariusz: {{ scenario.name }}</p>

              <b-field label="Kierunek zmian">
                <b-field>
                  <b-radio-button
                    v-model="factorData.effect[ID].change"
                    :native-value="-1"
                    type="is-danger"
                  >Spadek</b-radio-button>
                  <b-radio-button
                    v-model="factorData.effect[ID].change"
                    :native-value="0"
                    type="is-info"
                  >Stabilizacja</b-radio-button>
                  <b-radio-button
                    v-model="factorData.effect[ID].change"
                    :native-value="1"
                    type="is-success"
                  >Wzrost</b-radio-button>
                </b-field>
              </b-field>

              <b-field label="Wpływ" style="max-width: 260px;">
                <b-numberinput
                  icon-pack="material-icons-outlined"
                  min="-10"
                  max="10"
                  v-model="factorData.effect[ID].influence"
                />
              </b-field>
            </div>
          </p>

          <p class="buttons is-right">
            <button class="button" @click="cancelModal">Anuluj</button>
            <button
              class="button is-success"
              @click="submitModal"
            >{{ domainName ? 'Dodaj' : 'Zapisz' }}</button>
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
    isModalActive: false,
    factorData: {
      domain: 0,
      name: '',
      effect: {},
    },
  }),
  computed: {
    domains() {
      return this.$store.state.domains;
    },
    scenarios() {
      return this.$store.state.scenarios;
    },
  },
  created() {
    this.factorData = {
      ...this.factorData,
      ...this.factor,
    };

    Object.keys(this.scenarios).forEach((scenarioID) => {
      if (scenarioID in this.factorData.effect) {
        return;
      }

      this.factorData.effect = {
        ...this.factorData.effect,
        [scenarioID]: {
          change: 0,
          influence: 0,
        },
      };
    });

    if (this.factorData.domain in this.domains) return;

    const domainIDs = Object.keys(this.domains);

    if (domainIDs.length > 0) {
      [this.factorData.domain] = domainIDs;
    } else {
      this.factorData.domain = 0;
    }
  },
  mounted() {
    this.isModalActive = true;
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
    isModalActive(value) {
      if (!value) this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss">
.material-icons-outlined {
  &.plus::after {
    content: "add";
  }

  &.minus::after {
    content: "remove";
  }
}
</style>
