<template>
  <v-ons-page>
    <custom-toolbar>Smart Doors</custom-toolbar>
    <p style="text-align: center">
      This is the first page
      <v-ons-button modifier="large" style="margin: 6px 0">Unlock Door</v-ons-button>
      <v-ons-button modifier="large" style="margin: 6px 0">Share Access</v-ons-button>
    </p>
  </v-ons-page>
</template>

<script>
import customToolbar from "./CustomToolbar";
export default {
  methods: {},
  components: { customToolbar }
};
</script>
