<template>
    <v-container>
      <h2 class="pb-8">{{ userName }}'in Yapılacakları</h2>
      <v-progress-circular v-if="isLoading" indeterminate color="primary" class="ma-auto"></v-progress-circular>
      <v-row>
        <v-col v-for="todo in todos" :key="todo.id" cols="10" md="6">
          <v-card class="d-flex align-center">
            <v-icon
              v-if="todo.completed"
              color="green"
             
            >
              mdi-check-circle
            </v-icon>
            <v-icon
              v-else
              color="red"
             
            >
              mdi-close-circle
            </v-icon>
            <v-card-title class="todo-title ">{{ todo.title }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  import store from "@/store";
  import { ToDo } from "@/models/Todo";
  
  export default defineComponent({
    name: "UserTodos",
    setup() {
      const route = useRoute();
      const userId = route.params.id;
      const todos = ref<ToDo[]>([]);
      const userName = computed(() => {
        const user = store.getters.getUserById(userId);
        return user ? user.name : "User";
      });
      const isLoading = ref(true);
  
      const fetchToDos = async () => {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${userId}/todos`
          );
          todos.value = response.data;
        } catch (error) {
          console.error("Error fetching todos:", error);
        } finally {
          isLoading.value = false;
        }
      };
  
      onMounted(() => {
        fetchToDos();
      });
  
      return {
        todos,
        userName,
        isLoading,
      };
    },
  });
  </script>
  
  <style scoped>
  .mb-3 {
    margin-bottom: 1.5rem;
  }
  .todo-title {
  font-size: 16px; 
}
  </style>