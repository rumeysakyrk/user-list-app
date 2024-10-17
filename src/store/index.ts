import { createStore } from 'vuex'
import { User } from "@/models/User";
import { fetchUserList } from "@/services/apiService";


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
          const users = await fetchUserList(); // Use the centralized function
          commit("setUsers", users);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      }
    },
  },
  modules: {},
});
