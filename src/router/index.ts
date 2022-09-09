import { api } from "@/service";
import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/Login/Login.vue"),
      children: [
        {
          path: "loginForm",
          name: "login",
          component: () => import("@/views/Login/LoginForm.vue"),
        },
        {
          path: "cadastro",
          name: "LoginCreater",
          component: () => import("@/views/Login/LoginCreater.vue"),
        },
        {
          path: "perdeu",
          name: "LoginPasswordLost",
          component: () => import("@/views/Login/LoginPasswordLost.vue"),
        },
      ],
    },
    {
      path: "/conta",
      name: "Conta",
      component: () => import("@/views/usuario/Conta.vue"),
    },
  ],
});

router.beforeEach(async () => {
  if (window.localStorage.token) {
    try {
      await api.validate();
      await store.dispatch("getUsuario");
      store.commit("UPDATE_LOGIN", true);
    } catch (err) {
      window.localStorage.removeItem("token");
      store.commit("UPDATE_LOGIN", false);
    }
  }
});

export default router;
