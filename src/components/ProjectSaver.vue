<template>
  <v-btn color="secondary" @click="saveProject">Zapisz</v-btn>
</template>

<script>
const slugify = require('slugify');

export default {
  methods: {
    saveProject() {
      const project = { ...this.$store.state.project };
      const parsedProject = JSON.stringify(project);

      const file = new Blob([parsedProject], {
        type: 'application/json',
      });

      const a = document.createElement('a');

      a.href = URL.createObjectURL(file);
      a.download = `${slugify(project.name, { lower: true, strict: true })}.json`;
      a.click();

      a.remove();
    },
  },
};
</script>
