<!-- components/UserList.vue -->
<template>
  <div>
    <!-- 加载状态 -->
    <div v-if="isLoading && !data" class="loading">
      <p>加载中...</p>
      <!-- 可以放骨架屏 -->
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error">
      <p>加载失败: {{ error.message }}</p>
      <button @click="refresh">重试</button>
    </div>

    <!-- 正常显示 -->
    <div v-else>
      <!-- 静默更新提示 -->
      <div v-if="isUpdating" class="update-notice">正在后台更新数据...</div>

      <h2>用户列表 ({{ data?.length }} 人)</h2>

      <div v-if="data && data.length > 0">
        <div v-for="user in data" :key="user.id" class="user-item">
          {{ user.name }} - {{ user.email }}
        </div>
      </div>

      <p v-else>暂无数据</p>

      <button @click="refresh" :disabled="isLoading">
        {{ isLoading ? "更新中..." : "手动刷新" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSilentUpdate } from "@/hook/useSilentUpdate";

interface User {
  id: number;
  name: string;
  email: string;
}

// 模拟 API 请求
const fetchUsers = async (): Promise<User[]> => {
  // 这里模拟慢速请求
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("获取用户数据失败");
  }
  return response.json();
};

const { data, isUpdating, isLoading, error, refresh } = useSilentUpdate<User[]>(
  {
    fetchFn: fetchUsers,
    cacheKey: "users_data",
    cacheTime: 5 * 60 * 1000, // 5分钟缓存
    immediate: true,
  },
);
</script>

<style scoped>
.loading {
  opacity: 0.6;
}

.update-notice {
  background: #e3f2fd;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
}

.error {
  color: #d32f2f;
  background: #ffebee;
  padding: 16px;
  border-radius: 4px;
}
</style>
