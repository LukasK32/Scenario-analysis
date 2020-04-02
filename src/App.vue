<template>
  <v-app>
    <v-app-bar app clipped-left color="primary">

      <v-toolbar-title>Metoda scenariuszowa</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="darkMode = !darkMode">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>

      <v-btn icon @click="infoDialog = true">
        <v-icon>mdi-information-outline </v-icon>
      </v-btn>

    </v-app-bar>

    <v-dialog v-model="infoDialog" width="500">
      <v-card>
        <v-card-title
          class="headline primary"
          primary-title
        >
          Informacje
        </v-card-title>

        <v-card-text style="padding: 10px 15px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="infoDialog = false"
          >
            Ok!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    infoDialog: false,
    darkMode: false,
  }),
  watch: {
    darkMode() {
      this.$vuetify.theme.dark = this.darkMode;
    },
  },
};
</script>

<style lang="scss">
html,
body {
  overflow-y: auto !important;
}

.v-app-bar .v-tab.v-tab--active {
  color: rgba(0, 0, 0, 0.87);

  .theme--dark & {
    color: #fff;
  }
}
</style>
