<script setup>
import { ref, onMounted, reactive } from "vue";
import { usePost } from "@/composables/usePost";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import ButtonMain from "@/components/UI/ButtonMain.vue";

const router = useRouter();
const route = useRoute();
const { getOnePost, updatePost } = usePost();
const post = ref({});
const { authUser } = useUserStore();
const imageUrlPreview = ref("");

const updatedPost = reactive({
  description: "",
  userId: authUser.userId,
  _id: "",
});
const file = ref(null);

onMounted(async () => {
  const data = await getOnePost(route.params.id);
  post.value = data;
  imageUrlPreview.value = post.value.imageUrl;
  updatedPost.description = post.value.description;
  updatedPost._id = post.value._id;
});

function onFileChange(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  file.value = e.target.files[0];
  imageUrlPreview.value = URL.createObjectURL(file.value);
}

async function handleSubmit() {
  await updatePost(updatedPost, file.value);
  router.push("/");
}
</script>

<template>
  <div>
    <h2 class="my-14">Modifier votre publication</h2>
    <form
      @submit.prevent="handleSubmit()"
      class="flex flex-col gap-5 shadow-boxShadowForm rounded-lg bg-white py-12 px-10 md:w-2/3 w-full mx-auto my-0"
    >
      <textarea
        v-model="updatedPost.description"
        class="p-2 rounded-md border-gray-500 border h-20"
      />
      <img :src="imageUrlPreview" />
      <input type="file" accept="image/*" @change="onFileChange" />
      <ButtonMain type="submit">Modifier</ButtonMain>
    </form>
  </div>
</template>
