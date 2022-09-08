<template lang="">
  <div>
    <h1>Login</h1>
    <form action="">
      <input type="text" v-model="username" @change="handleSubmit($event)" />
      <input type="password" v-model="password" />
      <button type="submit" @click.prevent="handleSubmit">Entrar</button>
    </form>
    <router-link :to="{ name: 'LoginCreater' }">Cadastro</router-link>
  </div>
</template>
<script lang="ts">
import { ref, type Ref } from "vue";

export default {
  name: "LoginForm",
  setup() {
    const username: Ref<string> = ref("");
    const password: Ref<string> = ref("");

    function handleSubmit(event): void {
      console.log("teste");
    }

    return {
      username,
      password,
      handleSubmit,
    };
  },
};
</script>
<style lang=""></style>
