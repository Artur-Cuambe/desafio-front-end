const routes = [
  {
    path: "list-roles",
    name: "list-roles",
    component: () => import("@/modules/roles/views/index.vue"),
    meta: {
      hide: true,
    },
  },
];

export default routes;
