<template>
  <v-content>
    <v-container class="main-container">
      <v-row>
        <ProjectNameField />
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import ProjectNameField from './ProjectNameField.vue';

export default {
  components: {
    ProjectNameField,
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
