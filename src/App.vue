<template>
  <div class="app-wrapper">
    <Header />
    <main style="padding-top: 4rem;">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-wrapper main {
  flex: 1;
}
</style>
