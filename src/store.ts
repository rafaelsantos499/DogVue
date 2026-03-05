import { defineStore } from "pinia";
import { ref } from "vue";
import type { Usuario } from "./models/usuario";
import router from "./router";
import { api } from "./service";
import type { Login, CreaterUser } from "./models/Login";

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
    await api.post("api/user", payload);
  }

  async function logarUsuario(payload: Login) {
    const { data } = await api.login(payload);
    const token = "Bearer " + data.token;
    window.localStorage.setItem("token", token);
    await getUsuario();
    updateLogin(true);
    await router.push("/conta");
  }

  async function getUsuario(): Promise<Usuario> {
    const { data } = await api.get("/api/user");
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
