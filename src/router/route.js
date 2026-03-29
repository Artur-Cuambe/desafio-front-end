import auth from "@/middleware/auth";
import authRoutes from "@/modules/auth/router";
import userRoutes from "@/modules/users/router";
import roleRoutes from "@/modules/roles/router";
import customerRoutes from "@/modules/customer/router";
import orderRoutes from "@/modules/order/router";

const routes = [
  ...authRoutes,
  {
    path: "/app",
    name: "Layout",
    redirect: "/app/read-app",
    component: () => import("@/Layout/index.vue"),
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "read-app",
        name: "read-app",
        component: () => import("@/modules/home/index.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "chat",
        name: "chat",
        // component: () => import("@/modules/home/index.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "profile",
        name: "profile",
        // component: () => import("@/modules/home/index.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "notifications",
        name: "notifications",
        // component: () => import("@/modules/home/index.vue"),
        meta: {
          hide: true,
        },
      },

      // User Management Routes
      ...userRoutes,

      // Role Management Routes
      ...roleRoutes,

      // Customer Management Routes
      ...customerRoutes,

      // Order Management Routes
      ...orderRoutes,


    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/coming-soon",
    name: "coming-soon",
    component: () => import("@/views/utility/comming-soon"),
  },
  {
    path: "/under-construction",
    name: "under-construction",
    component: () => import("@/views/utility/under-construction"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/error.vue"),
  },
];

export default routes;
