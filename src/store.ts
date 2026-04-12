import { defineStore } from "pinia";
import { ref } from "vue";
import type { Usuario } from "./models/usuario";
import router from "./router";

import type { LoginPayload, RegisterPayload } from "./models/Login";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { authService } from "./service/authService";
import { tokenService } from "./service/tokenService";

export const useUserStore = defineStore("user", () => {
  const login = ref(false);
  const usuario = ref<Usuario>({
    uuid: "",
    name: "",
    email: "",
    google_id: null,
    email_verified_at: null,
    comment_timeout_until: null,
    created_at: "",
    updated_at: "",
  });

  function updateUsuario(payload: Partial<Usuario>) {
    usuario.value = { ...usuario.value, ...payload };
  }

  function updateLogin(value: boolean) {
    login.value = value;
  }

  // Registra usuário e já salva o token retornado (evita segunda chamada de login)
  async function criarUsuario(payload: RegisterPayload) {
    const { access_token, refresh_token, user } = await authService.register(payload);
    authService.saveToken(access_token, refresh_token);
    updateUsuario(user);
    updateLogin(true);
  }

  async function logarUsuario(payload: LoginPayload) {
    const { access_token, refresh_token, user } = await authService.login(payload);
    console.log('[store] login ok — token:', access_token?.substring(0, 20), '| user:', user?.name);
    authService.saveToken(access_token, refresh_token);
    console.log('[store] localStorage token após saveToken:', localStorage.getItem('token')?.substring(0, 30));
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

  // Limpa o estado local do usuário (usado internamente e pelo evento auth:logout)
  function _clearUserState() {
    updateLogin(false);
    updateUsuario({
      uuid: "",
      name: "",
      email: "",
      google_id: null,
      email_verified_at: null,
      comment_timeout_until: null,
      created_at: "",
      updated_at: "",
    });
  }

  async function deslogarUsuario() {
    try {
      await authService.logout(); // invalida token no servidor + limpa localStorage
    } catch {
      tokenService.clearTokens(); // fallback: servidor indisponível
    }
    _clearUserState();
    router.push({ name: "login" });
  }

  // Chamado quando o refresh token falha (evento disparado pelo apiService)
  function handleAuthExpired() {
    _clearUserState();
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
    handleAuthExpired,
  };
});
