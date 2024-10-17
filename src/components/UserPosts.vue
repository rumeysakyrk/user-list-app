<template>
  <v-container>
    <h2 class="text-center pb-8">{{ userName }}'in Gönderileri</h2>
    <v-progress-circular v-if="isLoading" indeterminate color="primary" class="ma-auto"></v-progress-circular>
    <v-row>
      <v-col v-for="post in posts" :key="post.id" cols="12" md="6">
        <v-card class="mb-3" elevation="2">
          <div
            style="height: 80px; background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)); display: flex; align-items: center; justify-content: center; color: white;">
            <h3 class="font-weight-bold">{{ post.title }}</h3>
          </div>
          <v-card-text>
            <p class="body-2">{{ post.body }}</p>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { Post } from "@/models/Post";
import store from "@/store";

export default defineComponent({
  name: "UserPosts",
  setup() {
    const route = useRoute();
    const userId = route.params.id;
    const posts = ref<Post[]>([]);
    const userName = computed(() => {
      const user = store.getters.getUserById(userId);
      return user ? user.name : "User";
    });
    const isLoading = ref(true);

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );
        posts.value = response.data;
        isLoading.value = false;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };



    onMounted(() => {
      fetchPosts();
    });

    return {
      posts,
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

.v-card {
  transition: box-shadow 0.3s;
}

.v-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>