<template>
  <section class="section">
    <ProjectSaver />
    <ProjectNameField />

    <section class="container">
      <b-tabs type="is-boxed" v-model="activeTab" :animated="false">
        <b-tab-item label="Scenariusze">
          <ScenarioEditor />
        </b-tab-item>
        <b-tab-item label="Sfery">
          <DomainEditor />
        </b-tab-item>
        <b-tab-item label="Czynniki">
          <FactorEditor />
        </b-tab-item>
        <b-tab-item label="Podsumowanie">
          <Summary />
        </b-tab-item>
      </b-tabs>
    </section>
  </section>
</template>

<script>
import ProjectNameField from './ProjectNameField.vue';
import ProjectSaver from './ProjectSaver.vue';
import ScenarioEditor from './ScenarioEditor.vue';
import DomainEditor from './DomainEditor.vue';
import FactorEditor from './FactorEditor.vue';
import Summary from './Summary.vue';

export default {
  components: {
    ProjectNameField,
    ProjectSaver,
    ScenarioEditor,
    DomainEditor,
    FactorEditor,
    Summary,
  },
  data: () => ({
    activeTab: 0,
  }),
};
</script>

<style lang="scss">
.main-container {
  display: block;
  padding-left: 20px !important;
  padding-right: 20px !important;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
