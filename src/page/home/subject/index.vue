<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSubjectDetail } from "@/api/subject";
import type { Response, Kv } from "@/types/subject/getSubjectTypes";

const route = useRoute();
const id = Number(route.params.id);

const subject = ref<Response>();

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
  const res: Response = await getSubjectDetail({ subject_id: id });
  subject.value = res;
  console.log(subject.value);
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
</script>

<template>
  <div class="flex flex-col items-center justify-center box-border">
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
    <!-- 简介 -->
  </div>
</template>
