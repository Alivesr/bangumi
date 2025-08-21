<script setup lang="ts">
import { onMounted, ref } from "vue";
const token = ref("");
const user_id = ref("");
onMounted(() => {
  console.log("Callback Success");
  token.value = localStorage.getItem("token") || "";
  user_id.value = localStorage.getItem("user_id") || "";
  console.log(token.value, user_id.value);
});
</script>

<template>
  <div>
    <h1>Callback Success</h1>
    <p>登录成功</p>
    <p>token: {{ token }}</p>
    <p>user_id: {{ user_id }}</p>
  </div>
</template>

<style scoped></style>
