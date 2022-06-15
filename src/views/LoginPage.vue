<script setup>
import { ref } from "vue";
import LoginForm from "@/components/Auth/LoginForm.vue";
import SignupForm from "@/components/Auth/SignupForm.vue";

const formType = ref("login");

function handleFormType() {
  if (formType.value === "login") formType.value = "signup";
  else formType.value = "login";
}
</script>
<template>
  <main class="pt-12">
    <LoginForm v-if="formType === 'login'" @changeFormType="handleFormType" />
    <SignupForm v-else @changeFormType="handleFormType" />
  </main>
</template>
