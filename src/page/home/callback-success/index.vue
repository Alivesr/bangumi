<script setup lang="ts">
import { onMounted, ref } from "vue";
const token = ref("");
const user_id = ref("");

const getToken = async () => {
  // Use relative path to avoid CORS issues in development
  const res = await fetch("https://bangumi-alpha.vercel.app/api/getToken", {
    credentials: "include", // 关键！发送 Cookie
  });
  const data = await res.json();
  console.log(data);
  token.value = data.access_token;
  user_id.value = data.user_id;
};
onMounted(() => {
  getToken();
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
