import { defineStore } from "pinia";
import { ref } from "vue";
import type { Usuario } from "./models/usuario";
import router from "./router";

import type { LoginPayload, RegisterPayload } from "./models/Login";
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

  async function criarUsuario(payload: RegisterPayload) {
    await authService.register(payload);
  }

  async function logarUsuario(payload: LoginPayload) {
    const { access_token, refresh_token, user } = await authService.login(payload);
    authService.saveToken(access_token, refresh_token);
    updateUsuario(user);
    updateLogin(true);
    await router.push("/conta");
  }

  async function getUsuario(): Promise<Usuario> {
    const user = await authService.me();
    updateUsuario(user);
    return user;
  }

  async function loginComGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseToken = await result.user.getIdToken();
    const { access_token, refresh_token, user } = await authService.loginWithFirebase(firebaseToken);
    authService.saveToken(access_token, refresh_token);
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
