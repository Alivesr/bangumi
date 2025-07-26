<script setup lang="ts">
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import { ref } from "vue";
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
  // 检查搜索关键词是否为空
  if (!keyword.value.trim()) {
    showToastMessage("请输入搜索内容", "warning");
    return;
  }

  router.push({
    path: `/subject/${keyword.value}`,
    query: searchType.value ? { type: searchType.value.toString() } : {},
  });
  keyword.value = "";
  searchType.value = 0;
};

const selectType = (type: number) => {
  searchType.value = type;
  // 使用 document.activeElement.blur() 关闭下拉菜单
  if (document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
};
</script>

<template>
  <div
    class="flex items-center justify-center h-16 bg-white/10 backdrop-blur-md shadow-xl rounded-b-3xl border border-white/20"
  >
    <button
      class="btn m-1 bg-white/20 hover:bg-white/30 text-black border-0 backdrop-blur-sm shadow-sm"
      @click="router.push('/')"
    >
      首页
    </button>
    <div class="dropdown">
      <div
        tabindex="0"
        role="button"
        class="btn m-1 bg-white/20 hover:bg-white/30 text-black border-0 backdrop-blur-sm shadow-sm"
      >
        全部
      </div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-white/90 backdrop-blur-md rounded-box z-1 w-52 p-2 shadow-xl border border-white/20"
      >
        <li><a @click="selectType(2)" class="hover:bg-pink-100">动画</a></li>
        <li><a @click="selectType(1)" class="hover:bg-blue-100">书籍</a></li>
        <li><a @click="selectType(4)" class="hover:bg-green-100">游戏</a></li>
        <li><a @click="selectType(3)" class="hover:bg-yellow-100">音乐</a></li>
        <li>
          <a @click="selectType(6)" class="hover:bg-purple-100">三次元</a>
        </li>
        <li><a @click="selectType(0)" class="hover:bg-gray-100">人物</a></li>
      </ul>
    </div>
    <input
      type="text"
      class="input bg-white/20 backdrop-blur-sm border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-black placeholder-white/70 my-2 shadow-sm"
      v-model="keyword"
      @keyup.enter="handleSearch"
      placeholder="搜索动漫..."
    />
    <button
      class="btn mr-4 bg-white/20 hover:bg-white/30 text-black border-0 backdrop-blur-sm shadow-sm"
      @click="handleSearch"
    >
      搜索
    </button>
    <button
      class="btn bg-white/20 hover:bg-white/30 text-black border-0 backdrop-blur-sm shadow-sm"
      @click="router.push('/calendar')"
    >
      每日放送
    </button>
  </div>

  <router-view />

  <!-- Toast 提示 -->
  <Toast
    v-if="showToast"
    :message="toastMessage"
    :type="toastType"
    @close="showToast = false"
  />
</template>
