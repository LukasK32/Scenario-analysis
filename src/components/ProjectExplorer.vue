<template>
  <section class="section">
    <ProjectSaver />
    <ProjectNameField />
    <DomainExplorer />
  </section>
</template>

<script>
import ProjectNameField from './ProjectNameField.vue';
import ProjectSaver from './ProjectSaver.vue';
import DomainExplorer from './DomainExplorer.vue';

export default {
  components: {
    ProjectNameField,
    ProjectSaver,
    DomainExplorer,
  },
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
