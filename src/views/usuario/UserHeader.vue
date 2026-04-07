<template>
  <header>
    <h1 class="title">{{ titlePage }}</h1>

    <nav class="nav">
      <router-link :to="{ name: 'Conta' }">
        <img src="../../assets/feed.svg" alt="Minhas Fotos" />
        <p>Minha Fotos</p>
      </router-link>
      <router-link :to="{ name: 'UserStats' }">
        <img src="../../assets/estatisticas.svg" alt="Estatísticas" />
        <p>Estatísticas</p>
      </router-link>
      <router-link :to="{ name: 'UserPhotoPost' }">
        <img src="../../assets/adicionar.svg" alt="Adicionar Foto" />
        <p>Adicionar Foto</p>
      </router-link>
      <button @click="deslogarUsuario">
        <img src="../../assets/sair.svg" alt="Sair" />
        <p>Sair</p>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";

const store = useUserStore();
const router = useRouter();
const titlePage = ref("");

const deslogarUsuario = () => store.deslogarUsuario();

function mudarTituloPelaRota(routeName: string | symbol | null | undefined) {
  if (routeName === "Conta") {
    titlePage.value = "Minhas Fotos";
  } else if (routeName === "UserStats") {
    titlePage.value = "Estatísticas";
  } else if (routeName === "UserPhotoPost") {
    titlePage.value = "Criar Post";
  }
}

mudarTituloPelaRota(router.currentRoute.value.name);

router.beforeEach((to) => {
  mudarTituloPelaRota(to.name);
});
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  position: relative;
}

.nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
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
  cursor: pointer;
  overflow: hidden;
}

.nav p {
  display: none;
}

.nav a:hover,
.nav a:focus,
.nav button:hover,
.nav button:focus {
  background-color: white;
  box-shadow: 0 0 0 3px #eee;
  border-color: #333;
  outline: none;
}

.nav a.router-link-exact-active {
  background: white;
  box-shadow: 0 0 0 3px #fea;
  border-color: #fb1;
}

.nav a.router-link-exact-active img {
  filter: invert(70%) sepia(100%) saturate(500%) hue-rotate(5deg);
}
</style>
