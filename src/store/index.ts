import { createStore } from 'vuex'
import axios from "axios";
import { User } from "@/models/User";


export default createStore({
  state: {
    users: [] as User[],
  },
  getters: {
    getUserById: (state) => (id: string) => {
      return state.users.find((user: User) => user.id.toString() === id);
    },
  },
  mutations: {
    setUsers(state, userList): void {
      state.users = userList;
    },
  },
  actions: {
    async fetchUsers({ commit, state }): Promise<void> {
      if (state.users.length === 0) {
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          commit("setUsers", response.data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      }
    },
  },
  modules: {},
});
