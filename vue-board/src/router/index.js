import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostView from "../views/PostView.vue";
import ModifyView from "../views/ModifyView.vue";

// HomeView 에서 목록 컴포넌트 보여주고, PostView
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/post/:id",
      name: "PostView",
      component: PostView,
      props: true,
    },
    {
      path: "/modify/:id",
      name: "ModifyView",
      component: ModifyView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
