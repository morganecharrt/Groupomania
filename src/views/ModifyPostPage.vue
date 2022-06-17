<script setup>
import { ref, onMounted, reactive } from "vue";
import { usePost } from "@/composables/usePost";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import ButtonMain from "@/components/UI/ButtonMain.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";

const router = useRouter();
const route = useRoute();
const { getOnePost, updatePost } = usePost();
const post = ref({});
const { authUser } = useUserStore();
const error = ref("");

const updatedPost = reactive({
  description: "",
  userId: "",
  _id: "",
  imageUrl: "",
});
const file = ref(null);

onMounted(async () => {
  const data = await getOnePost(route.params.id);
  post.value = data;
  updatedPost.imageUrl = post.value.imageUrl;
  updatedPost.description = post.value.description;
  updatedPost._id = post.value._id;
  updatedPost.userId = post.userId;
});

function onFileChange(e) {
  var files = e.target.files;
  if (!files.length) return;
  file.value = e.target.files[0];
  updatedPost.imageUrl = URL.createObjectURL(file.value);
}

async function handleSubmit() {
  try {
    if (updatedPost.description != "") {
      await updatePost(updatedPost, file.value);
      router.push("/");
    } else {
      error.value = "Le champs description est obligatoire";
    }
  } catch (e) {
    error.value = e;
  }
}

function handleDeleteImage() {
  updatedPost.imageUrl = "";
  file.value = null;
}
</script>

<template>
  <div>
    <h2 class="my-14">Modifier votre publication</h2>
    <div class="text-primary p-6 text-center" v-if="error">{{ error }}</div>
    <form
      @submit.prevent="handleSubmit()"
      class="flex flex-col gap-5 shadow-boxShadowForm rounded-lg bg-white py-12 px-10 md:w-2/3 w-full mx-auto my-0"
    >
      <textarea
        v-model="updatedPost.description"
        class="p-2 rounded-md border-gray-500 border h-20"
      />
      <div>
        <img :src="updatedPost.imageUrl" />
        <DeleteIcon
          v-if="updatedPost.imageUrl != ''"
          class="w-5 h-5 hover:bg-backgroundLight cursor-pointer stroke-tertiary hover:stroke-primary p-2 rounded-full box-content duration-200"
          @click.prevent="handleDeleteImage"
        />
      </div>
      <input type="file" accept="image/*" @change="onFileChange" />
      <ButtonMain type="submit">Modifier</ButtonMain>
    </form>
  </div>
</template>
