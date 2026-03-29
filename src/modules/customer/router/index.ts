const routes = [
  {
    path: "list-customer",
    name: "list-customer",
    component: () => import("@/modules/customer/views/index.vue"),
    meta: {
      hide: true,
    },
  },
];

export default routes;
