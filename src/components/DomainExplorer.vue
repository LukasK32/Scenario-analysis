<template>
  <v-container>
    <v-row justify="end" class="mb-4">
      <v-btn color="primary" class="mr-2" @click="addDomain">Dodaj sferę</v-btn>
    </v-row>

    <v-card
      class="mx-auto"
      :elevation="3"
      v-for="domain in domains"
      :key="domain.name"
      style="margin-bottom: 1em;"
    >
      <v-container style="padding: 1em 2em;">
        <v-row justify="space-between">

          <v-col cols="auto" class="pl-0">
            <h2>{{ domain.name }}</h2>
          </v-col>

          <v-col cols="auto" class="pl-0">
            <v-btn color="secondary" class="mr-2" @click="editDomain(domain.name)">Edytuj</v-btn>
            <v-btn color="error" @click="removeDomain(domain.name)">Usuń</v-btn>
          </v-col>

        </v-row>
        <v-row>
          <v-container>
            <v-card
              class="mx-auto"
              :elevation="3"
              v-for="factor in domain.factors"
              :key="`${domain.name}:${factor.name}`"
              style="margin-bottom: 0.5em;"
            >

              <v-container style="padding: 0.25em 2em;">
                <v-row justify="space-between">
                  <v-col cols="auto" class="pl-0">
                    <h4>{{ factor.name }}</h4>
                  </v-col>
                  <v-col cols="auto" class="pl-0">
                    <h4>{{ factor.influence }}</h4>
                  </v-col>
                  <v-col cols="auto" class="pl-0">
                    <v-btn color="secondary" class="mr-2" @click="editDomain(domain.name)">
                      Edytuj
                    </v-btn>
                    <v-btn color="error" @click="removeDomain(domain.name)">Usuń</v-btn>
                  </v-col>
                </v-row>
              </v-container>

            </v-card>
          </v-container>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    domains() {
      return this.$store.state.project.domains;
    },
  },
  methods: {
    async addDomain() {
      const name = prompt('Podaj nazwę dla nowej sfery:');

      if (name === null) return;

      try {
        await this.$store.dispatch('addDomain', name.trim());
      } catch (e) {
        this.$emit('failed', e.message);
      }
    },
    async editDomain(oldName) {
      const newName = prompt(`Podaj nową nazwę dla sfery '${oldName}':`, oldName);

      if (newName === null || oldName === newName) return;

      try {
        await this.$store.dispatch('editDomain', {
          oldName,
          newName,
        });
      } catch (e) {
        this.$emit('failed', e.message);
      }
    },
    async removeDomain(name) {
      if (!window.confirm(`Czy napewno chcesz usunąć sferę '${name}'?`)) return;

      await this.$store.commit('removeDomain', name);
    },
  },
};
</script>
