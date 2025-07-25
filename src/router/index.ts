import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import Home from "../page/home/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(), // 或 createWebHashHistory()
  routes,
});

export default router;
