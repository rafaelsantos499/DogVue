<template>
  <div>
    <Header />
    <RouterView></RouterView>
    <Footer />
  </div>
</template>
<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang=""></style>
