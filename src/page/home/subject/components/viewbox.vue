<template>
  <!-- 首次加载骨架屏 -->
  <template v-if="showSkeleton && isLoading">
    <div
      class="bg-white max-w-80 rounded-xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-80 max-h-96 overflow-y-auto transition-all duration-300"
      key="loading"
    >
      <div class="flex items-center mb-4">
        <div class="w-6 h-6 bg-gray-200 rounded-lg animate-pulse mr-2"></div>
        <div class="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>
      <div class="space-y-3">
        <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div class="h-8 bg-gray-200 rounded w-full animate-pulse mt-4"></div>
      </div>
    </div>
  </template>

  <!-- 内容区（固定显示，无闪烁） -->
  <template v-else-if="shouldShowContent">
    <div
      class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-80 max-h-96 overflow-y-auto transition-all duration-300 hover:shadow-md"
    >
      <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <div
          class="w-6 h-6 bg-gradient-to-br from-[#00a1d6] to-[#00b4ff] rounded-lg flex items-center justify-center mr-2"
        >
          <svg
            class="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>
        我的收藏
      </h3>

      <!-- 错误状态显示自定义样式 -->
      <div v-if="!data" class="flex flex-col items-center justify-center py-8">
        <div class="mb-4">
          <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <div class="text-base font-medium text-gray-500 mb-6">还没有收藏呢</div>
        <button 
          @click="handleModify" 
          class="px-4 py-2 bg-gradient-to-r from-[#00a1d6] to-[#00b4ff] text-white text-sm font-medium rounded-lg hover:from-[#0090c0] hover:to-[#0099e6] focus:outline-none focus:ring-2 focus:ring-[#00a1d6] focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          添加收藏
        </button>
      </div>

      <!-- 正常数据展示 -->
      <div v-else class="space-y-3">
        <div
          class="flex items-center justify-between py-2 border-b border-gray-100"
        >
          <span class="text-xs font-medium text-gray-500">条目名称</span>
          <span
            class="text-sm font-medium text-gray-800 max-w-[180px] truncate"
            :title="data?.subject?.name"
          >
            {{ data?.subject?.name }}
          </span>
        </div>

        <div
          class="flex items-center justify-between py-2 border-b border-gray-100"
        >
          <span class="text-xs font-medium text-gray-500">我的评分</span>
          <div class="flex items-center">
            <svg
              v-if="data.rate"
              class="w-4 h-4 text-[#ff6b6b] mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span class="text-sm font-medium text-gray-800">
              {{ data.rate || "未评分" }}
            </span>
          </div>
        </div>

        <div
          class="flex items-center justify-between py-2 border-b border-gray-100"
        >
          <span class="text-xs font-medium text-gray-500">收藏状态</span>
          <span
            class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
            :class="{
              'bg-blue-100 text-blue-700': data.type === 1,
              'bg-green-100 text-green-700': data.type === 2,
              'bg-purple-100 text-purple-700': data.type === 3,
              'bg-orange-100 text-orange-700': data.type === 4,
              'bg-red-100 text-red-700': data.type === 5,
            }"
          >
            {{ collectionType(data.type) }}
          </span>
        </div>

        <div class="flex items-center justify-between py-2">
          <span class="text-xs font-medium text-gray-500">更新时间</span>
          <span class="text-sm text-gray-600">
            {{ timeFormat(data.updated_at) }}
          </span>
        </div>

        <button
          class="w-full mt-4 px-4 py-2 bg-gradient-to-r from-[#00a1d6] to-[#00b4ff] text-white text-sm font-medium rounded-lg hover:from-[#0090c0] hover:to-[#0099e6] focus:outline-none focus:ring-2 focus:ring-[#00a1d6] transition-all duration-200 shadow-sm hover:shadow-md"
          @click="handleModify"
        >
          修改收藏
        </button>
      </div>

      <!-- 静默刷新指示器 -->
      <div
        v-if="isUpdating"
        class="mt-4 flex items-center justify-center text-[#00a1d6] text-sm bg-blue-50 rounded-lg py-2 px-3"
      >
        <svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span class="font-medium">数据更新中...</span>
      </div>
    </div>
  </template>

  <!-- 收藏状态修改弹窗 -->
  <CollectionModal
    :visible="showModal"
    :subject-id="Number(route.params.id)"
    :initial-type="data?.type || 1"
    :initial-rate="data?.rate || 0"
    @close="showModal = false"
    @update="handleModalUpdate"
  />
</template>

<script setup lang="ts">
import { Service } from "@/openapi/services/Service";

import { useAuthStore } from "@/stores";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import collectionType from "@/utils/collectionType";
import timeFormat from "@/utils/timeFormat";
import { useSilentUpdate } from "@/hook/useSilentUpdate";
import CollectionModal from "@/page/home/subject/components/CollectionModal.vue";

const authStore = useAuthStore();
const route = useRoute();

const getUserCollection = async () => {
  const res = await Service.getUserCollection(
    authStore.user?.id as string,
    Number(route.params.id),
  );
  return res;
};
const {
  data,
  isUpdating,
  isLoading,
  refresh,
  clearCache,
  showSkeleton,
  shouldShowContent,
} = useSilentUpdate({
  fetchFn: getUserCollection,
  cacheKey: `user_collection_${authStore.user?.username}_${route.params.id}`,
  cacheTime: 5 * 60 * 1000, // 5分钟缓存
  immediate: true,
});

const showModal = ref(false);

watch(isLoading, (val) => {
  console.log("isLoading changed:", val);
});

const handleModify = () => {
  console.log("handleModify");
  showModal.value = true;
};

const handleModalUpdate = async () => {
  // 清除缓存并重新获取数据
  clearCache();
  await refresh();
};

// 监听路由变化，当路由参数变化时重新加载收藏数据
</script>
