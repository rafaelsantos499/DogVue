<template lang="">
  <div>
    <h1>Login</h1>

    <form action="">
      <input type="text" v-model="username" />

      <input type="password" v-model="password" />
      <ErrorNotificacao :erros="erros" />
      <button
        v-if="!buttonLoading"
        type="submit"
        class="h6 border-0 rounded-1 bg-warning text-primary py-2 px-4"
        style="min-width: 8rem"
        @click.prevent="handleSubmit"
      >
        Entrar
      </button>
      <button
        v-else
        type="submit"
        class="h6 border-0 rounded-1 bg-warning text-primary py-2 px-4"
        style="min-width: 8rem"
        @click.prevent="handleSubmit"
        disabled
      >
        Carregando
      </button>
    </form>
    <router-link :to="{ name: 'LoginCreater' }">Cadastro</router-link>
  </div>
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
        const user = await store.dispatch("getUsuario");
        await store.commit("UPDATE_USUARIO", user.data);
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
