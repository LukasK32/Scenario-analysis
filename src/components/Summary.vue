<template>
  <div>
    <div class="content" v-for="(table, n) in tables" :key="`table-${n}`">
      <h4 class="title is-4">{{ table.name }}</h4>
      <table class="table is-bordered is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Sfera</th>
            <th>Czynnik</th>
            <th>Kierunek zmiany</th>
            <th>Wpływ</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(factors, domain) in table.domains">

            <tr v-for="(factor, m) in factors" :key="`table-${n}-${domain}-${m}`">
              <th v-if="m == 0" :rowspan="factors.length">{{ domain }}</th>
              <td>{{ factor.name }}</td>
              <td>
                <template v-if="factor.change < 0">
                  <span class="material-icons">trending_down</span>
                  <br>
                  Spadek
                </template>
                <template v-if="factor.change == 0">
                  <span class="material-icons">trending_flat</span>
                  <br>
                  Stabilizacja
                </template>
                <template v-if="factor.change > 0">
                  <span class="material-icons">trending_up</span>
                  <br>
                  Wzrost
                </template>
              </td>
              <td class="influence" :class="{'red': factor.influence < 0, 'green': factor.influence > 0}">
                {{ factor.influence }}
              </td>
            </tr>

          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tables() {
      const tables = [];
      const { scenarios, domains, factors } = this.$store.state;

      Object.keys(scenarios).forEach((scenarioID) => {
        const table = {
          name: `Scenariusz: ${scenarios[scenarioID].name}`,
          domains: {},
        };

        Object.keys(domains).forEach((domainID) => {
          const f = Object.keys(factors)
            .map((ID) => factors[ID])
            .filter((factor) => factor.domain === domainID)
            .map((factor) => ({
              name: factor.name,
              change: factor.effect[scenarioID].change,
              influence: factor.effect[scenarioID].influence,
            }));

          Object.assign(table.domains, {
            [domains[domainID].name]: f,
          });
        });

        // ...

        tables.push(table);
      });

      return tables;
    },
  },
};
</script>

<style lang="scss" scoped>
table.table {
  td, th {
    text-align: center;
    vertical-align: middle;
    padding: 0.5em 0.5em;

    .material-icons {
      vertical-align: bottom;
    }

    &.influence {
      font-weight: bold;
      font-size: 1.3em;
    }

    &.red {
      color: #F44336;
    }

    &.green {
      color: #4CAF50;
    }
  }
}
</style>
