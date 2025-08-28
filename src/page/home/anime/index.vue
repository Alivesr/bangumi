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

// 添加动画相关的响应式变量
const isAnimating = ref(false);

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
    );

    subjects.value = res.data || [];
    total.value = res.total || 0;
  } catch (error) {
    console.error("Failed to fetch anime subjects:", error);
    // 显示错误提示
    subjects.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
    isAnimating.value = false;
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
  isAnimating.value = true;
  currentPage.value = 1;
  getSubjects().finally(() => {
    isAnimating.value = false;
  });
};

onMounted(() => {
  getSubjects();
});
</script>

<template>
  <div class="flex-1 flex flex-col lg:flex-row px-4 justify-center">
    <!-- 主内容区域 -->
    <div class="flex-1 flex flex-col w-full max-w-4xl px-6">
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
      <div v-else class="max-w-4xl" :class="{ 'opacity-50': isAnimating }">
        <!-- 搜索结果统计 -->
        <div class="px-4 py-3 text-sm text-gray-600 bg-gray-50 rounded-lg mb-4">
          共 {{ total }} 条结果 (第 {{ currentPage }} 页，共
          {{ Math.ceil(total / pageSize) }} 页)
        </div>

        <!-- 无搜索结果提示 -->
        <div
          v-if="subjects.length === 0"
          class="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm"
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
        </div>

        <!-- 搜索结果列表 -->
        <div
          class="space-y-4 mb-6 transition-opacity duration-300"
          :class="{ 'opacity-50': isAnimating }"
          v-if="subjects.length > 0"
        >
          <div
            v-for="item in subjects"
            :key="item.id"
            @click="handleClick(item.id)"
            class="bg-white rounded-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200 group flex"
          >
            <div class="flex">
              <!-- 封面图片 -->
              <div class="relative flex-shrink-0">
                <img
                  class="w-24 h-36 object-cover transition-transform duration-500"
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
                <!-- 评分标签 -->
                <div
                  v-if="item.rating?.score"
                  class="absolute top-1 right-1 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center"
                >
                  <svg
                    class="w-2.5 h-2.5 mr-0.5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                  {{ item.rating.score.toFixed(1) }}
                </div>
              </div>

              <!-- 条目信息 -->
              <div class="flex flex-col p-4 flex-grow">
                <div class="flex items-start gap-2 mb-2">
                  <div
                    v-if="item.name_cn && item.name_cn.trim()"
                    class="font-semibold text-gray-900 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors duration-200"
                  >
                    {{ item.name_cn }}
                  </div>
                  <div
                    v-else
                    class="font-semibold text-gray-900 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors duration-200"
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
                <!-- 评分和收藏按钮 -->
                <div class="flex items-center justify-between mt-auto pt-2">
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
                    <div class="text-xs text-gray-500">
                      ({{ item.rating?.total || 0 }})
                    </div>
                  </div>
                  <button
                    class="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    @click.stop
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页按钮 -->
      <div
        v-if="!loading && total > pageSize"
        class="flex justify-center mt-6 mb-6 gap-2 flex-wrap transition-opacity duration-300"
        :class="{ 'opacity-50': isAnimating }"
      >
        <button
          class="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </button>

        <!-- 页码显示 -->
        <div
          class="flex items-center bg-white rounded-lg border border-gray-300"
        >
          <input
            type="number"
            :min="1"
            :max="Math.ceil(total / pageSize)"
            v-model="currentPage"
            @change="
              (e) =>
                handlePageChange(Number((e.target as HTMLInputElement).value))
            "
            class="w-16 px-3 py-2 text-center bg-transparent focus:outline-none"
          />
          <span class="text-gray-400 mx-1">/</span>
          <span class="text-gray-600 px-3 py-2">{{
            Math.ceil(total / pageSize)
          }}</span>
        </div>

        <button
          class="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage >= Math.ceil(total / pageSize)"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>

    <!-- 筛选栏 (仅在大屏幕显示) -->
    <div class="flex flex-col w-70 flex-shrink-0">
      <div class="bg-white rounded-xl p-5 flex-1 sticky top-6">
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
                  'px-3 py-1.5 text-sm rounded-full transition-all duration-200',
                  filters.category === item.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm',
                ]"
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <!-- 年份筛选 -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">年份</h4>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="item in yearOptions"
                :key="item.value"
                @click="filters.year = item.value"
                :class="[
                  'px-2 py-1.5 text-sm rounded-full transition-all duration-200 text-center',
                  filters.year === item.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm',
                ]"
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <!-- 月份筛选 -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">月份</h4>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="item in monthOptions"
                :key="item.value"
                @click="filters.month = item.value"
                :class="[
                  'px-2 py-1.5 text-sm rounded-full transition-all duration-200 text-center',
                  filters.month === item.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm',
                ]"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>

        <button
          @click="applyFilters"
          class="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-4"
        >
          应用筛选
        </button>
      </div>
    </div>
  </div>
</template>
