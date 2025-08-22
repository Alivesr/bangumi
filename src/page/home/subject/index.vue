<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSubjectDetail } from "@/api/subject";
import type { Response, Kv } from "@/types/subject/getSubjectTypes";

const route = useRoute();
const id = Number(route.params.id);

const subject = ref<Response>();
const loading = ref(true);
const error = ref<string | null>(null);

const navigateList = [
  "概览",
  "章节",
  "角色",
  "制作人员",
  "吐槽",
  "关联",
  "讨论",
  "讨论版",
  "透视",
];

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    const res: Response = await getSubjectDetail({ subject_id: id });
    subject.value = res;
    console.log(subject.value);
  } catch (err) {
    console.error("获取条目详情失败:", err);
    error.value = "获取条目详情失败，请稍后重试";
  } finally {
    loading.value = false;
  }
});

const formatInfoboxValue = (value: Kv[] | string): string => {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        const v = entry?.v ?? "";
        const k = entry?.k?.trim();
        return k ? `${k}: ${v}` : v;
      })
      .filter(Boolean)
      .join("、");
  }
  return value ?? "";
};

const reloadSubject = async () => {
  try {
    loading.value = true;
    error.value = null;
    const res: Response = await getSubjectDetail({ subject_id: id });
    subject.value = res;
  } catch (err) {
    console.error("获取条目详情失败:", err);
    error.value = "获取条目详情失败，请稍后重试";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center box-border pt-5">
    <!-- 加载状态 -->
    <div v-if="loading" class="flex flex-col w-full items-center">
      <!-- 标题骨架屏 -->
      <div class="flex justify-start w-9/12 h-8 leading-8 items-end ml-2 mb-4">
        <div class="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-32 ml-2 mb-1 animate-pulse"></div>
      </div>

      <!-- 导航栏骨架屏 -->
      <div class="flex flex-wrap w-9/12 mb-6">
        <div
          v-for="i in 5"
          :key="i"
          class="h-8 bg-gray-200 rounded w-16 mr-2 animate-pulse"
        ></div>
      </div>

      <!-- 主体骨架屏 -->
      <div class="w-9/12 flex gap-8">
        <!-- 图片骨架屏 -->
        <div class="w-64 flex-shrink-0" style="min-width: 16rem">
          <div class="h-96 rounded-xl bg-gray-200 animate-pulse"></div>

          <!-- 基本信息骨架屏 -->
          <div
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-4"
          >
            <div class="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
            <div class="space-y-3">
              <div
                v-for="i in 4"
                :key="i"
                class="py-2 border-b border-gray-100 last:border-b-0"
              >
                <div
                  class="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"
                ></div>
                <div class="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 简介骨架屏 -->
        <div class="flex-1 min-w-0 space-y-4">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="h-6 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="h-6 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="i in 5"
                :key="i"
                class="h-6 bg-gray-200 rounded-full w-16 animate-pulse"
              ></div>
            </div>
          </div>
        </div>

        <!-- 观看记录骨架屏 -->
        <div
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-64"
        >
          <div class="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-20 w-full"
    >
      <div
        class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6"
      >
        <svg
          class="w-10 h-10 text-red-500"
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
      <p class="text-gray-600 text-lg font-medium mb-2">加载失败</p>
      <p class="text-gray-500 text-sm mb-6">{{ error }}</p>
      <button
        @click="reloadSubject"
        class="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
      >
        重新加载
      </button>
    </div>

    <!-- 内容 -->
    <div
      v-else
      class="flex flex-col items-center justify-center box-border w-full"
    >
      <!-- 标题 -->
      <div class="flex justify-start w-9/12 h-8 leading-8 items-end ml-2">
        <span class="text-xl font-extrabold">
          {{ subject?.name_cn }}
        </span>
        <span class="text-sm font-normal text-gray-500 ml-2 mb-0.5">
          {{ subject?.name }}
        </span>
      </div>
      <!-- 导航栏 -->
      <div class="flex flex-wrap w-9/12">
        <div
          v-for="item in navigateList"
          :key="item"
          class="btn btn-ghost text-sm font-normal text-gray-500"
        >
          {{ item }}
        </div>
      </div>
      <!-- 主体 -->
      <div class="w-9/12 flex gap-8 mt-6">
        <!-- 图片 -->
        <div class="w-64 flex-shrink-0" style="min-width: 16rem">
          <div class="h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              :src="subject?.images.medium"
              alt="subject"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <!-- 基本信息（放在图片正下方） -->
          <div
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-4"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-3">基本信息</h3>
            <div class="flex flex-col gap-3">
              <div
                v-for="item in subject?.infobox"
                :key="item.key"
                class="flex flex-col gap-1 py-2 border-b border-gray-100 last:border-b-0"
              >
                <div class="font-medium text-gray-700 text-sm">
                  {{ item.key }}
                </div>
                <div class="text-gray-600 text-sm leading-relaxed">
                  {{ formatInfoboxValue(item.value as any) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 简介 -->
        <div class="flex-1 min-w-0 space-y-4">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">简介</h3>
            <div class="text-gray-600 leading-relaxed whitespace-pre-line">
              {{ subject?.summary || "暂无简介" }}
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">标签</h3>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="tag in subject?.tags"
                :key="tag.name"
                class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
              >
                {{ tag.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- 观看记录 -->
        <div
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-64"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-3">观看记录</h3>
          <div class="text-gray-600">
            <div class="flex items-center gap-2">
              <span class="text-gray-500">观看时间：</span>
              <span class="font-medium">2025-01-01</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
