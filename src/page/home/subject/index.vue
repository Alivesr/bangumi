<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { searchSubjects } from "@/api/subject";
import type { Subject } from "@/types/subjectType";

const route = useRoute();
const searchResult = ref<Subject[]>([]);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    const currentId = route.params.id as string;
    const res = await searchSubjects({ keyword: currentId });
    searchResult.value = res.data || [];
  } finally {
    loading.value = false;
  }
};

const handleClick = (id: number) => {
  window.open(`https://bgm.tv/subject/${id}`, "_blank");
};

onMounted(fetchData);

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchData();
    }
  },
);
</script>

<template>
  <div class="font-bold text-xl mb-4">搜索结果</div>
  <n-spin
    v-if="loading"
    size="large"
    class="w-full min-h-[200px] flex justify-center items-center"
  />
  <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="item in searchResult"
      :key="item.id"
      @click="handleClick(item.id)"
      class="bg-white dark:bg-gray-800 rounded-lg cursor-pointer shadow p-4 flex gap-4 items-start hover:shadow-lg transition"
    >
      <img
        :src="item.images?.medium"
        alt="cover"
        class="w-20 h-28 object-cover rounded-md border"
      />
      <div class="flex-1">
        <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ item.name }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {{ item.name_cn }}
        </div>
        <div class="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
          {{ item.summary }}
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="tag in item.tags?.slice(0, 3)"
            :key="tag.name"
            class="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
