import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { OpenAPI } from './openapi/core/OpenAPI'
import { useAuthStore } from './stores/auth'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 初始化认证状态并设置OpenAPI TOKEN
const authStore = useAuthStore();
authStore.initializeAuth();
OpenAPI.TOKEN = authStore.token || undefined;
OpenAPI.BASE = 'https://api.bgm.tv';

app.mount("#app");
