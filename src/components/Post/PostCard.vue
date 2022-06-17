<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { usePost } from "../../composables/usePost";
import DeleteIcon from "../Icons/DeleteIcon.vue";
import LikeIcon from "../Icons/LikeIcon.vue";
import EditIcon from "../Icons/EditIcon.vue";

const error = ref("");
const { likePost, getUser } = usePost();
const { authUser } = useUserStore();

const post = defineProps({
  _id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  like: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["deletePost"]);
const handleDelete = () => {
  let result = confirm("Voulez-vous vraiment supprimer cette publication ?");
  if (result) {
    emit("deletePost");
  }
};

const isLike = ref(false);
isLike.value =
  post.like.findIndex((element) => element == authUser.userId) > -1
    ? true
    : false;

const counterLike = ref(post.like.length);
const handleLike = async () => {
  try {
    await likePost(post._id, authUser.userId);
  } catch (e) {
    error.value = e;
  }

  isLike.value = !isLike.value;
  if (isLike.value) {
    counterLike.value++;
  } else {
    counterLike.value--;
  }
};

const user = ref(null);
onMounted(async () => {
  const data = await getUser(post.userId);
  user.value = data;
});
</script>

<template>
  <div
    class="flex flex-col md:w-2/3 w-full gap-7 justify-around rounded-md shadow-boxShadowForm bg-white overflow-hidden"
  >
    <div class="p-7 flex flex-col gap-7">
      <div>{{ post.description }}</div>
      <img
        v-if="post.imageUrl != ''"
        :src="post.imageUrl"
        class="object-contain w-full rounded-md"
      />
    </div>
    <div
      class="flex flex-row w-full justify-end items-center gap-2 bg-white py-2 px-4 border-t"
    >
      <div v-if="user" class="justify-self-start grow">
        Publié par <strong>{{ user.username }}</strong>
      </div>
      <div class="flex flex-row items-center justify-center">
        <div class="text-primary p-1" v-if="error">{{ error }}</div>
        <span class="text-sm">{{ counterLike }}</span>
        <button @click.prevent="handleLike" class="relative">
          <LikeIcon
            class="w-5 h-5 hover:bg-backgroundLight cursor-pointer hover:stroke-primary p-2 rounded-full box-content duration-200"
            :class="
              isLike
                ? 'fill-primary stroke-transparent'
                : 'stroke-tertiary fill-transparent'
            "
          />
        </button>
      </div>
      <div
        class="inline-flex gap-2"
        v-if="authUser.userId === post.userId || authUser.isAdmin"
      >
        <RouterLink :to="`/modify-post/${post._id}`"
          ><EditIcon
            class="w-5 h-5 hover:bg-backgroundLight cursor-pointer stroke-tertiary hover:stroke-primary p-2 rounded-full box-content duration-200"
        /></RouterLink>

        <DeleteIcon
          class="w-5 h-5 hover:bg-backgroundLight cursor-pointer stroke-tertiary hover:stroke-primary p-2 rounded-full box-content duration-200"
          @click.prevent="handleDelete"
        />
      </div>
    </div>
  </div>
</template>
