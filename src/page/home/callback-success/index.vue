<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const sessionId = route.query.session_id;
const loading = ref(true);
const success = ref(false);
const error = ref(false);
const countdown = ref(3);
const errorMessage = ref("");

onMounted(async () => {
  if (sessionId) {
    try {
      // 请求后端获取 access_token
      const res = await fetch(
        `http://localhost:3000/api/gettoken?session_id=${sessionId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch token");
      const data = await res.json();
      console.log(data);

      // 设置认证信息
      authStore.setAuth(data.access_token, { id: data.user_id });

      success.value = true;

      // 倒计时跳转
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
          router.push("/");
        }
      }, 1000);
    } catch (err) {
      console.error("Error fetching token or user info:", err);
      error.value = true;
      errorMessage.value = "登录过程中发生错误，请重试";
    } finally {
      loading.value = false;
    }
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <div v-if="loading" class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <div class="w-8 h-8 border-t-2 border-gray-500 border-solid rounded-full animate-spin"></div>
          </div>
          <div v-else-if="success" class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div v-else-if="error" class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>

        <div class="text-center">
          <h2 v-if="loading" class="text-2xl font-bold text-gray-800 mb-2">正在处理登录</h2>
          <h2 v-else-if="success" class="text-2xl font-bold text-gray-800 mb-2">登录成功！</h2>
          <h2 v-else-if="error" class="text-2xl font-bold text-gray-800 mb-2">登录失败</h2>

          <p v-if="loading" class="text-gray-600 mb-6">
            正在验证您的身份，请稍候...
          </p>
          <p v-else-if="success" class="text-gray-600 mb-6">
            您已成功登录Bangumi账户。页面将在 {{ countdown }} 秒后自动跳转到首页。
          </p>
          <p v-else-if="error" class="text-gray-600 mb-6">
            {{ errorMessage }}
          </p>

          <div v-if="success" class="mb-6">
            <div class="bg-gray-100 rounded-lg p-4">
              <p class="text-sm text-gray-700">
                <span class="font-medium">提示：</span>
                您现在可以访问所有个性化功能，包括收藏、评分和评论。
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <button
              v-if="success || error"
              @click="router.push('/')"
              class="px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium"
            >
              立即跳转到首页
            </button>
            <button
              v-if="error"
              @click="router.push('/')"
              class="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>