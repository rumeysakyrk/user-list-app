<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="user in $store.state.users"
        :key="user.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card @click="goToDetail(user.id)" class="user-card">
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>Email: {{ user.email }}</v-card-subtitle>
          <v-card-subtitle>Şirket: {{ user.company.name }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserList",
  setup() {
    const router = useRouter();

    const goToDetail = (id: number) => {
      router.push({ name: "User", params: { id } });
    };

    return {
      goToDetail,
    };
  },
});
</script>

<style scoped>
.user-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.user-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
}
</style>
