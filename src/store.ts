import { defineStore } from "pinia";
import { ref } from "vue";
import type { Usuario } from "./models/usuario";
import router from "./router";

import type { Login, CreaterUser } from "./models/Login";
import { apiService } from "./service/apiService";

export const useUserStore = defineStore("user", () => {
  const login = ref(false);
  const usuario = ref<Usuario>({
    id: 0,
    email: "",
    nome: "",
    username: "",
  });

  function updateUsuario(payload: Partial<Usuario>) {
    usuario.value = { ...usuario.value, ...payload };
  }

  function updateLogin(value: boolean) {
    login.value = value;
  }

  async function criarUsuario(payload: CreaterUser) {
    await apiService.post("api/user", payload);
  }

  async function logarUsuario(payload: Login) {
    const { data } = await apiService.login(payload);
    const token = "Bearer " + data.token;
    window.localStorage.setItem("token", token);
    await getUsuario();
    updateLogin(true);
    await router.push("/conta");
  }

  async function getUsuario(): Promise<Usuario> {
    const { data } = await apiService.get("/api/user");
    updateUsuario(data);
    return data;
  }

  function deslogarUsuario() {
    updateLogin(false);
    updateUsuario({
      id: 0,
      email: "",
      nome: "",
      username: "",
    });
    window.localStorage.removeItem("token");
    router.push({ name: "login" });
  }

  return {
    login,
    usuario,
    updateUsuario,
    updateLogin,
    criarUsuario,
    logarUsuario,
    getUsuario,
    deslogarUsuario,
  };
});
