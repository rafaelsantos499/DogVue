<template lang="">
  <section class="animeLeft">
    <h1 class="title">Cadastre-se</h1>
    <form>
      <label for="username">Usuario</label>
      <input type="text" id="username" name="username" v-model="username" />
      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="email" />
      <label for="password">Senha</label>
      <input type="password" id="password" name="password" v-model="password" />
      <p class="text-danger">{{ erros }}</p>
      <p v-if="createrUserSuccess" class="text-success">
        Sua conta foi Criada com sucesso
      </p>
      <button
        v-if="loadingCreaterUser"
        class="h6 mt-4 border-0 text-dark rounded-1 bg-warning text-primary py-2 px-4"
        style="min-width: 8rem"
        @click.prevent="handleSubmit"
      >
        Cadastrar
      </button>
      <button
        v-else
        class="h6 mt-4 border-0 text-dark rounded-1 bg-warning text-primary py-2 px-4"
        style="min-width: 8rem"
        @click.prevent="handleSubmit"
        disabled
      >
        Cadastrando...
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store";

const store = useUserStore();
const username = ref("");
const email = ref("");
const password = ref("");
const erros = ref("");
const loadingCreaterUser = ref(true);
const createrUserSuccess = ref(false);

async function handleSubmit() {
  erros.value = "";
  try {
    loadingCreaterUser.value = false;
    await store.criarUsuario({
      name: username.value,
      email: email.value,
      password: password.value,
    });
    await store.logarUsuario({
      email: email.value,
      password: password.value,
    });
    createrUserSuccess.value = true;
  } catch (err: any) {
    loadingCreaterUser.value = true;
    erros.value = err.response?.data?.message ?? 'Erro ao criar conta.';
  }
}
</script>
<style lang=""></style>
