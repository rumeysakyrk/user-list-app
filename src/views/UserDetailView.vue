<template>
    <v-app>
        <v-navigation-drawer app permanent>
            <v-list dense>
                <v-list-item-group>
                    <template v-for="item in navbarItems" :key="item.route">
                        <v-list-item @click="navigateTo(item.route)"
                            :style="{ backgroundColor: selectedItem === item.route ? '#dddddd' : 'transparent' }">
                            <v-row>
                                <v-col cols="auto">
                                    <v-list-item-icon>
                                        <v-icon>{{ item.icon }}</v-icon>
                                    </v-list-item-icon>
                                </v-col>
                                <v-col>
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container>
                <v-row>
                    <v-col>
                        <v-card style="max-width: 700px;" class="mx-auto my-5" elevation="5">
                            <v-card-title class="headline">{{ user?.name }}</v-card-title>
                            <v-card-subtitle>{{ user?.email }}</v-card-subtitle>
                            <v-card-text>
                                <v-row dense>
                                    <template v-if="user">
                                        <template v-for="item in cardItems" :key="item.title">
                                            <v-col cols="4">
                                                <v-list-item>
                                                    <v-list-item-icon>
                                                        <v-icon>{{ item.icon }}</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>{{ item.value(user) }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-col>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <v-col cols="12">
                                            <v-list-item>
                                                <v-list-item-title>Yükleniyor...</v-list-item-title>
                                            </v-list-item>
                                        </v-col>
                                    </template>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script lang="ts">
import { User } from "@/models/User";
import store from "@/store";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { navbarItems } from "@/models/navbarItems";
import { cardItems } from "@/models/cardItems";

export default defineComponent({
    name: "UserDetail",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const userId = route.params.id;
        const selectedItem = ref<string | null>(null);

        const user = computed<User | undefined>(() =>
            store.getters.getUserById(userId)
        );

        onMounted(() => {
            if (store.state.users.length === 0) {
                store.dispatch("fetchUsers");
            }
        });

        const navigateTo = (section: string) => {
            selectedItem.value = section;
            router.push({ name: section, params: { userId } });
        };

        return {
            user,
            navigateTo,
            navbarItems,
            selectedItem,
            cardItems,
        };
    },
});
</script>
  
<style scoped>
.v-card {
    background-color: #f5f5f5;
    border-radius: 8px;
}
</style>