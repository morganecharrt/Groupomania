<script setup>
import { reactive, ref } from "vue";
import { useAuth } from "../../composables/useAuth";
import ButtonMain from "@/components/UI/ButtonMain.vue";
import { useRouter } from "vue-router";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

const { login } = useAuth();
const error = ref("");
const user = reactive({
  email: "",
  password: "",
});

const router = useRouter();

async function handleSubmit() {
  try {
    if (user.email.trim() != "" && user.password.trim() != "") {
      await login(user.email, user.password);
      router.push("/");
    }
  } catch (e) {
    error.value = e;
  }
}

const emit = defineEmits(["changeFormType"]);
const handleFormType = () => {
  emit("changeFormType");
};

const schema = Yup.object().shape({
  email: Yup.string()
    .required("L'email est requis")
    .email("Le format de l'email est invalide"),
  password: Yup.string().required("Le mot de passe est requis"),
});
</script>

<template>
  <div class="mx-auto my-0 max-w-sm">
    <Form
      name="login"
      class="flex flex-col gap-5 w-sm shadow-boxShadowForm rounded-lg bg-white py-12 px-10"
      method="post"
      :validation-schema="schema"
      v-slot="{ errors }"
      @submit="handleSubmit"
    >
      <h2>Connectez-vous</h2>
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
      <div class="text-primary p-1" v-if="error">{{ error }}</div>
      <ButtonMain type="submit">Se connecter</ButtonMain>
      <p>
        Pas encore de compte ?<span
          @click.prevent="handleFormType"
          class="hover:text-primary hover:cursor-pointer"
        >
          Inscrivez-vous</span
        >
      </p>
    </Form>
  </div>
</template>
