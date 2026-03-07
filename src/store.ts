import { defineStore } from "pinia";
import { ref } from "vue";
import type { Usuario } from "./models/usuario";
import router from "./router";

import type { Login, CreaterUser } from "./models/Login";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { authService } from "./service/authService";

export const useUserStore = defineStore("user", () => {
  const login = ref(false);
  const usuario = ref<Usuario>({
    id: 0,
    email: "",
    name: "",
    created_at: "",
    email_verified_at: "",
    google_id: null,
    updated_at: "",
  });

  function updateUsuario(payload: Partial<Usuario>) {
    usuario.value = { ...usuario.value, ...payload };
  }

  function updateLogin(value: boolean) {
    login.value = value;
  }

  async function criarUsuario(payload: CreaterUser) {
    await authService.register(payload);
  }

  async function logarUsuario(payload: Login) {
    const { token, user } = await authService.login(payload);
    authService.saveToken(token);
    updateUsuario(user);
    updateLogin(true);
    await router.push("/conta");
  }

  async function getUsuario(): Promise<Usuario> {
    const { token, user } = await authService.validate();
    updateUsuario(user);
    return user;
  }

  async function loginComGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseToken = await result.user.getIdToken();
    const { token, user } = await authService.loginGoogle(firebaseToken);
    authService.saveToken(token);
    updateUsuario(user);
    updateLogin(true);
    await router.push("/conta");
  }

  function deslogarUsuario() {
    updateLogin(false);
    updateUsuario({
      id: 0,
      email: "",
      name: "",
      created_at: "",
      email_verified_at: "",
      google_id: null,
      updated_at: "",
    });
    authService.removeToken();
    router.push({ name: "login" });
  }

  return {
    login,
    usuario,
    updateUsuario,
    updateLogin,
    criarUsuario,
    logarUsuario,
    loginComGoogle,
    getUsuario,
    deslogarUsuario,
  };
});
