<template>
  <v-container>
    <h2 class="pb-8">{{ userName }}'in Yorumları</h2>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="primary"
      class="ma-auto"
    ></v-progress-circular>
    <v-row>
      <v-col v-for="comment in comments" :key="comment.id" cols="12" md="6">
        <v-card class="mb-3" outlined>
          <v-card-title class="headline">{{ comment.name }}</v-card-title>
          <v-card-subtitle class="text--secondary">{{
            comment.email
          }}</v-card-subtitle>
          <v-card-text>{{ comment.body }}</v-card-text>
          <v-divider></v-divider>
          <v-card-text class="text--primary"
            >Post ID: {{ comment.postId }}</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { Comment } from "@/models/Comment";
import store from "@/store";
import { fetchUserComments } from "@/services/apiService";

export default defineComponent({
  name: "UserComments",
  setup() {
    const route = useRoute();
    const userId = route.params.id;
    const comments = ref<Comment[]>([]);
    const userName = computed(() => {
      const user = store.getters.getUserById(userId);
      return user ? user.name : "User";
    });
    const isLoading = ref(true);

    const getComments = async () => {
      try {
        comments.value = await fetchUserComments(userId.toString());
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      getComments();
    });

    return {
      comments,
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
.headline {
  font-weight: bold;
}
.text--secondary {
  color: gray;
}
.text--primary {
  color: #1976d2;
}
</style>
