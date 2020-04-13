<template>
  <div class="container" style="margin-bottom: 1em;">
    <b-field label="Nazwa projektu">
      <b-input v-model="name" label="Nazwa" />
    </b-field>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';

export default {
  computed: {
    name: {
      get() {
        return this.$store.state.name;
      },
      // This is probably a little overkill but I wanted to check if it
      // works this way ;)
      set: throttle(function setProjectName(value) {
        this.$store.commit('updateProjectName', value);
      }, 250),
    },
  },
};
</script>
