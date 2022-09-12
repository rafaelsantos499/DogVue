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
<script lang="ts">
import { reactive, ref } from "vue";
import type { CreaterUser } from "@/models/Login";
import { useStore } from "vuex";
import router from "@/router";
import { useRouter } from "vue-router";

export default {
  name: "LoginCreater",
  setup() {
    const route = useRouter();
    const store = useStore();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const erros = ref("");
    const loadingCreaterUser = ref(true);
    const createrUserSuccess = ref(false);

    async function handleSubmit() {
      const dateUser: CreaterUser = {
        username: username.value,
        email: email.value,
        password: password.value,
      };

      const dateLogin = {
        username: username.value,
        password: password.value,
      };

      erros.value = "";

      try {
        loadingCreaterUser.value = await false;
        await store.dispatch("criarUsuario", dateUser);
        await store.dispatch("logarUsuario", dateLogin);
        createrUserSuccess.value = await true;
      } catch (err: any) {
        console.log(err.response.data.message);
        loadingCreaterUser.value = true;
        erros.value = err.response.data.message;
      }
    }

    return {
      handleSubmit,
      username,
      email,
      password,
      erros,
      loadingCreaterUser,
      createrUserSuccess,
    };
  },
};
</script>
<style lang=""></style>
