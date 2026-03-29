const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/modules/auth/views/index.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/modules/auth/views/forgot-password.vue"),
  },
  {
    path: "/verify-code",
    name: "verify-code",
    component: () => import("@/modules/auth/views/verify-code.vue"),
  },

  {
    path: "/register",
    name: "register",
    component: () => import("@/modules/auth/components/register/index.vue"),
  },

  {
    path: "/reset-password/:token",
    name: "reset-password",
    component: () => import("@/modules/auth/views/reset-password.vue"),
  },
];

export default routes;
