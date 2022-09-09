import { createStore } from "vuex";
import type { usuario } from "./models/usuario";
import router from "./router";
import { api } from "./service";

export interface state {
  login: boolean;
  usuario: usuario;
}

const store = createStore<state>({
  strict: true,
  state: {
    login: false,
    usuario: <usuario>{},
  },
  getters: {},
  mutations: {
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign({}, state.usuario, payload);
    },
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
  },
  actions: {
    async logarUsuario(contex, payload) {
      const response = await api.login(payload);
      const token = (await "Bearer ") + response.data.token;
      await window.localStorage.setItem("token", token);
      router.push("/conta");
      return response;
    },
    async getUsuario(state) {
      const response = await api.get("/api/user");
      await state.commit("UPDATE_USUARIO", response.data);
      console.log(response);

      return response;
    },
  },
});

export default store;
