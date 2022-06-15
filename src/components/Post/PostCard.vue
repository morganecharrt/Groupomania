<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { usePost } from "../../composables/usePost";
import DeleteIcon from "../Icons/DeleteIcon.vue";
import LikeIcon from "../Icons/LikeIcon.vue";
import EditIcon from "../Icons/EditIcon.vue";

const { likePost } = usePost();
const { authUser } = useUserStore();

const isLike = ref(false);
isLike.value =
  post.like.findIndex((element) => element == authUser.userId) > -1 ? true : false;

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
    required: true,
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

const counterLike = ref(post.like.length);
const handleLike = () => {
  likePost(post._id, authUser.userId);

  isLike.value = !isLike.value;
  if (isLike.value) {
    counterLike.value++;
  } else {
    counterLike.value--;
  }
};
</script>

<template>
  <div
    class="flex flex-col md:w-2/3 w-full gap-7 justify-around rounded-md shadow-boxShadowForm bg-white overflow-hidden"
  >
    <div class="p-7 flex flex-col gap-7">
      <div>{{ post.description }}</div>
      <img :src="post.imageUrl" class="object-contain h-36 w-full" />
    </div>
    <div class="flex flex-row w-full justify-end gap-2 bg-white p-2 border-t">
      <div class="flex flex-row items-center">
        <span class="">{{ counterLike }}</span>
        <button @click.prevent="handleLike">
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
      <div class="inline-flex gap-2" v-if="authUser.userId === post.userId">
        <RouterLink :to="`/modify-post/${post._id}`"
          ><EditIcon
            class="w-5 h-5 hover:bg-backgroundLight cursor-pointer stroke-tertiary hover:stroke-primary p-2 rounded-full box-content duration-200"
        /></RouterLink>
        <button @click.prevent="handleDelete">
          <DeleteIcon
            class="w-5 h-5 hover:bg-backgroundLight cursor-pointer stroke-tertiary hover:stroke-primary p-2 rounded-full box-content duration-200"
          />
        </button>
      </div>
    </div>
  </div>
</template>
