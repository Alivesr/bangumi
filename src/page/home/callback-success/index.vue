<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const token = ref("");
const user_id = ref("");
const loading = ref(true);
const error = ref("");
const countdown = ref(5);

const getToken = async () => {
  try {
    loading.value = true;
    error.value = "";

    const res = await fetch("https://bangumi-alpha.vercel.app/api/getToken", {
      credentials: "include", // 关键！发送 Cookie
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Token data:", data);

    if (data.error) {
      throw new Error(data.error);
    }

    token.value = data.access_token;
    user_id.value = data.user_id;

    // 开始倒计时
    startCountdown();
  } catch (err) {
    console.error("获取 token 失败:", err);
    error.value = err instanceof Error ? err.message : "获取登录信息失败";
  } finally {
    loading.value = false;
  }
};

const startCountdown = () => {
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      redirectToHome();
    }
  }, 1000);
};

const redirectToHome = () => {
  router.push("/");
};

const goHomeNow = () => {
  redirectToHome();
};

onMounted(() => {
  getToken();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
      <!-- 加载状态 -->
      <div v-if="loading" class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"
        ></div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
          正在验证登录...
        </h2>
        <p class="text-gray-600">请稍候，正在获取您的登录信息</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center">
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">登录验证失败</h2>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="getToken"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          重试
        </button>
      </div>

      <!-- 成功状态 -->
      <div v-else class="text-center">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mb-2">登录成功！</h2>
        <p class="text-gray-600 mb-6">欢迎回来，正在为您跳转...</p>

        <!-- 用户信息展示 -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">用户 ID:</span>
            <span class="text-sm text-gray-900 font-mono">{{ user_id }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">登录状态:</span>
            <span class="text-sm text-green-600 font-medium">已认证</span>
          </div>
        </div>

        <!-- 倒计时提示 -->
        <div class="mb-6">
          <p class="text-gray-600 mb-2">
            <span class="text-blue-600 font-semibold">{{ countdown }}</span>
            秒后自动跳转到首页
          </p>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
              :style="{ width: `${(countdown / 5) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <button
            @click="goHomeNow"
            class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            立即跳转
          </button>
          <button
            @click="getToken"
            class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            刷新状态
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
