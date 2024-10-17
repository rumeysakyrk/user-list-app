<template>
  <v-container>
    <h2 class="pb-8">{{ userName }}'in Fotoğrafları</h2>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="primary"
      class="ma-auto"
    ></v-progress-circular>
    <v-row>
      <v-col v-for="photo in photos" :key="photo.id" cols="12" md="6">
        <v-card class="mb-3" outlined>
          <v-img :src="photo.url" alt="Photo" height="200" contain></v-img>
          <v-card-title class="headline">{{ photo.title }}</v-card-title>
          <v-card-subtitle class="text--secondary">Album ID: {{ photo.albumId }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { Photo } from "@/models/Photo";
import store from "@/store";

export default defineComponent({
  name: "UserPhotos",
  setup() {
    const route = useRoute();
    const userId = route.params.id;
    const photos = ref<Photo[]>([]);
    const userName = computed(() => {
      const user = store.getters.getUserById(userId);
      return user ? user.name : "User";
    });
    const isLoading = ref(true);
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}/photos`
        );
        photos.value = response.data;
        isLoading.value = false;
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    onMounted(() => {
      fetchPhotos();
    });

    return {
      photos,
      userName,
      isLoading,
    };
  },
});
</script>

<style scoped>
.pb-8 {
  padding-bottom: 2rem;
}
.mb-3 {
  margin-bottom: 1.5rem;
}
.headline {
  font-weight: bold;
}
.text--secondary {
  color: gray;
}
</style>
