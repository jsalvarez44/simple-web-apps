<template>
  <div>
    <v-container>
      <h1>TABLA DE DATOS</h1>
      <v-data-table :headers="headers" :items="universities"> </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  data() {
    return {
      headers: [
        {
          text: "NOMBRE",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "PAÍS", value: "country" },
        { text: "DOMINIO", value: "domains" },
        { text: "PÁGINA WEB", value: "web_pages" },
      ],
      universities: [],
    };
  },
  beforeMount() {
    this.getUniversities();
  },
  methods: {
    async getUniversities() {
      const res = await fetch(
        "http://universities.hipolabs.com/search?country=Ecuador"
      );
      const data = await res.json();
      this.universities = data;
    },
  },
};
</script>
