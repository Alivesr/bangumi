import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import Calendar from "@/page/home/Calendar/index.vue";
import Home from "@/page/home/index.vue";
import Subject_Search from "@/page/home/subject_search/index.vue";
import home from "@/page/home/home-p/index.vue";
import Subject from "@/page/home/subject/index.vue";
import User from "@/page/home/user/index.vue";
// @ts-ignore
import CallbackSuccess from "@/page/home/callback-success/index.vue";
import Test from "@/page/home/test/index.vue";
import Anime from "@/page/home/anime/index.vue";
import Book from "@/page/home/book/index.vue";
import Game from "@/page/home/game/index.vue";
import Real from "@/page/home/real/index.vue";
import Music from "@/page/home/music/index.vue";  
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "HomeP",
        component: home,
      },
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar,
      },
      {
        path: "subject_search/:id",
        name: "Subject_Search",
        component: Subject_Search,
      },
      {
        path: "subject/:id",
        name: "Subject",
        component: Subject,
      },
      {
        path: "user/:id",
        name: "User",
        component: User,
      },
      {
        path: "callback-success",
        name: "CallbackSuccess",
        component: CallbackSuccess,
      },
      {
        path: "test",
        name: "Test",
        component: Test,
      },
      {
        path: "anime",
        name: "Anime",
        component:  Anime,
      },
      {
        path: "book",
        name: "Book",
        component: Book,
      },
      {
        path: "game",
        name: "Game",
        component: Game,
      },
      {
        path: "real",
        name: "Real",
        component: Real,
      },
      {
        path: "music",
        name: "Music",
        component: Music,
      },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(), // 或 createWebHashHistory()
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（比如浏览器的前进后退），则返回保存的位置
    if (savedPosition) {
      return savedPosition;
    }
    // 否则滚动到顶部
    return { top: 0 };
  },
});

export default router;
