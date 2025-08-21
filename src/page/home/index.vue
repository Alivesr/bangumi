<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Toast from "@/components/Toast.vue";

const keyword = ref("");
const router = useRouter();
const searchType = ref(0);
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref<"success" | "error" | "warning" | "info">("warning");

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

// 登录跳转
const openAuthUrl = () => {
  window.open(authUrl, "_blank");
};

const CLIENT_ID = "bgm443768a588ea35fa5";
const REDIRECT_URI = "http://localhost:3000/callback";
const STATE = "xyz";

const authUrl = `https://bgm.tv/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  REDIRECT_URI,
)}&state=${STATE}`;

const navBtnClass =
  "px-3 py-2 text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500 transition-all duration-200 focus:outline-none";
</script>

<template>
  <!-- 顶部导航栏 -->
  <div
    class="flex flex-wrap items-center justify-between px-4 py-3 h-16 bg-black shadow-md"
  >
    <!-- 左侧按钮 -->
    <div class="flex items-center flex-wrap gap-1">
      <button :class="navBtnClass" @click="router.push('/')">首页</button>
      <button :class="navBtnClass">动画</button>
      <button :class="navBtnClass">书籍</button>
      <button :class="navBtnClass">游戏</button>
      <button :class="navBtnClass">音乐</button>
      <button :class="navBtnClass">三次元</button>
      <button :class="navBtnClass">人物</button>
    </div>

    <!-- 搜索框 + 类型选择 -->
    <div class="flex items-center gap-2 flex-wrap">
      <div class="dropdown relative">
        <div tabindex="0" role="button" :class="navBtnClass">全部</div>
        <ul
          tabindex="0"
          class="dropdown-content absolute menu bg-gray-800 rounded-lg w-52 p-2 shadow-lg z-10 mt-1"
        >
          <li>
            <a
              @click="selectType(2)"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
              >动画</a
            >
          </li>
          <li>
            <a
              @click="selectType(1)"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
              >书籍</a
            >
          </li>
          <li>
            <a
              @click="selectType(4)"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
              >游戏</a
            >
          </li>
          <li>
            <a
              @click="selectType(3)"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
              >音乐</a
            >
          </li>
          <li>
            <a
              @click="selectType(6)"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
              >三次元</a
            >
          </li>
          <li>
            <a
              @click="selectType(0)"
              class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded"
              >人物</a
            >
          </li>
        </ul>
      </div>

      <input
        type="text"
        class="px-4 py-2 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        v-model="keyword"
        @keyup.enter="handleSearch"
        placeholder="搜索条目......"
      />
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="handleSearch"
      >
        搜索
      </button>
    </div>

    <!-- 右侧按钮 -->
    <div class="flex items-center gap-2 flex-wrap">
      <button :class="navBtnClass" @click="router.push('/calendar')">
        每日放送
      </button>
      <button :class="navBtnClass" @click="openAuthUrl">登录</button>
      <button :class="navBtnClass" @click="router.push('/user')">我的</button>
    </div>
  </div>

  <!-- 主内容 -->
  <RouterView />

  <!-- Toast 提示 -->
  <Toast
    v-if="showToast"
    :message="toastMessage"
    :type="toastType"
    @close="showToast = false"
  />
</template>
