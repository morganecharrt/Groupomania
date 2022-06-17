<script setup>
import { ref, onMounted } from "vue";
import { usePost } from "../composables/usePost";
import PostCard from "../components/Post/PostCard.vue";
import { useUserStore } from "../stores/user";

const { authUser } = useUserStore();
const { getAllPost, deletePost } = usePost();

const allPosts = ref({});
const error = ref("");

onMounted(async () => {
  const data = await getAllPost();
  allPosts.value = data;
});

async function handleDeletePost(postId) {
  try {
    await deletePost(postId);
  } catch (e) {
    error.value = e;
  }
  allPosts.value = await getAllPost();
}
</script>

<template>
  <div>
    <h2 class="my-14">
      Bienvenue {{ authUser.username }}, découvrez les publications de vos
      collègues
    </h2>
    <div class="text-primary p-5" v-if="error">{{ error }}</div>
    <div
      v-if="allPosts.length > 0"
      class="flex flex-col items-center justify-center gap-7 w-full"
    >
      <PostCard
        v-for="post in allPosts"
        :key="post._id"
        :description="post.description"
        :imageUrl="post.imageUrl"
        :userId="post.userId"
        :_id="post._id"
        :like="post.usersLiked"
        @deletePost="handleDeletePost(post._id)"
      />
    </div>
    <div v-else class="text-xl">Pas de publications pour le moment</div>
  </div>
</template>
