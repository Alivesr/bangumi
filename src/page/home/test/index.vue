<script setup lang="ts">
import { onMounted } from "vue";
import { Service } from "@/openapi";
import { useLocalStorageFetch } from "@/hook/useLocalStorageFetch";
import Test1 from "./components/test1.vue";

const CACHE_KEY = "user_collection_657018_292970";

const { data: item, load } = useLocalStorageFetch(CACHE_KEY, () =>
  Service.getUserCollection("657018", 292970),
);

const handleRefresh = () => {
  if (item.value && item.value.subject) {
    item.value.subject.name = "123";
  }
};

onMounted(() => {
  load();
});
</script>

<template>
  <div>
    <div v-if="item">{{ item?.subject?.name + "9999" }}</div>
    <button @click="handleRefresh">刷新</button>
    <Test1 />
  </div>
</template>
