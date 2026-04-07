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
      <p class="text-red-600">{{ erros }}</p>
      <p v-if="createrUserSuccess" class="text-green-600">
        Sua conta foi Criada com sucesso
      </p>
      <button
        v-if="loadingCreaterUser"
        class="text-base mt-6 border-none text-gray-900 rounded bg-amber-400 py-2 px-6"
        style="min-width: 8rem"
        @click.prevent="handleSubmit"
      >
        Cadastrar
      </button>
      <button
        v-else
        class="text-base mt-6 border-none text-gray-900 rounded bg-amber-400 py-2 px-6"
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
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";

const store = useUserStore();
const router = useRouter();
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
    // criarUsuario já salva o token e define login=true internamente
    await store.criarUsuario({
      name: username.value,
      email: email.value,
      password: password.value,
    });
    createrUserSuccess.value = true;
    // Pequeno delay para o usuário ver a mensagem de sucesso
    setTimeout(() => router.push("/conta"), 1000);
  } catch (err: any) {
    loadingCreaterUser.value = true;
    erros.value = err.response?.data?.message ?? 'Erro ao criar conta.';
  }
}
</script>
<style lang=""></style>
