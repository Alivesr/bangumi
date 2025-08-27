<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Service } from "@/openapi";
import { SubjectType } from "@/openapi/models/SubjectType";
import type { Subject } from "@/openapi/models/Subject";

const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(20);
const subjects = ref<Subject[]>([]);
const router = useRouter();
const showMobileFilters = ref(false);

// 筛选状态
const filters = ref({
  category: 0, // 分类: 0=全部, 1=TV, 5=WEB, 2=OVA, 3=剧场版, 6=动态漫画, 0=其他
  source: "", // 来源
  genre: "", // 类型
  area: "", // 地区
  audience: "", // 受众
  year: 0, // 年份: 0=全部
  month: 0, // 月份: 0=全部
  sort: "date", // 排序: date=按日期, rank=按排名
});

const categoryOptions = [
  { label: "全部", value: 0 },
  { label: "TV", value: 1 },
  { label: "OVA", value: 2 },
  { label: "剧场版", value: 3 },
  { label: "WEB", value: 5 },
];

const yearOptions = [
  { label: "全部", value: 0 },
  { label: "2024", value: 2024 },
  { label: "2023", value: 2023 },
  { label: "2022", value: 2022 },
  { label: "2021", value: 2021 },
  { label: "2020", value: 2020 },
  { label: "2019", value: 2019 },
  { label: "2018", value: 2018 },
  { label: "2017", value: 2017 },
  { label: "2016", value: 2016 },
  { label: "2015", value: 2015 },
  { label: "2014", value: 2014 },
  { label: "2013", value: 2013 },
  { label: "2012", value: 2012 },
  { label: "2011", value: 2011 },
  { label: "2010", value: 2010 },
  { label: "2009", value: 2009 },
  { label: "2008", value: 2008 },
  { label: "2007", value: 2007 },
  { label: "2006", value: 2006 },
  { label: "2005", value: 2005 },
  { label: "2004", value: 2004 },
  { label: "2003", value: 2003 },
  { label: "2002", value: 2002 },
  { label: "2001", value: 2001 },
  { label: "2000", value: 2000 },
];
const monthOptions = [
  { label: "全部", value: 0 },
  { label: "1月", value: 1 },
  { label: "2月", value: 2 },
  { label: "3月", value: 3 },
  { label: "4月", value: 4 },
  { label: "5月", value: 5 },
  { label: "6月", value: 6 },
  { label: "7月", value: 7 },
  { label: "8月", value: 8 },
  { label: "9月", value: 9 },
  { label: "10月", value: 10 },
  { label: "11月", value: 11 },
  { label: "12月", value: 12 },
];

// 重置筛选
const resetFilters = () => {
  filters.value.category = 0;
  filters.value.year = 0;
  filters.value.month = 0;
  applyFilters();
};

const getSubjects = async () => {
  try {
    loading.value = true;
    const offset = (currentPage.value - 1) * pageSize.value;

    // 构建筛选参数
    const params: any = {
      type: SubjectType.Anime,
      limit: pageSize.value,
      offset: offset,
    };

    // 添加分类筛选
    if (filters.value.category !== 0) {
      params.category = filters.value.category;
    }

    // 添加年份筛选
    if (filters.value.year !== 0) {
      params.year = filters.value.year;
    }

    // 添加月份筛选
    if (filters.value.month !== 0) {
      params.month = filters.value.month;
    }

    // 添加排序
    if (filters.value.sort === "rank") {
      params.order = "rank";
    } else {
      params.order = "date";
    }

    const res = await Service.getSubjects(
      params.type,
      params.category,
      undefined, // series
      undefined, // platform
      undefined, // sort
      params.year,
      params.month,
      params.limit,
      params.offset,
      params.order,
    );

    subjects.value = res.data || [];
    total.value = res.total || 0;
  } catch (error) {
    console.error("Failed to fetch anime subjects:", error);
  } finally {
    loading.value = false;
  }
};

const handleClick = (id: number) => {
  router.push(`/subject/${id}`);
};

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= Math.ceil(total.value / pageSize.value)) {
    currentPage.value = page;
    getSubjects();
  }
};

// 应用筛选
const applyFilters = () => {
  currentPage.value = 1;
  getSubjects();
};

// 应用筛选并关闭移动端筛选面板
const applyFiltersAndClose = () => {
  applyFilters();
  showMobileFilters.value = false;
};

onMounted(() => {
  getSubjects();
});
</script>

