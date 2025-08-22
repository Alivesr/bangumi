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
    <div class="flex gap-6 mb-6 border-b border-gray-200 pb-2">
      <div
        class="text-base text-blue-600 font-medium border-b-2 border-blue-600 pb-2 cursor-pointer transition-colors"
      >
        收藏
      </div>
      <div
        class="text-base text-gray-500 hover:text-blue-500 cursor-pointer transition-colors pb-2"
      >
        时间线
      </div>
      <div
        class="text-base text-gray-500 hover:text-blue-500 cursor-pointer transition-colors pb-2"
      >
        讨论
      </div>
      <div
        class="text-base text-gray-500 hover:text-blue-500 cursor-pointer transition-colors pb-2"
      >
        关注
      </div>
    </div>

    <!-- 收藏状态筛选 -->
    <div class="flex gap-3 mb-6 flex-wrap">
      <div
        :class="[
          'px-4 py-2 text-base rounded-full cursor-pointer transition-colors',
          type === '1' 
            ? 'bg-blue-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
        ]"
        @click="handleClick('1')"
      >
        想看
      </div>
      <div
        :class="[
          'px-4 py-2 text-base rounded-full cursor-pointer transition-colors',
          type === '2' 
            ? 'bg-green-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-600'
        ]"
        @click="handleClick('2')"
      >
        看过
      </div>
      <div
        :class="[
          'px-4 py-2 text-base rounded-full cursor-pointer transition-colors',
          type === '3' 
            ? 'bg-yellow-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-600'
        ]"
        @click="handleClick('3')"
      >
        在看
      </div>
      <div
        :class="[
          'px-4 py-2 text-base rounded-full cursor-pointer transition-colors',
          type === '4' 
            ? 'bg-gray-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-600'
        ]"
        @click="handleClick('4')"
      >
        搁置
      </div>
      <div
        :class="[
          'px-4 py-2 text-base rounded-full cursor-pointer transition-colors',
          type === '5' 
            ? 'bg-red-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
        ]"
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
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
    >
      <div
        v-for="collection in collections"
        :key="collection.subject_id"
        @click="router.push(`/subject/${collection.subject_id}`)"
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      >
        <div class="aspect-[2/3] overflow-hidden relative">
          <img
            :src="collection.subject?.images?.common"
            :alt="collection.subject?.name"
            class="w-full h-full object-cover"
          />
          <!-- 收藏状态标签 -->
          <div 
            v-if="collection.type"
            :class="[
              'absolute top-2 right-2 px-2 py-1 text-xs rounded-full',
              collection.type === 1 ? 'bg-blue-500 text-white' :
              collection.type === 2 ? 'bg-green-500 text-white' :
              collection.type === 3 ? 'bg-yellow-500 text-white' :
              collection.type === 4 ? 'bg-gray-500 text-white' :
              collection.type === 5 ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-800'
            ]"
          >
            {{ 
              collection.type === 1 ? '想看' :
              collection.type === 2 ? '看过' :
              collection.type === 3 ? '在看' :
              collection.type === 4 ? '搁置' :
              collection.type === 5 ? '抛弃' : '未知'
            }}
          </div>
        </div>
        <div class="p-3">
          <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
            {{ collection.subject?.name_cn || collection.subject?.name }}
          </h3>
          <p class="text-xs text-gray-500 mb-2">
            {{ collection.subject?.date }}
          </p>
          <!-- 评分 -->
          <div v-if="collection.rate && collection.rate > 0" class="flex items-center mb-2">
            <div class="flex text-yellow-400">
              <span 
                v-for="i in 5" 
                :key="i"
                class="text-xs"
                :class="i <= collection.rate ? 'text-yellow-400' : 'text-gray-300'"
              >
                ★
              </span>
            </div>
            <span class="text-xs text-gray-500 ml-1">{{ collection.rate }}分</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="text-center py-16 text-gray-500">
      <div class="flex justify-center mb-4">
        <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
      </div>
      <p class="text-lg">暂无收藏内容</p>
      <p class="text-sm mt-1">快去发现你喜欢的作品吧！</p>
    </div>
    <!-- 页码切换 -->
    <div
      v-if="!loading && total > pageSize"
      class="flex justify-center mt-8 mb-8 gap-2"
    >
      <button
        class="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >
        上一页
      </button>
      <div class="flex items-center px-4 text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm">
        {{ currentPage }} / {{ totalPages }}
      </div>
      <button
        class="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        :disabled="currentPage >= totalPages"
        @click="handlePageChange(currentPage + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>
