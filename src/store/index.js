import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const cleanState = {
  loaded: false,
  name: 'Bez tytułu',
  indexes: {
    domains: 1,
    factors: 1,
    scenarios: 1,
  },
  scenarios: {
  },
  domains: {
  },
  factors: {
  },
};

export default new Vuex.Store({
  state: {
    ...cleanState,
  },
  mutations: {
    // |----------------------------------------------
    // |  Scenarios
    // |----------------------------------------------
    storeScenario(state, scenario) {
      const ID = state.indexes.scenarios;
      state.indexes.scenarios += 1;

      state.scenarios = {
        ...state.scenarios,
        [ID]: {
          name: 'Scenariusz bez nazwy',
          ...scenario,
        },
      };
    },
    updateScenario(state, { ID, scenario }) {
      const { scenarios } = state;

      if (ID in scenarios) {
        scenarios[ID] = {
          ...scenarios[ID],
          ...scenario,
        };
      }
    },
    destroyScenario(state, ID) {
      const { scenarios } = state;

      if (ID in scenarios) {
        Vue.delete(scenarios, ID);
      }
    },
    // |----------------------------------------------
    // |  Domains
    // |----------------------------------------------
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
      const { domains } = state;

      if (ID in domains) {
        domains[ID] = {
          ...domains[ID],
          ...domain,
        };
      }
    },
    destroyDomain(state, ID) {
      const { domains } = state;

      if (ID in domains) {
        Vue.delete(domains, ID);
      }
    },
    // |----------------------------------------------
    // |  Factors
    // |----------------------------------------------
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
    },
    destroyFactor(state, ID) {
      const { factors } = state;

      if (ID in factors) {
        Vue.delete(factors, ID);
      }
    },
    // |----------------------------------------------
    // |  Project
    // |----------------------------------------------
    loadProject(state, project = cleanState) {
      Object.assign(state, cleanState, project, {
        loaded: true,
      });
    },
    // |----------------------------------------------
    // |  Project name
    // |----------------------------------------------
    updateProjectName(state, name) {
      // trim() results in weird behaviour in v-text-field
      // state.project.name = name.trim();

      state.name = name;
    },
  },
  actions: {
    destroyScenario({ commit }, ID) {
      // TODO: Destroy data from factors
      commit('destroyScenario', ID);
    },
    destroyDomain({ commit }, ID) {
      // TODO: Destroy factors
      commit('destroyDomain', ID);
    },
    destroyFactor({ commit }, ID) {
      commit('destroyFactor', ID);
    },
  },
  modules: {
  },
});
