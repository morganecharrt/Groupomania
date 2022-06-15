import { inject } from "vue";
import { useUserStore } from "../stores/user";

export function usePost() {
  const axios = inject("axios"); // inject axios
  const { authUser } = useUserStore();

  async function getAllPost() {
    const res = await axios.get("http://localhost:8000/api/post", {
      headers: {
        Authorization: `Bearer ${authUser.authToken}`,
      },
    });
 
    return res.data.reverse();
  }

  async function getOnePost(postId) {
    const res = await axios.get("http://localhost:8000/api/post/" + postId, {
      headers: {
        Authorization: `Bearer ${authUser.authToken}`,
      },
    });
    return res.data;
  }

  async function updatePost(post, file) {
    const formData = new FormData();
    formData.append("post", JSON.stringify(post));
    formData.append("image", file, file.name);
    const res = await axios.put(
      "http://localhost:8000/api/post/" + post._id,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authUser.authToken}`,
        },
      }
    );
    return res.data;
  }

  async function createPost(post, file) {
    const formData = new FormData();
    formData.append("post", JSON.stringify(post));
    formData.append("image", file, file.name);
    const res = await axios.post("http://localhost:8000/api/post/", formData, {
      headers: {
        Authorization: `Bearer ${authUser.authToken}`,
      },
    });
    return res.data;
  }

  async function deletePost(postId) {
    const res = await axios.delete("http://localhost:8000/api/post/" + postId, {
      headers: {
        Authorization: `Bearer ${authUser.authToken}`,
      },
    });
    return res.data;
  }

  async function likePost(postId, userId) {
    const res = await axios.post(
      "http://localhost:8000/api/post/" + postId + "/like",
      { userId },
      {
        headers: {
          Authorization: `Bearer ${authUser.authToken}`,
        },
      }
    );
    return res.data;
  }

  return {
    getAllPost,
    updatePost,
    getOnePost,
    createPost,
    deletePost,
    likePost,
  };
}
