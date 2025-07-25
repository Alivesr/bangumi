<script setup lang="ts">
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import { ref } from "vue";

const keyword = ref("");
const router = useRouter();
const handleSearch = async () => {
  router.push(`/subject/${keyword.value}`);
  keyword.value = "";
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
        <li><a>动画</a></li>
        <li><a>书籍</a></li>
        <li><a>游戏</a></li>
        <li><a>音乐</a></li>
        <li><a>三次元</a></li>
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
