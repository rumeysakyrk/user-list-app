<template>
  <v-container>
    <h2 class="pb-8">{{ userName }}'in Albümleri</h2>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="primary"
      class="ma-auto"
    ></v-progress-circular>
    <v-row v-else>
      <v-col v-for="album in albums" :key="album.id" cols="12" md="6">
        <v-card class="mb-3" outlined>
          <v-card-title>{{ album.title }}</v-card-title>
          <v-card-subtitle>Album ID: {{ album.id }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { Album } from "@/models/Album";
import store from "@/store";
import { fetchUserAlbums } from "@/services/apiService";

export default defineComponent({
  name: "UserAlbums",
  setup() {
    const route = useRoute();
    const userId = route.params.id;
    const albums = ref<Album[]>([]);
    const userName = computed(() => {
      const user = store.getters.getUserById(userId);
      return user ? user.name : "User";
    });
    const isLoading = ref(true);

    const getAlbums = async () => {
      try {
        albums.value = await fetchUserAlbums(userId.toString());
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      getAlbums();
    });

    return {
      albums,
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
.v-card-title {
  font-weight: bold;
}
.v-card-subtitle {
  color: gray;
}
</style>
