const routes = [
  {
    path: "list-order",
    name: "list-order",
    component: () => import("@/modules/order/views/index.vue"),
    meta: {
      hide: true,
    },
  },
];

export default routes;
