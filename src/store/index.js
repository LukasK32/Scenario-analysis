import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const cleanProject = {
  name: 'Bez tytułu',
  domains: [
    {
      name: 'Ekonomiczna',
      factors: [
        {
          name: 'poziom PKB per capita',
          influence: 3,
        },
      ],
    },
  ],
};

export default new Vuex.Store({
  state: {
    project: null,
  },
  mutations: {
    overwriteProject(state, project = cleanProject) {
      state.project = project;
    },
    updateProjectName(state, name) {
      // trim() results in weird behaviour in v-text-field
      // state.project.name = name.trim();

      state.project.name = name;
    },
    addDomain(state, name) {
      state.project.domains.push({
        name,
      });
    },
    editDomain(state, { oldName, newName }) {
      state.project.domains = state.project.domains.map(
        (domain) => ({
          ...domain,
          name: domain.name === oldName ? newName.trim() : domain.name,
        }),
      );
    },
    removeDomain(state, name) {
      state.project.domains = state.project.domains.filter((domain) => domain.name !== name);
    },
  },
  actions: {
    async createProject({ commit }) {
      await commit('overwriteProject');
    },
    async addDomain({ commit, state }, newDomainName) {
      if (state.project.domains.filter(
        ({ name }) => name.toLowerCase() === newDomainName.toLowerCase(),
      ).length > 0) {
        throw new Error('Nazwy sfer muszą być unikalne!');
      }

      await commit('addDomain', newDomainName);
    },
    async editDomain({ commit, state }, { oldName, newName }) {
      if (state.project.domains.filter(
        ({ name }) => name.toLowerCase() === newName.toLowerCase(),
      ).length > 0) {
        throw new Error('Nazwy sfer muszą być unikalne!');
      }

      await commit('editDomain', {
        oldName,
        newName,
      });
    },
  },
  modules: {
  },
});
