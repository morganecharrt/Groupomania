<script setup>
import { reactive } from "vue";
import { useAuth } from "../../composables/useAuth";
import ButtonMain from "@/components/UI/ButtonMain.vue";
import { useRouter } from "vue-router";

const { signup } = useAuth();
const user = reactive({
  username: "",
  email: "",
  password: "",
});
const router = useRouter();

async function handleSubmit() {
  await signup(user.username, user.email, user.password);
  router.push("/");
}

const emit = defineEmits(["changeFormType"]);
const handleFormType = () => {
  emit("changeFormType");
};
</script>

<template>
  <div class="mx-auto my-0 max-w-sm">
    <form
      name="signup"
      class="flex flex-col gap-5 w-sm shadow-boxShadowForm rounded-lg bg-white py-12 px-10"
      method="post"
      @submit.prevent="handleSubmit"
    >
      <h2>Créer un compte</h2>
      <input
        type="text"
        name="text"
        placeholder="Votre nom"
        class="p-2 rounded-md border-gray-500 border"
        v-model="user.username"
      />
      <input
        type="text"
        name="email"
        placeholder="Votre email"
        class="p-2 rounded-md border-gray-500 border"
        v-model="user.email"
      />
      <input
        type=" text"
        name="password"
        placeholder="Votre mot de passe"
        class="p-2 rounded-md border-gray-500 border"
        v-model="user.password"
      />
      <p>
        Déja un compte ?<span
          @click.prevent="handleFormType"
          class="hover:text-primary hover:cursor-pointer"
        >
          Connectez vous</span
        >
      </p>
      <ButtonMain type="submit">S'inscrire</ButtonMain>
    </form>
  </div>
</template>
