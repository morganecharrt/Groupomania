<script setup>
import { ref, reactive } from "vue";
import { usePost } from "@/composables/usePost";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import ButtonMain from "@/components/UI/ButtonMain.vue";

const router = useRouter();
const { createPost } = usePost();

const { authUser } = useUserStore();
const imageUrlPreview = ref("");

const newPost = reactive({
  description: "",
  userId: authUser.userId,
});
const file = ref(null);

function onFileChange(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  file.value = e.target.files[0];
  imageUrlPreview.value = URL.createObjectURL(file.value);
}

async function handleSubmit() {
  await createPost(newPost, file.value);
  router.push("/");
}
</script>

<template>
  <div>
    <h2 class="my-14">Créer une publication</h2>
    <form
      @submit.prevent="handleSubmit()"
      class="flex flex-col gap-5 shadow-boxShadowForm rounded-lg bg-white py-12 px-10 md:w-2/3 w-full mx-auto my-0"
    >
      <textarea
        class="p-2 rounded-md border-gray-500 border h-20"
        v-model="newPost.description"
        placeholder="Votre publication"
      />
      <img :src="imageUrlPreview" />
      <input type="file" accept="image/*" @change="onFileChange" class="p-2" />
      <ButtonMain type="submit">Créer</ButtonMain>
    </form>
  </div>
</template>
