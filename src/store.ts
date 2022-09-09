import { createStore } from "vuex";
import type { Usuario } from "./models/usuario";
import router from "./router";
import { api } from "./service";
import type { Login } from "./models/Login";

export interface state {
  login: boolean;
  usuario: Usuario;
}

const store = createStore<state>({
  strict: true,
  state: {
    login: false,
    usuario: <Usuario>{},
  },
  getters: {},
  mutations: {
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign({}, state.usuario, payload);
    },
    UPDATE_LOGIN(state: state, payload: boolean): boolean {
      return (state.login = payload);
    },
  },
  actions: {
    async logarUsuario(state, payload: Login) {
      const { data } = await api.login(payload);
      const token = (await "Bearer ") + data.token;
      await window.localStorage.setItem("token", token);
      const useData = await state.dispatch("getUsuario");
      await state.commit("UPDATE_USUARIO", useData);
      await state.dispatch("UPDATE_LOGIN", true);
      await router.push("/conta");

      return data;
    },
    async getUsuario(state): Promise<Usuario> {
      const { data } = await api.get("/api/user");
      await state.commit("UPDATE_USUARIO", data);

      return data;
    },
  },
});

export default store;
