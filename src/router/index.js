import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Login from "@/views/LoginPage.vue";
import ErrorPage from "@/views/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/create-post",
      name: "create-post",
      component: () => import("../views/CreatePostPage.vue"),
    },
    {
      path: "/modify-post/:id",
      name: "modify-post",
      component: () => import("../views/ModifyPostPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: ErrorPage,
    },
  ],
});

export default router;
