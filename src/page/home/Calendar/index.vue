<script setup lang="ts">
import { getCalendar } from "@/api/calendar";
import { onMounted, ref, computed } from "vue";

import type { CalendarDay } from "@/types/calendarType";

const calendarData = ref<CalendarDay[]>([]);
const loading = ref(false);
const layout = ref<"grid" | "horizontal">("grid");
const showJumpCard = ref(true);

const getCalendarData = async () => {
  loading.value = true;
  try {
    const res = await getCalendar();

    calendarData.value = res as any as CalendarDay[];
    console.log(calendarData.value);
  } finally {
    loading.value = false;
  }
};

const handleClick = (item: { id: number }) => {
  window.open(`https://bgm.tv/subject/${item.id}`, "_blank");
};

const handleLayout = (mode: "grid" | "horizontal") => {
  layout.value = mode; // ✅ 正确设置 layout
};

const todayIndex = new Date().getDay(); // 0=周日, 1=周一, ..., 6=周六
const sortedCalendarData = computed(() => {
  if (!calendarData.value.length) return [];
  const idx = calendarData.value.findIndex(
    (day) => day.weekday.id === todayIndex,
  );
  if (idx === -1) return calendarData.value;
  return calendarData.value.slice(idx).concat(calendarData.value.slice(0, idx));
});

const scrollToWeekday = (id: number) => {
  const el = document.getElementById("weekday-" + id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

onMounted(() => {
  getCalendarData();
});
</script>

<template>
  <div
    class="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:px-20 md:py-12"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
    >
      <div
        class="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white text-center md:text-left"
      >
        每日放送
      </div>
      <div class="flex justify-end w-full md:w-auto">
        <div
          class="inline-flex rounded-md shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <button
            class="px-4 py-2 text-xl focus:outline-none transition-colors duration-200"
            :class="
              layout === 'grid'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'
            "
            @click="handleLayout('grid')"
            aria-label="网格布局"
          >
            <AppstoreOutlined class="w-6 h-6" />
          </button>
          <button
            class="px-4 py-2 text-xl focus:outline-none transition-colors duration-200 border-l border-gray-200 dark:border-gray-700"
            :class="
              layout === 'horizontal'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'
            "
            @click="handleLayout('horizontal')"
            aria-label="横向布局"
          >
            <BarsOutlined class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <NLoading />
    </div>

    <!-- grid布局：一行7列，每列一天 -->
    <div
      v-if="layout === 'grid' && !loading"
      class="grid grid-cols-1 md:grid-cols-7 gap-6"
    >
      <div
        v-for="day in calendarData"
        :key="day.weekday.id"
        class="flex flex-col items-center justify-start rounded-lg bg-white dark:bg-gray-800 p-4 min-h-[180px]"
      >
        <div class="font-bold text-blue-600 dark:text-blue-300 py-2 text-lg">
          {{ day.weekday.cn }}
        </div>
        <div class="flex flex-col items-center gap-3">
          <div
            v-for="item in day.items"
            :key="item.id"
            class="relative w-40 h-60 hover:scale-105 transition-all duration-300 cursor-pointer"
            @click="handleClick(item)"
          >
            <img
              :src="item.images?.large"
              alt="cover"
              class="rounded-lg w-full h-full object-cover shadow"
              style="background: none"
            />
            <div
              class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-xs text-center py-1 rounded-b-lg"
            >
              {{ item.name_cn || item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 横向布局：每周一栏，番剧横向排列，左对齐 -->
    <div
      v-else-if="!loading"
      class="flex flex-col items-start justify-start gap-8"
    >
      <div
        v-for="day in sortedCalendarData"
        :key="day.weekday.id"
        :id="'weekday-' + day.weekday.id"
        class="flex flex-col items-start justify-center mb-2 w-full"
      >
        <div
          class="text-2xl font-extrabold text-white bg-blue-500 dark:bg-blue-700 rounded-lg px-4 py-2 mb-4 shadow"
        >
          {{ day.weekday.cn }}
        </div>
        <div class="flex justify-start flex-wrap gap-3 w-full">
          <div
            v-for="item in day.items"
            :key="item.id"
            class="relative w-40 h-60 hover:scale-105 transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md"
            @click="handleClick(item)"
          >
            <img
              :src="item.images?.large"
              alt="cover"
              class="rounded-lg w-full h-full object-cover"
              style="background: none"
            />
            <div
              class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-xs text-center py-1 rounded-b-lg"
            >
              {{ item.name_cn || item.name }}
            </div>
          </div>
        </div>
      </div>
      <!-- 右下角星期跳转按钮，仅横向布局显示 -->
      <div
        v-if="layout === 'horizontal'"
        class="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2"
      >
        <button
          class="bg-white dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-blue-600 text-blue-500 dark:text-blue-200 hover:text-white rounded-full p-3 shadow-xl transition-all duration-200 border-2 border-blue-200 dark:border-blue-700 scale-110 hover:scale-125"
          @click="showJumpCard = !showJumpCard"
          aria-label="切换跳转卡片"
          style="box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.15)"
        >
          <span v-if="showJumpCard"><Close class="w-6 h-6" /></span>
          <span v-else><List20Filled class="w-6 h-6" /></span>
        </button>
        <NCard
          v-if="showJumpCard"
          style="max-width: 320px; border-radius: 1.25rem"
          title="快速跳转"
          size="small"
          class="shadow-2xl rounded-2xl"
        >
          <div class="flex flex-col gap-2">
            <button
              v-for="day in sortedCalendarData"
              :key="day.weekday.id"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow transition"
              @click="scrollToWeekday(day.weekday.id)"
            >
              {{ day.weekday.cn }}
            </button>
          </div>
        </NCard>
      </div>
    </div>
  </div>
</template>
