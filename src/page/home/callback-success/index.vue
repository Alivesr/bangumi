<script setup lang="ts">
import { onMounted } from "vue";
onMounted(() => {
  console.log("Callback Success");
});
</script>

<template>
  <div>
    <h1>Callback Success</h1>
    <p>登录成功</p>
  </div>
</template>

<style scoped></style>
