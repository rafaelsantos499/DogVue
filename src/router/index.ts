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
      ],
    },
  ],
});

export default router;
