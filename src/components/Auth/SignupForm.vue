<script setup>
import { reactive, ref } from "vue";
import { useAuth } from "../../composables/useAuth";
import ButtonMain from "@/components/UI/ButtonMain.vue";
import { useRouter } from "vue-router";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

const { signup } = useAuth();
const error = ref("");
const user = reactive({
  username: "",
  email: "",
  password: "",
});
const router = useRouter();

async function handleSubmit() {
  try {
    await signup(user.username, user.email, user.password);
    router.push("/");
  } catch (e) {
    error.value = e;
  }
}

const emit = defineEmits(["changeFormType"]);
const handleFormType = () => {
  emit("changeFormType");
};

const schema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Votre nom doit contenir au minimum 2 caractères")
    .required("Votre nom est requis"),
  email: Yup.string()
    .required("L'email est requis")
    .email("Le format de l'email est invalide"),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au minimum 8 caractères")
    .required("Le mot de passe est requis"),
});
</script>

<template>
  <div class="mx-auto my-0 max-w-sm">
    <Form
      name="signup"
      class="flex flex-col gap-5 w-sm shadow-boxShadowForm rounded-lg bg-white py-12 px-10"
      method="post"
      :validation-schema="schema"
      v-slot="{ errors }"
      @submit="handleSubmit"
    >
      <h2>Créer un compte</h2>
      <Field
        type="text"
        name="username"
        placeholder="Votre nom"
        class="p-2 rounded-md border-gray-500 border"
        v-model="user.username"
      />
      <div v-if="errors.username" class="text-primary p-1">
        {{ errors.username }}
      </div>

      <Field
        type="text"
        name="email"
        placeholder="Votre email"
        class="p-2 rounded-md border-gray-500 border"
        v-model="user.email"
      />
      <div v-if="errors.email" class="text-primary p-1">{{ errors.email }}</div>

      <Field
        type="password"
        name="password"
        placeholder="Votre mot de passe"
        class="p-2 rounded-md border-gray-500 border"
        v-model="user.password"
      />
      <div v-if="errors.password" class="text-primary p-1">
        {{ errors.password }}
      </div>

      <div class="text-primary p-6 text-center" v-if="error">{{ error }}</div>

      <p>
        Déja un compte ?<span
          @click.prevent="handleFormType"
          class="hover:text-primary hover:cursor-pointer"
        >
          Connectez vous</span
        >
      </p>
      <ButtonMain type="submit">S'inscrire</ButtonMain>
    </Form>
  </div>
</template>
