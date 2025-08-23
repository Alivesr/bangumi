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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(), // 或 createWebHashHistory()
  routes,
});

export default router;
