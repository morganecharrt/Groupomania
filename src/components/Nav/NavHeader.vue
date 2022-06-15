<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import SignoutIcon from "@/components/Icons/SignoutIcon.vue";
import { useRouter } from "vue-router";
import LogoGroupomaniaVue from "../UI/LogoGroupomania.vue";

const store = useUserStore();
const router = useRouter();

async function handleLogout() {
  await store.$reset();
  router.push("/login");
}
</script>
<template>
  <nav
    class="flex flex-row justify-between items-center gap-5 md:p-10 p-4 w-full bg-white border border-tertiaryLight"
  >
    <RouterLink to="/">
      <LogoGroupomaniaVue class="w-40 md:w-fit" />
    </RouterLink>
    <div v-if="store.isAuth" class="self-end inline-flex items-center md:gap-12">
      <RouterLink
        to="/create-post"
        class="md:text-lg text-sm px-3 py-2 rounded-full box-content hover:text-primary hover:bg-backgroundLight duration-200"
      >
        Créer une publication</RouterLink
      >
      <span @click.prevent="handleLogout">
        <SignoutIcon
          class="md:h-6 md:w-6 h-4 w-4 hover:bg-backgroundLight cursor-pointer stroke-black hover:stroke-primary p-2 rounded-full box-content duration-200"
        />
      </span>
    </div>
  </nav>
</template>
