<template>
  <section class="container">
    <UserHeader />

    <router-view></router-view>
  </section>
</template>
<script lang="ts">
import UserHeader from "@/views/usuario/UserHeader.vue";
export default {
  name: "Conta",
  components: {
    UserHeader,
  },

  setup() {},
};
</script>
<style lang=""></style>
