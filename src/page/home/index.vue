<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Toast from "@/components/Toast.vue";
import { useAuthStore } from "@/stores";

const keyword = ref("");
const router = useRouter();
const searchType = ref(0);
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref<"success" | "error" | "warning" | "info">("warning");
const isMobileMenuOpen = ref(false);

const authStore = useAuthStore();

const showToastMessage = (
  message: string,
  type: "success" | "error" | "warning" | "info" = "warning",
) => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
};

const handleSearch = async () => {
  if (!keyword.value.trim()) {
    showToastMessage("请输入搜索内容", "warning");
    return;
  }

  router.push({
    path: `/subject_search/${keyword.value}`,
    query: searchType.value ? { type: searchType.value.toString() } : {},
  });
  keyword.value = "";
  searchType.value = 0;
};

const selectType = (type: number) => {
  searchType.value = type;
  if (document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// 登出
const handleLogout = () => {
  console.log("开始登出流程");
  authStore.logout();
  console.log("认证存储状态:", authStore.isAuthenticated);
  console.log("用户已登出");
  showToastMessage("已成功登出", "success");
  // 重定向到首页
  router.push("/");
};
const BACKEND_URL = "http://localhost:3000";
// 登录按钮点击事件
const handleLogin = () => {
  window.open(BACKEND_URL + "/api/login", "_blank");
};
const openAuthUrl = () => {
  handleLogin();
};

// 按钮样式
const navBtnClass =
  "px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 focus:outline-none";

// 初始化认证状态
onMounted(() => {
  authStore.initializeAuth();
});
</script>

<template>
  <!-- 顶部导航栏 -->
  <div
    class="flex flex-wrap items-center justify-between px-4 md:py-4 h-auto md:h-20 bg-gray-900 shadow-lg"
  >
    <!-- Logo 和主要导航 -->
    <div class="flex items-center flex-wrap gap-4 md:gap-8">
      <div class="flex items-center">
        <div
          class="text-blue-400 font-bold text-2xl cursor-pointer hover:text-blue-300 transition-colors duration-300"
          @click="router.push('/')"
        >
          Bangumi
        </div>
      </div>

      <!-- 移动端菜单按钮 -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden text-white focus:outline-none p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            :d="
              isMobileMenuOpen
                ? 'M6 18L18 6M6 6l12 12'
                : 'M4 6h16M4 12h16M4 18h16'
            "
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>

      <div class="hidden md:flex items-center gap-1">
        <button
          :class="navBtnClass"
          @click="router.push('/')"
          class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-medium"
        >
          首页
        </button>
        <button
          :class="navBtnClass"
          class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-medium"
        >
          动画
        </button>
        <button
          :class="navBtnClass"
          class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-medium"
        >
          书籍
        </button>
        <button
          :class="navBtnClass"
          class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-medium"
        >
          游戏
        </button>
        <button
          :class="navBtnClass"
          class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-medium"
        >
          音乐
        </button>
        <button
          :class="navBtnClass"
          class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-medium"
        >
          三次元
        </button>
        <button
          :class="navBtnClass"
          class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-medium"
        >
          人物
        </button>
      </div>

      <!-- 移动端导航菜单 -->
      <div
        v-if="isMobileMenuOpen"
        class="absolute top-16 md:top-20 left-0 right-0 bg-gray-800 shadow-xl md:hidden z-20 rounded-b-lg"
      >
        <div class="flex flex-col py-2">
          <button
            :class="navBtnClass"
            @click="
              router.push('/');
              closeMobileMenu();
            "
            class="px-6 py-4 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-none transition-all duration-300 font-medium"
          >
            首页
          </button>
          <button
            :class="navBtnClass"
            @click="closeMobileMenu()"
            class="px-6 py-4 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-none transition-all duration-300 font-medium"
          >
            动画
          </button>
          <button
            :class="navBtnClass"
            @click="closeMobileMenu()"
            class="px-6 py-4 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-none transition-all duration-300 font-medium"
          >
            书籍
          </button>
          <button
            :class="navBtnClass"
            @click="closeMobileMenu()"
            class="px-6 py-4 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-none transition-all duration-300 font-medium"
          >
            游戏
          </button>
          <button
            :class="navBtnClass"
            @click="closeMobileMenu()"
            class="px-6 py-4 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-none transition-all duration-300 font-medium"
          >
            音乐
          </button>
          <button
            :class="navBtnClass"
            @click="closeMobileMenu()"
            class="px-6 py-4 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-none transition-all duration-300 font-medium"
          >
            三次元
          </button>
          <button
            :class="navBtnClass"
            @click="closeMobileMenu()"
            class="px-6 py-4 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-none transition-all duration-300 font-medium"
          >
            人物
          </button>
        </div>
      </div>
    </div>

    <!-- 搜索框 + 类型选择 -->
    <div class="flex items-center gap-2 flex-wrap">
      <div class="dropdown dropdown-bottom dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center font-medium"
        >
          全部
          <svg
            class="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-white rounded-xl p-2 shadow-xl z-10 mt-2 w-44 border border-gray-200"
        >
          <li>
            <a
              @click="
                selectType(2);
                closeMobileMenu();
              "
              class="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors duration-200"
              >动画</a
            >
          </li>
          <li>
            <a
              @click="
                selectType(1);
                closeMobileMenu();
              "
              class="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors duration-200"
              >书籍</a
            >
          </li>
          <li>
            <a
              @click="
                selectType(4);
                closeMobileMenu();
              "
              class="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors duration-200"
              >游戏</a
            >
          </li>
          <li>
            <a
              @click="
                selectType(3);
                closeMobileMenu();
              "
              class="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors duration-200"
              >音乐</a
            >
          </li>
          <li>
            <a
              @click="
                selectType(6);
                closeMobileMenu();
              "
              class="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors duration-200"
              >三次元</a
            >
          </li>
          <li>
            <a
              @click="
                selectType(0);
                closeMobileMenu();
              "
              class="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors duration-200"
              >人物</a
            >
          </li>
        </ul>
      </div>

      <div class="flex">
        <input
          type="text"
          class="px-4 py-2 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 w-64 transition-all duration-200"
          v-model="keyword"
          @keyup.enter="handleSearch"
          placeholder="搜索条目......"
        />
        <button
          class="px-5 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium"
          @click="handleSearch"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 右侧按钮 -->
    <div class="flex items-center gap-2 flex-wrap">
      <button
        :class="navBtnClass"
        @click="router.push('/calendar')"
        class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-medium"
      >
        每日放送
      </button>

      <!-- 登录/用户状态 -->
      <div v-if="!authStore.isAuthenticated" class="flex items-center gap-2">
        <button
          :class="navBtnClass"
          @click="openAuthUrl"
          class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-medium"
        >
          登录
        </button>
      </div>

      <div v-else class="flex items-center gap-3">
        <!-- 用户信息 -->
        <div class="flex items-center gap-2 text-white">
          <div
            class="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center"
          >
            <span class="font-bold text-white text-sm">{{
              authStore.user?.username?.charAt(0) ||
              authStore.user?.id?.toString().charAt(0) ||
              "U"
            }}</span>
          </div>
          <span class="text-sm font-medium hidden md:inline">{{
            authStore.user?.username || authStore.user?.id
          }}</span>
        </div>

        <!-- 用户菜单 -->
        <div class="dropdown dropdown-bottom dropdown-end">
          <button
            :class="navBtnClass"
            class="px-3 py-2 text-gray-100 hover:text-white hover:bg-blue-700 rounded-lg transition-all duration-300 flex items-center gap-1 font-medium"
          >
            <span>我的</span>
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <ul
            class="dropdown-content menu bg-white rounded-xl w-52 p-2 shadow-xl z-10 mt-2 border border-gray-200"
          >
            <li>
              <button
                @click="router.push('/user')"
                class="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors duration-200"
              >
                个人中心
              </button>
            </li>
            <li>
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors duration-200"
              >
                退出登录
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- 主内容 -->
  <div class="">
    <RouterView />
  </div>

  <!-- Toast 提示 -->
  <Toast
    v-if="showToast"
    :message="toastMessage"
    :type="toastType"
    @close="showToast = false"
  />
</template>
