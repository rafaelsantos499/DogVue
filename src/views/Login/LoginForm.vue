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
import { reactive, ref, type Ref } from "vue";
import { api } from "../../service";
import ErrorNotificacao from "../../components/error/ErrorNotificacao.vue";
import type { Login } from "../../models/Login";
import { useStore } from "vuex";

export default {
  name: "LoginForm",
  components: { ErrorNotificacao },
  setup() {
    const store = useStore();
    const username: Ref<string> = ref("");
    const password: Ref<string> = ref("");
    const erros: Ref<any> = ref([]);
    const buttonLoading = ref(false);

    async function handleSubmit() {
      const dateLogin: Login = await reactive({
        username: username.value,
        password: password.value,
      });

      try {
        buttonLoading.value = true;
        await store.dispatch("logarUsuario", dateLogin);
        const dataUser = await store.dispatch("getUsuario");
        await store.dispatch("UPDATE_USUARIO", dataUser);
        await store.commit("UPDATE_LOGIN", true);

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
      erros,
      buttonLoading,
    };
  },
};
</script>
<style lang=""></style>
