<script setup lang="ts">
import { Service } from "@/openapi/services/Service";
import { useAuthStore } from "@/stores";
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import type { UserSubjectCollection } from "@/openapi/models/UserSubjectCollection";

const authStore = useAuthStore();
const route = useRoute();
const userCollection = ref<UserSubjectCollection | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const getUserCollection = async () => {
  const id = Number(route.params.id);
  if (!id) return;
  
  try {
    loading.value = true;
    error.value = null;
    const res = await Service.getUserCollection(authStore.user?.id ?? "", id);
    userCollection.value = res;
  } catch (err) {
    error.value = "加载收藏信息失败";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getUserCollection();
});

// 监听路由变化，当路由参数变化时重新加载收藏数据
watch(
  () => route.params.id,
  () => {
    getUserCollection();
  }
);
</script>

<template>
  <!-- 加载状态 -->
  <div v-if="loading" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-64">
    <div class="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
    <div class="space-y-2">
      <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
    </div>
  </div>

  <!-- 错误状态 -->
  <div v-else-if="error" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-64">
    <div class="text-red-500 text-sm">{{ error }}</div>
  </div>

  <!-- 内容展示 -->
  <div v-else-if="userCollection" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-64">
    <h3 class="text-lg font-semibold text-gray-800 mb-3">我的收藏</h3>
    <div class="text-gray-600">
      <div>{{ userCollection.subject?.name }}</div>
    </div>
  </div>

  <!-- 无数据状态 -->
  <div v-else class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-64">
    <div class="text-gray-400 text-sm">暂无收藏信息</div>
  </div>
</template>
