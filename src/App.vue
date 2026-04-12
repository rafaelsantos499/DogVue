<template>
  <div class="app-wrapper">
    <Loading v-if="!appReady" :modal="true" />
    <template v-else>
      <Header />
      <main style="padding-top: 4rem;">
        <RouterView />
      </main>
      <Footer />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/components/helper/Loading.vue";
import { tokenService } from "@/service/tokenService";
import { useUserStore } from "@/store";

const store = useUserStore();
const appReady = ref(false);

onMounted(async () => {
  if (tokenService.isAuthenticated()) {
    try {
      await store.getUsuario();
      store.updateLogin(true);
    } catch {
      // Token expirado e refresh falhou — estado já limpo pelo apiService
    }
  }
  appReady.value = true;

  window.addEventListener("auth:logout", handleAuthExpired);
});

onUnmounted(() => {
  window.removeEventListener("auth:logout", handleAuthExpired);
});

function handleAuthExpired() {
  store.handleAuthExpired();
}
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
