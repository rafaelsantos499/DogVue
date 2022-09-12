<template>
  <header>
    <h1 class="title">{{ titlePage }}</h1>

    <nav class="container nav">
      <router-link :to="{ name: 'Conta' }"
        ><img src="../../assets/feed.svg" alt="" />
        <p v-if="mobile">Minha Fotos</p></router-link
      >
      <router-link :to="{ name: 'UserStats' }"
        ><img src="../../assets/estatisticas.svg" alt="" />
        <p v-if="mobile">Estatísticas</p></router-link
      >
      <router-link :to="{ name: 'UserPhotoPost' }"
        ><img src="../../assets/adicionar.svg" alt="" />
        <p v-if="mobile">Adicionar Foto</p></router-link
      >
      <button @click="deslogarUsuario">
        <img src="../../assets/sair.svg" alt="" />
        <p v-if="mobile">sair</p>
      </button>
    </nav>
  </header>
</template>
<script lang="ts">
import { useStore } from "vuex";
import SvgStats from "@/assets/estatisticas.svg";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from "vue-router";
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";

export default {
  name: "UserHeader",

  setup() {
    const store = useStore();
    const router = useRouter();
    const mobile = false;
    const titlePage = ref("");

    const deslogarUsuario = () => store.dispatch("deslogarUsuario");

    const MudarTituloPelaRota = (teste: any) => {
      const routeAtual = teste;

      if (teste === "Conta") {
        titlePage.value = "Minhas Fotos";
      } else if (teste == "UserStats") {
        titlePage.value = "Estatísticas";
      } else if (teste === "UserPhotoPost") {
        titlePage.value = "Criar Post";
      }
    };

    if (titlePage.value === "") {
      MudarTituloPelaRota(router.currentRoute.value.name);
    }

    // MudarTituloPelaRota();
    router.beforeEach((to) => {
      MudarTituloPelaRota(to.name);
    });

    return {
      deslogarUsuario,
      mobile,
      titlePage,
    };
  },
};
</script>
<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.nav a,
.nav button {
  width: 40px;
  height: 40px;
  background-color: #eee;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition: 0.1s;
}

.nav a:hover,
.nav a:focus,
.nav button:hover,
.nav button:focus {
  background-color: white;
  box-shadow: 0 0 0 3px #eee;
}

.nav a.router-link-exact-active {
  background: white;
  box-shadow: 0 0 3px #fea;
  border-color: #fb1;
}
</style>
