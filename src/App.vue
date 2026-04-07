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
import { onMounted, onUnmounted } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { tokenService } from "@/service/tokenService";
import { useUserStore } from "@/store";

const store = useUserStore();

// Restaura sessão silenciosamente ao dar F5 em qualquer página
onMounted(async () => {
  if (tokenService.isAuthenticated()) {
    try {
      await store.getUsuario();
      store.updateLogin(true);
    } catch {
      // Token expirado e refresh falhou — estado já limpo pelo apiService
    }
  }

  // Escuta o evento disparado pelo apiService quando o refresh token expira
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
