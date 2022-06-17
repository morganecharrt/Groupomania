<script setup>
import NavHeader from "@/components/Nav/NavHeader.vue";
import NavFooter from "@/components/Nav/NavFooter.vue";
import { useUserStore } from "./stores/user";
import { useRouter } from "vue-router";

const router = useRouter();

router.beforeEach((to) => {
  const { isAuth } = useUserStore();
  if (to.name !== "login" && !isAuth) return "/login";
});
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <header>
      <NavHeader />
    </header>
    <div class="w-[80%] mx-auto my-0 self-start grow">
      <RouterView />
    </div>
    <NavFooter />
  </div>
</template>

<style>
@import "@/assets/css/base.css";
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap");
</style>
