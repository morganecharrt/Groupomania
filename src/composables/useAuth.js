import { inject } from "vue";
import { useUserStore } from "@/stores/user";

export function useAuth() {
  const axios = inject("axios"); // inject axios
  const store = useUserStore();

  /**
   * Login function
   * @param {string} email - email of user
   * @param {string} password - password of user
   */
  async function login(email, password) {
    const res = await axios
      .post("http://localhost:8000/api/auth/login", {
        email,
        password,
      })
      .catch((error) => {
        throw error.response.data.error;
      });

    store.user["authToken"] = res.data.token;
    store.user["userId"] = res.data.userId;
    store.user["username"] = res.data.username;
    store.user["isAdmin"] = res.data.isAdmin;

    return res.data;
  }

  /**
   * Signup function
   * @param {string} username - name of user
   * @param {string} email - email of user
   * @param {string} password - password of user
   */
  async function signup(username, email, password) {
    const res = await axios
      .post("http://localhost:8000/api/auth/signup", {
        username,
        email,
        password,
      })
      .catch((error) => {
        throw handleErrors(error.response.data.error._message);
      });

    await login(email, password);

    return res.data;
  }

  function handleErrors(error) {
    if (error === "User validation failed") return "L'email est déjà existant";
    else error;
  }
  return { login, signup };
}
