<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import searchSubjects from "@/api/subject";
import type { Subject } from "@/types/subject/subjectType";

const router = useRouter();
const route = useRoute();

const menuList = [
  { label: "全部", value: 0 },
  { label: "动画", value: 2 },
  { label: "书籍", value: 1 },
  { label: "音乐", value: 3 },
  { label: "游戏", value: 4 },
  { label: "三次元", value: 6 },
];

const currentType = computed(() => Number(route.query.type) || 0);

function handleMenuClick(type: number) {
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      type: type ? type.toString() : undefined,
    },
  });
}

const searchResult = ref<Subject[]>([]);
const loading = ref(false);
const type = computed(() =>
  route.query.type ? Number(route.query.type) : undefined,
);

// 分页相关
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);

const fetchData = async (page = 1) => {
  loading.value = true;
  try {
    const currentId = route.params.id as string;
    const offset = (page - 1) * pageSize.value;
    const res = await searchSubjects.searchSubjects({
      keyword: currentId,
      filter: { type: type.value ? [type.value] : undefined },
      limit: pageSize.value,
      offset: offset,
    });
    searchResult.value = res.data || [];
    total.value = res.total || 0;
    currentPage.value = page;
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  fetchData(page);
};

const handleClick = (id: number) => {
  router.push(`/subject/${id}`);
};

onMounted(() => fetchData(1));

watch([() => route.params.id, () => route.query.type], () => {
  fetchData(1);
});
</script>

<template>
  <div class="flex w-full max-w-5xl mx-auto pt-8 px-2">
    <!-- 左侧菜单 -->
    <ul class="flex flex-col gap-2 w-32 mr-6">
      <li
        v-for="item in menuList"
        :key="item.value"
        :class="[
          'cursor-pointer px-4 py-2 rounded text-center transition',
          currentType === item.value
            ? 'bg-blue-500 text-white font-bold'
            : 'hover:bg-blue-100 dark:hover:bg-gray-700',
        ]"
        @click="handleMenuClick(item.value)"
      >
        {{ item.label }}
      </li>
    </ul>

    <!-- 右侧内容 -->
    <div class="flex-1">
      <ul class="list w-full bg-base-100 rounded-box shadow-md">
        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
          {{ total }} 条结果 (第 {{ currentPage }} 页，共
          {{ Math.ceil(total / pageSize) }} 页)
        </li>
        <li
          class="list-row"
          v-for="item in searchResult"
          :key="item.id"
          @click="handleClick(item.id)"
        >
          <div>
            <img class="w-23 h-32 rounded-md" :src="item.images?.common" />
          </div>
          <div class="flex flex-col justify-center">
            <div class="flex items-center gap-2">
              <div
                v-if="item.name_cn && item.name_cn.trim()"
                class="font-semibold text-gray-900 dark:text-gray-100 truncate cursor-pointer"
              >
                {{ item.name_cn }}
              </div>
              <div
                :class="[
                  !item.name_cn || !item.name_cn.trim()
                    ? 'font-semibold text-gray-900 dark:text-gray-100 truncate cursor-pointer'
                    : 'text-xs uppercase font-semibold opacity-60',
                ]"
              >
                {{ item.name }}
              </div>
            </div>
            <div
              class="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2"
            >
              {{ item.date }}/{{ item.infobox?.[9]?.value }}/{{
                item.infobox?.[12]?.value
              }}/{{ item.infobox?.[16]?.value }}
            </div>
            <div
              class="flex flex-wrap gap-2 text-xs uppercase font-semibold opacity-60"
            >
              <div v-for="tag in item.meta_tags" :key="tag">
                {{ tag }}
              </div>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <div class="rating rating-sm rating-half pl-0 ml-0">
                <template v-for="i in 10">
                  <input
                    type="radio"
                    :name="'rating-' + item.id"
                    :class="[
                      'mask mask-star-2',
                      i % 2 === 1 ? 'mask-half-1' : 'mask-half-2',
                      'bg-yellow-300',
                      'cursor-pointer',
                    ]"
                    :aria-label="i * 0.5 + ' star'"
                    :checked="
                      item.rating &&
                      Math.round((item.rating.score / 2) * 2) === i
                    "
                    disabled
                  />
                </template>
              </div>
              <div class="text-xs uppercase font-semibold opacity-60">
                {{ item.rating?.score }}
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 分页按钮 -->
      <div v-if="total > pageSize" class="flex justify-center mt-4 mb-4 gap-2">
        <button
          class="btn btn-sm bg-white"
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </button>
        <span class="flex items-center px-4">
          {{ currentPage }} / {{ Math.ceil(total / pageSize) }}
        </span>
        <button
          class="btn btn-sm bg-white"
          :disabled="currentPage >= Math.ceil(total / pageSize)"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>
