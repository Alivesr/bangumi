<script setup lang="ts">
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import { ref } from "vue";

const keyword = ref("");
const router = useRouter();
const searchType = ref(0);
const handleSearch = async () => {
  router.push({
    path: `/subject/${keyword.value}`,
    query: searchType.value ? { type: searchType.value.toString() } : {},
  });
  keyword.value = "";
  searchType.value = 0;
};
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn m-1">全部</div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li><a @click="searchType = 2">动画</a></li>
        <li><a @click="searchType = 1">书籍</a></li>
        <li><a @click="searchType = 4">游戏</a></li>
        <li><a @click="searchType = 3">音乐</a></li>
        <li><a @click="searchType = 6">三次元</a></li>
        <li><a>人物</a></li>
      </ul>
    </div>
    <input
      type="text"
      class="input border-2 focus:outline-none my-2"
      v-model="keyword"
      @keyup.enter="handleSearch"
    />
    <button class="btn mr-4" @click="handleSearch">搜索</button>
    <button class="btn" @click="router.push('/calendar')">每日放送</button>
  </div>

  <div class="flex flex-col items-center justify-center h-screen">
    <router-view />
  </div>
</template>