<template>
  <div class="flex-1 flex">
    <!-- 主内容区域 -->
    <div class="flex-1 flex flex-col">
      <!-- 加载状态 -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-16"
      >
        <div
          class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6"
        >
          <div
            class="w-10 h-10 border-t-2 border-blue-500 border-solid rounded-full animate-spin"
          ></div>
        </div>
        <p class="text-gray-600 text-lg font-medium">
          正在加载动漫条目，请稍候...
        </p>
      </div>

      <!-- 搜索结果 -->
      <ul v-else class="list w-full bg-base-100 rounded-box shadow-md">
        <!-- 搜索结果统计 -->
        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
          共 {{ total }} 条结果 (第 {{ currentPage }} 页，共
          {{ Math.ceil(total / pageSize) }} 页)
        </li>

        <!-- 无搜索结果提示 -->
        <li
          v-if="subjects.length === 0"
          class="flex flex-col items-center justify-center py-16"
        >
          <div
            class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6"
          >
            <svg
              class="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <p class="text-gray-600 text-lg font-medium">未找到相关动漫条目</p>
          <p class="text-gray-500 mt-2">请稍后再试或联系管理员</p>
        </li>

        <!-- 搜索结果列表 -->
        <li
          class="list-row transition-colors duration-200"
          v-for="item in subjects"
          :key="item.id"
          @click="handleClick(item.id)"
        >
          <div
            class="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 cursor-pointer rounded-lg hover:shadow-sm transition-all duration-200"
          >
            <!-- 封面图片 -->
            <div class="flex-shrink-0">
              <img
                class="w-16 h-24 rounded-md object-cover shadow-sm transition-transform duration-300 hover:scale-105"
                :src="
                  item.images?.medium ||
                  item.images?.common ||
                  '/placeholder-image.png'
                "
                :alt="item.name_cn || item.name"
                @error="
                  ($event) =>
                    (($event.target as HTMLImageElement).src =
                      '/placeholder-image.png')
                "
                loading="lazy"
              />
            </div>

            <!-- 条目信息 -->
            <div class="flex flex-col justify-center flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <div
                  v-if="item.name_cn && item.name_cn.trim()"
                  class="font-semibold text-gray-900 dark:text-gray-100 truncate cursor-pointer text-base"
                >
                  {{ item.name_cn }}
                </div>
                <div
                  :class="[
                    !item.name_cn || !item.name_cn.trim()
                      ? 'font-semibold text-gray-900 dark:text-gray-100 truncate cursor-pointer text-base'
                      : 'text-sm uppercase font-semibold opacity-60',
                  ]"
                >
                  {{ item.name }}
                </div>
              </div>

              <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span v-if="item.date">{{ item.date }}</span>
                <span v-if="item.platform" class="capitalize">{{
                  item.platform
                }}</span>
                <span v-if="item.eps > 0">{{ item.eps }}话</span>
              </div>

              <!-- 标签 -->
              <div
                class="flex flex-wrap gap-1 mb-2"
                v-if="item.meta_tags && item.meta_tags.length > 0"
              >
                <div
                  v-for="tag in item.meta_tags.slice(0, 3)"
                  :key="tag"
                  class="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full"
                >
                  {{ tag }}
                </div>
              </div>

              <!-- 评分 -->
              <div class="flex items-center gap-2">
                <div class="rating rating-sm rating-half">
                  <template v-for="i in 10" :key="i">
                    <input
                      type="radio"
                      :name="'rating-' + item.id"
                      :class="[
                        'mask mask-star-2',
                        i % 2 === 1 ? 'mask-half-1' : 'mask-half-2',
                        'bg-yellow-300',
                      ]"
                      :checked="
                        item.rating &&
                        Math.round((item.rating.score / 2) * 2) === i
                      "
                      disabled
                    />
                  </template>
                </div>
                <div class="text-xs font-semibold text-gray-700">
                  {{
                    item.rating?.score
                      ? item.rating.score.toFixed(1)
                      : "暂无评分"
                  }}
                </div>
                <div class="text-xs text-gray-500">
                  ({{ item.rating?.total || 0 }}人评分)
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 分页按钮 -->
      <div
        v-if="!loading && total > pageSize"
        class="flex justify-center mt-6 mb-6 gap-2 flex-wrap"
      >
        <button
          class="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </button>

        <!-- 页码显示 -->
        <div class="flex items-center">
          <input
            type="number"
            :min="1"
            :max="Math.ceil(total / pageSize)"
            v-model="currentPage"
            @change="
              (e) =>
                handlePageChange(Number((e.target as HTMLInputElement).value))
            "
            class="w-16 px-2 py-2 text-center border border-gray-300 rounded-lg mx-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span class="text-gray-600 mx-1">/</span>
          <span class="text-gray-600 mx-1">{{
            Math.ceil(total / pageSize)
          }}</span>
        </div>

        <button
          class="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          :disabled="currentPage >= Math.ceil(total / pageSize)"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>

    <!-- 筛选栏 (仅在大屏幕显示) -->
    <div class="hidden lg:flex flex-col w-64 flex-shrink-0 ml-6">
      <div class="bg-white rounded-xl shadow-lg p-5 flex-1">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-lg font-bold text-gray-800">筛选</h3>
          <button
            @click="resetFilters"
            class="text-xs text-blue-500 hover:text-blue-700 font-medium"
          >
            重置
          </button>
        </div>

        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <!-- 分类筛选 -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">分类</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="item in categoryOptions"
                :key="item.value"
                @click="filters.category = item.value"
                :class="[
                  'px-3 py-1.5 text-sm rounded-lg transition-colors duration-150',
                  filters.category === item.value
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <!-- 年份筛选 -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">年份</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="item in yearOptions"
                :key="item.value"
                @click="filters.year = item.value"
                :class="[
                  'px-3 py-1.5 text-sm rounded-lg transition-colors duration-150',
                  filters.year === item.value
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <!-- 月份筛选 -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">月份</h4>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="item in monthOptions"
                :key="item.value"
                @click="filters.month = item.value"
                :class="[
                  'px-2 py-1.5 text-sm rounded-lg transition-colors duration-150 text-center',
                  filters.month === item.value
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>

        <button
          @click="applyFilters"
          class="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          应用筛选
        </button>
      </div>
    </div>

    <!-- 浮动筛选按钮 (移动端) -->
    <div class="lg:hidden fixed bottom-6 right-6 z-10">
      <button
        @click="showMobileFilters = true"
        class="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-200"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          ></path>
        </svg>
      </button>
    </div>

    <!-- 移动端筛选抽屉 -->
    <div
      v-if="showMobileFilters"
      class="lg:hidden fixed inset-0 z-50 overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        @click="showMobileFilters = false"
      ></div>
      <div class="absolute inset-y-0 right-0 max-w-full flex">
        <div class="relative w-screen max-w-sm">
          <div class="h-full flex flex-col bg-white shadow-xl">
            <div class="flex items-center justify-between px-4 py-6 border-b">
              <h2 class="text-lg font-medium text-gray-900">筛选</h2>
              <button
                @click="showMobileFilters = false"
                class="text-gray-400 hover:text-gray-500"
              >
                <svg
                  class="w-6 h-6"
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
              </button>
            </div>
            <div class="flex-1 overflow-y-auto p-4">
              <!-- 分类筛选 -->
              <div class="mb-6">
                <h3 class="text-md font-medium text-gray-900 mb-3">分类</h3>
                <div class="space-y-2">
                  <label
                    class="flex items-center cursor-pointer group"
                    v-for="item in categoryOptions"
                    :key="item.value"
                  >
                    <input
                      type="radio"
                      v-model="filters.category"
                      :value="item.value"
                      class="radio radio-primary radio-sm group-hover:radio-accent"
                    />
                    <span
                      class="ml-2 text-sm text-gray-700 group-hover:text-gray-900"
                      >{{ item.label }}</span
                    >
                  </label>
                </div>
              </div>

              <!-- 年份筛选 -->
              <div class="mb-6">
                <h3 class="text-md font-medium text-gray-900 mb-3">年份</h3>
                <div class="space-y-2 max-h-40 overflow-y-auto pr-2">
                  <label
                    class="flex items-center cursor-pointer group"
                    v-for="item in yearOptions"
                    :key="item.value"
                  >
                    <input
                      type="radio"
                      v-model="filters.year"
                      :value="item.value"
                      class="radio radio-primary radio-sm group-hover:radio-accent"
                    />
                    <span
                      class="ml-2 text-sm text-gray-700 group-hover:text-gray-900"
                      >{{ item.label }}</span
                    >
                  </label>
                </div>
              </div>

              <!-- 月份筛选 -->
              <div class="mb-6">
                <h3 class="text-md font-medium text-gray-900 mb-3">月份</h3>
                <div class="grid grid-cols-3 gap-2">
                  <label
                    class="flex items-center justify-center cursor-pointer group py-2 px-3 rounded-md hover:bg-gray-100"
                    v-for="item in monthOptions"
                    :key="item.value"
                  >
                    <input
                      type="radio"
                      v-model="filters.month"
                      :value="item.value"
                      class="radio radio-primary radio-sm group-hover:radio-accent hidden"
                    />
                    <span
                      class="text-sm text-gray-700 group-hover:text-gray-900"
                      >{{ item.label }}</span
                    >
                  </label>
                </div>
              </div>
            </div>
            <div class="border-t p-4">
              <button
                @click="applyFiltersAndClose"
                class="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                应用筛选
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
