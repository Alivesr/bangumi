<script setup lang="ts">
import { Service } from "@/openapi/services/Service";
import type { SubjectCollectionType } from "@/openapi/models/SubjectCollectionType";
import type { UserSubjectCollection } from "@/openapi/models/UserSubjectCollection";

import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const collections = ref<UserSubjectCollection[]>([]);
const route = useRoute();
const router = useRouter();
const username = route.params.id as string;
const loading = ref(false);
// 分页相关
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const type = ref<SubjectCollectionType | undefined>(undefined);

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value) || 1;
});

const fetchData = async (page = 1) => {
  loading.value = true;
  try {
    const offset = (page - 1) * pageSize.value;
    const res = await Service.getUserCollectionsByUsername(
      username,
      undefined,
      type.value,
      pageSize.value,
      offset,
    );
    collections.value = res.data || [];
    total.value = res.total || 0;
    currentPage.value = page;
  } catch (error) {
    console.error("获取收藏列表失败:", error);
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  fetchData(page);
};

const handleClick = async (collectionType: string) => {
  // 更新类型并重置页码
  type.value = collectionType as unknown as SubjectCollectionType;
  currentPage.value = 1;
  // 使用统一的fetchData方法获取数据
  await fetchData(1);
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

    <!-- 加载动画 -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-10">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
      <div class="text-gray-500 text-sm mt-2">正在加载...</div>
    </div>

    <!-- 收藏内容展示 -->
    <div
      v-else-if="collections.length > 0"
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
    <div v-else class="text-center py-10 text-gray-500">暂无收藏内容</div>
    <!-- 页码切换 -->
    <div
      v-if="!loading && total > pageSize"
      class="flex justify-center mt-6 mb-6 gap-2 pb-5"
    >
      <button
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >
        上一页
      </button>
      <span class="flex items-center px-4 text-gray-600">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentPage >= totalPages"
        @click="handlePageChange(currentPage + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>
