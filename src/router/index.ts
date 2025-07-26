import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import Calendar from "@/page/home/Calendar/index.vue";
import Home from "@/page/home/index.vue";
import Subject from "@/page/home/subject/index.vue";
import home from "@/page/home/home-p/index.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/calendar",
        name: "Calendar",
        component: Calendar,
      },
      {
        path: "/subject/:id",
        name: "Subject",
        component: Subject,
      },
      {
        path: "/",
        name: "HomeP",
        component: home,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(), // 或 createWebHashHistory()
  routes,
});

export default router;
