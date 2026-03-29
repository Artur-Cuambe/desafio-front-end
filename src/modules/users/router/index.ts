const routes = [
  {
    path: "list-users",
    name: "list-users",
    component: () => import("@/modules/users/views/index.vue"),
    meta: {
      hide: true,
    },
  },
];

export default routes;
