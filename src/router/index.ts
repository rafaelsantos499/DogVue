import { useUserStore } from "@/store";
import { tokenService } from "@/service/tokenService";
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
          path: "entrar",
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
      meta: {
        login: true,
      },
      children: [
        {
          path: "criarpost",
          name: "UserPhotoPost",
          component: () => import("@/views/usuario/UserPhotoPost.vue"),
          meta: {
            login: true,
          },
        },
        {
          path: "estatisticas",
          name: "UserStats",
          component: () => import("@/views/usuario/UserStats.vue"),
          meta: {
            login: true,
          },
        },
      ],
    },
    {
      path: "/feed/photo/:id",
      name: "photo",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFound",
      component: () => import("@/components/error/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.matched.some((record) => record.meta.login)) {
    const store = useUserStore();
    if (!store.login) {
      if (!tokenService.isAuthenticated()) {
        return { name: "login" };
      }
      try {
        await store.getUsuario();
        store.updateLogin(true);
      } catch {
        tokenService.clearTokens();
        return { name: "login" };
      }
    }
  }
});

export default router;
