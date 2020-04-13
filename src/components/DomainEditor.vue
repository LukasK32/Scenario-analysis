<template>
    <div>
      <div class="buttons is-right">
        <button class="button is-success" @click="create">Dodaj</button>
      </div>

      <template v-for="ID in Object.keys(domains)">
        <Domain :key="`domain-${ID}`" :ID="ID" />
      </template>
    </div>
</template>

<script>
import Domain from './Domain.vue';

export default {
  components: {
    Domain,
  },
  computed: {
    domains() {
      return this.$store.state.domains;
    },
  },
  methods: {
    create() {
      this.$buefy.dialog.prompt({
        message: 'Podaj nazwę dla nowej sfery:',
        inputAttrs: {
          placeholder: 'np. Ekonomiczna',
          maxlength: 50,
        },
        cancelText: 'Anuluj',
        confirmText: 'Dodaj',
        trapFocus: true,
        onConfirm: this.store,
      });
    },
    store(name) {
      if (name === null || name === '') return;

      this.$store.commit('storeDomain', {
        name: name.trim(),
      });
    },
  },
};
</script>
