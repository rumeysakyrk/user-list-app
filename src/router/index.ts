import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserDetailView from "@/views/UserDetailView.vue";
import UserPosts from "@/components/UserPosts.vue";
import  UserTodos  from '@/components/UserTodos.vue';
import UserPhotos from "@/components/UserPhotos.vue";
import UserComments from "@/components/UserComments.vue";
import UserAlbums from "@/components/UserAlbums.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/user/:id",
    name: "User",
    component: UserDetailView,
    props: true,
    children: [
      {
        path: "posts",
        name: "posts",
        component: UserPosts,
      },
      {
        path: "albums",
        name: "albums",
        component: UserAlbums,
      },
      {
        path: "comments",
        name: "comments",
        component: UserComments,
      },
      {
        path: "photos",
        name: "photos",
        component: UserPhotos,
      },
      {
        path: "todos",
        name: "todos",
        component: UserTodos,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
