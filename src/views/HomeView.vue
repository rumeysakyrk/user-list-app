<template>
  <div class="home">
    <v-card  color="white" class="mx-auto my-5" elevation="5" rounded="xl" style="max-width: calc(100% - 100px);">
      <v-card-title class="headline text-h5 text-center mt-4 font-weight-bold  text-decoration-underline">Kullanıcı Listesi</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-progress-circular v-if="isLoading" indeterminate color="primary" class="ma-auto"></v-progress-circular>
        <UserList v-if="!isLoading" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import UserList from "@/components/UserList.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeView",

  components: { UserList },

  setup() {
    const store = useStore();
    const isLoading = ref(true);

    const fetchUsers = async () => {
      try {
        await store.dispatch('fetchUsers');
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      fetchUsers,
      isLoading
    };
  }
});
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>