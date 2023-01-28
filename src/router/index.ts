import { createRouter, createWebHistory } from "vue-router";
import Events from "../views/Events.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "events",
      component: Events,
    },
    {
      path: "/event/:id",
      name: "event-detail",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/EventDetail.vue"),
    },
    {
      path: "/seat-plans/:eventId/:categoryId",
      name: "seat-plans",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SeatPlan.vue"),
    },
    {
      path: "/pricing",
      name: "pricing",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Pricing.vue"),
    },
  ],
});

export default router;
