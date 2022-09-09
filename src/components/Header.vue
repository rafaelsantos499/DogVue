<template>
  <header class="shadow-sm bg-white position-fidex w-100">
    <nav
      class="container d-flex justify-content-between align-items-center"
      style="height: 4rem"
    >
      <router-link to="/" class="p-1">
        <svg
          width="28"
          height="22"
          viewBox="0 0 28 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 10h1.652c1.708 0 2.63 2.004 1.518 3.302l-1.618 1.887A4.501 4.501 0 0024.5 14.5a1.5 1.5 0 013 0A7.5 7.5 0 0114 19 7.5 7.5 0 01.5 14.5a1.5 1.5 0 013 0 4.5 4.5 0 008.948.689l-1.618-1.887C9.718 12.004 10.64 10 12.35 10H14z"
            fill="#333"
          />
          <circle cx="21" cy="3" r="3" fill="#333" />
          <circle cx="7" cy="3" r="3" fill="#333" />
        </svg>
      </router-link>

      <router-link
        v-if="!login"
        :to="{ name: 'login' }"
        class="login text-secondary"
        >login / Criar</router-link
      >
      <router-link v-else to="/conta">
        <button
          type="submit"
          class="h6 border-0 rounded-1 bg-warning text-primary py-2 px-4"
          style="min-width: 8rem"
        >
          {{ user }}
        </button></router-link
      >
    </nav>
  </header>
</template>
<script lang="ts">
import { onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const user: Ref<string> = ref("");
    const login: Ref<boolean> = ref(false);

    watch(
      () => store.state.login,
      () => {
        user.value = store.state.usuario.username;
        user.value = user.value[0].toUpperCase() + user.value.substring(1);
        login.value = store.state.login;
      }
    );

    return {
      user,
      login,
    };
  },
};
</script>
<style scoped>
.login::after {
  content: "";
  display: inline-block;
  width: 14px;
  height: 17px;
  background: url(../assets/usuario.svg) no-repeat center center;
  margin-left: 0.5rem;
  top: -1px;
}
</style>
