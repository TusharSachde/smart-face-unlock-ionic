<template>
  <v-ons-navigator :page-stack="pageStack">
    <component :is="page" v-for="page in pageStack" :page-stack="pageStack"></component>
  </v-ons-navigator>
</template>

<script>
import shareAccess from "./shareAccess";

export default {
  data() {
    return {
      pageStack: [shareAccess]
    };
  }
};
</script>
