<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Service } from "@/openapi/services/Service";

import type { UserSubjectCollection } from "@/openapi/models/UserSubjectCollection";

const userCollection = ref<UserSubjectCollection | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const getUserCollection = async () => {
  try {
    loading.value = true;
    error.value = null;
    const res = await Service.getUserCollection("657018", 292970);
    userCollection.value = res;
  } catch (err) {
    error.value = "加载收藏信息失败";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getUserCollection();
});
</script>

<template>
  <div>{{ userCollection?.subject?.name }}</div>
  <div>999</div>
</template>

<style scoped></style>
