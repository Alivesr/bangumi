<script setup lang="ts">
import { Service } from "@/openapi/services/Service";
import type { SubjectCollectionType } from "@/openapi/models/SubjectCollectionType";
import type { UserSubjectCollection } from "@/openapi/models/UserSubjectCollection";

import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const collections = ref<UserSubjectCollection[]>([]);
const route = useRoute();
const router = useRouter();
const username = route.params.id as string;
const handleClick = async (type: string) => {
  const res = await Service.getUserCollectionsByUsername(
    username,
    undefined,
    type as unknown as SubjectCollectionType,
  );
  collections.value = res.data ?? [];
  console.log(collections.value);
};
onMounted(() => {
  handleClick("1");
});
</script>

<template>
  <div class="mt-5 border-t border-gray-200 pt-4 px-4 max-w-[1000px] mx-auto">
    <!-- 顶部导航标签 -->
    <div class="flex gap-6 mb-6">
      <div
        class="text-base text-gray-500 hover:text-blue-500 cursor-pointer transition-colors"
      >
        收藏
      </div>
      <div
        class="text-base text-gray-500 hover:text-blue-500 cursor-pointer transition-colors"
      >
        时间线
      </div>
      <div
        class="text-base text-gray-500 hover:text-blue-500 cursor-pointer transition-colors"
      >
        讨论
      </div>
      <div
        class="text-base text-gray-500 hover:text-blue-500 cursor-pointer transition-colors"
      >
        关注
      </div>
    </div>

    <!-- 收藏状态筛选 -->
    <div class="flex gap-4 mb-6 flex-wrap">
      <div
        class="px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors"
        @click="handleClick('1')"
      >
        想看
      </div>
      <div
        class="px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors"
        @click="handleClick('2')"
      >
        看过
      </div>
      <div
        class="px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors"
        @click="handleClick('3')"
      >
        在看
      </div>
      <div
        class="px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors"
        @click="handleClick('4')"
      >
        搁置
      </div>
      <div
        class="px-4 py-2 text-base text-gray-700 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors"
        @click="handleClick('5')"
      >
        抛弃
      </div>
    </div>

    <!-- 收藏内容展示 -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 cursor-pointer"
    >
      <div
        v-for="collection in collections"
        :key="collection.subject_id"
        @click="router.push(`/subject/${collection.subject_id}`)"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="aspect-[2/3] overflow-hidden">
          <img
            :src="collection.subject?.images?.common"
            :alt="collection.subject?.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="p-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            {{ collection.subject?.name }}
          </h3>
          <p class="text-xs text-gray-500">
            {{ collection.subject?.date }}
          </p>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="collections.length === 0"
      class="text-center py-10 text-gray-500"
    >
      暂无收藏内容
    </div>
  </div>
</template>
