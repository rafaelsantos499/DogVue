<template lang="">
  <section class="animeLeft">
    <h1 class="title">Login</h1>

    <form action="" class="mb-4">
      <label for="username">Usuário</label>
      <input type="text" id="username" v-model="username" name="username" />
      <label for="password">Senha</label>
      <input type="password" id="password" v-model="password" name="password" />
      <ErrorNotificacao :erros="erros" />
      <button
        v-if="!buttonLoading"
        type="submit"
        class="h6 text-dark border-0 rounded-1 bg-warning text-primary py-2 px-4"
        style="min-width: 8rem"
        @click.prevent="handleSubmit"
      >
        Entrar
      </button>
      <button
        v-else
        type="submit"
        class="h6 border-0 text-dark rounded-1 bg-warning text-primary py-2 px-4"
        style="min-width: 8rem"
        @click.prevent="handleSubmit"
        disabled
      >
        Carregando
      </button>
    </form>
    <button
      class="btn-google d-flex align-items-center justify-content-center gap-2 border-0 rounded-1 py-2 px-4 w-100 mb-4"
      @click="handleGoogleLogin"
      :disabled="googleLoading"
    >
      <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.08 24.08 0 0 0 0 21.56l7.98-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      <span>{{ googleLoading ? 'Conectando...' : 'Entrar com Google' }}</span>
    </button>
    <router-link class="text-secondary p-2" :to="{ name: 'LoginPasswordLost' }"
      >Perdeu a senha?</router-link
    >
    <div class="mt-5">
      <h2 class="mb-3 h1" style="font-family: var(--type-second)">
        Cadastre-se
      </h2>
      <p class="h5">Ainda não possui conta? Cadastre-se no site.</p>
      <router-link :to="{ name: 'LoginCreater' }"
        ><button
          class="h6 mt-4 border-0 text-dark rounded-1 bg-warning text-primary py-2 px-4"
          style="min-width: 8rem"
        >
          Cadastre-se
        </button></router-link
      >
    </div>
  </section>
</template>
<script lang="ts">
import { ref } from "vue";
import ErrorNotificacao from "../../components/error/ErrorNotificacao.vue";
import type { Login } from "../../models/Login";
import { useUserStore } from "@/store";

export default {
  name: "LoginForm",
  components: { ErrorNotificacao },
  setup() {
    const store = useUserStore();
    const username = ref("");
    const password = ref("");
    const erros = ref<string[]>([]);
    const buttonLoading = ref(false);
    const googleLoading = ref(false);

    async function handleGoogleLogin() {
      try {
        googleLoading.value = true;
        await store.loginComGoogle();
      } catch (err: any) {
        erros.value.push(err.message || 'Erro ao conectar com Google');
      } finally {
        googleLoading.value = false;
      }
    }

    async function handleSubmit() {
      const dateLogin: Login = {
        email: username.value,
        password: password.value,
      };

      try {
        buttonLoading.value = true;
        await store.logarUsuario(dateLogin);
        buttonLoading.value = false;
      } catch (err: any) {
        erros.value.push(err.response.data.message);
        buttonLoading.value = false;
      }
    }

    return {
      username,
      password,
      handleSubmit,
      handleGoogleLogin,
      erros,
      buttonLoading,
      googleLoading,
    };
  },
};
</script>
<style scoped>
.btn-google {
  background: #fff;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #ddd !important;
  transition: box-shadow 0.2s;
}
.btn-google:hover {
  box-shadow: 0 0 0 3px #fea, 0 0 0 4px #fb1;
}
</style>
