import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const cleanState = {
  loaded: false,
  name: 'Bez tytułu',
  indexes: {
    domains: 1,
    factors: 1,
  },
  domains: {},
  factors: {},
};

export default new Vuex.Store({
  state: {
    ...cleanState,
  },
  mutations: {
    storeDomain(state, domain) {
      const ID = state.indexes.domains;
      state.indexes.domains += 1;

      state.domains = {
        ...state.domains,
        [ID]: {
          name: 'Unnamed domain',
          ...domain,
        },
      };
    },
    updateDomain(state, { ID, domain }) {
      const { domains } = this.state;

      if (ID in domains) {
        domains[ID] = {
          ...domains[ID],
          ...domain,
        };
      }

      state.domains = this.state.domains;
    },
    destroyDomain(state, ID) {
      const { domains, factors } = state;

      if (ID in domains) {
        Object.keys(factors).forEach((factorID) => {
          if (factors[factorID].domain === ID) {
            Vue.delete(factors, factorID);
          }
        });

        Vue.delete(domains, ID);
      }

      state.domains = domains;
      state.factors = factors;
    },
    storeFactor(state, factor) {
      const ID = state.indexes.factors;
      state.indexes.factors += 1;

      state.factors = {
        ...state.factors,
        [ID]: {
          domain: 0,
          name: 'Unnamed factor',
          influence: 0,
          ...factor,
        },
      };
    },
    updateFactor(state, { ID, factor }) {
      const { factors } = this.state;

      if (ID in factors) {
        factors[ID] = {
          ...factors[ID],
          ...factor,
        };
      }

      state.factors = this.state.factors;
    },
    destroyFactor(state, ID) {
      const { factors } = state;

      if (ID in factors) {
        Vue.delete(factors, ID);
      }

      state.factors = factors;
    },
    loadProject(state, project = cleanState) {
      Object.assign(state, cleanState, project, {
        loaded: true,
      });
    },
    updateProjectName(state, name) {
      // trim() results in weird behaviour in v-text-field
      // state.project.name = name.trim();

      state.name = name;
    },
  },
  actions: {
  },
  modules: {
  },
});
