<template>
  <v-text-field v-model="name" label="Nazwa" required />
</template>

<script>
import throttle from 'lodash/throttle';

export default {
  computed: {
    name: {
      get() {
        return this.$store.state.project.name;
      },
      // This is probably a little overkill but I wanted to check if it
      // works this way ;)
      set: throttle(function setProjectName(value) {
        this.$store.commit('updateProjectName', value);
        console.log('Yup!');
      }, 250),
    },
  },
};
</script>
