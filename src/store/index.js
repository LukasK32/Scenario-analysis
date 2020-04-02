import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const cleanProject = {
  name: 'Bez tytułu',
};

export default new Vuex.Store({
  state: {
    project: null,
  },
  mutations: {
    overwriteProject(state, project = cleanProject) {
      state.project = project;
    },
  },
  actions: {
    async createProject() {
      await this.commit('overwriteProject');
    },
    async loadProject() {
      throw new Error('Nie udało się odczytać pliku!');
    },
  },
  modules: {
  },
});
