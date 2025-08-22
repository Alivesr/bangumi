<script lang="ts" setup>
import { Service } from "@/openapi/services/Service";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Collections from "./components/collections.vue";

interface UserInfo {
  avatar: {
    large: string;
    medium: string;
    small: string;
  };
  sign: string;
  url: string;
  username: string;
  nickname: string;
  id: number;
  user_group: number;
  reg_time: string;
  email: string;
  time_offset: number;
}

const route = useRoute();
const userId = ref("");
const userInfo = ref<UserInfo | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

userId.value = (route.params.id as string) ?? "";

const getUser = async () => {
  try {
    loading.value = true;
    error.value = null;
    const res = await Service.getMyself();
    userInfo.value = res as unknown as UserInfo;
    console.log(res);
  } catch (err) {
    error.value = "获取用户信息失败";
    console.error("获取用户信息失败:", err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 获取用户组名称
const getUserGroup = (group: number) => {
  const groups: Record<number, string> = {
    1: "管理员",
    2: "维护者",
    3: "用户",
    10: "普通用户",
  };
  return groups[group] || "未知";
};

onMounted(() => {
  getUser();
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-5">
    <div v-if="loading" class="text-center py-10 text-lg">加载中...</div>

    <div v-else-if="error" class="text-center py-10 text-lg text-red-500">
      {{ error }}
    </div>

    <div v-else-if="userInfo" class="flex md:flex-row items-center gap-6">
      <!-- 头像 -->
      <div class="flex justify-center">
        <img
          :src="userInfo.avatar.large"
          alt=""
          class="w-36 rounded-lg border-2 border-gray-200"
        />
      </div>

      <div class="text-center md:text-left w-full">
        <h1 class="text-3xl font-bold text-gray-800">
          {{ userInfo.nickname }}
        </h1>
        <p class="text-lg text-gray-600 mt-1">@{{ userInfo.username }}</p>

        <div class="flex flex-col gap-2 mt-4">
          <p class="text-base text-gray-700">
            注册时间: {{ formatDate(userInfo.reg_time) }}
          </p>
          <p class="text-base text-gray-700">
            用户组: {{ getUserGroup(userInfo.user_group) }}
          </p>
        </div>

        <div v-if="userInfo.sign" class="border-t border-gray-200 pt-5 mt-5">
          <p class="font-bold text-gray-800 mb-2">签名:</p>
          <p class="italic text-gray-600">{{ userInfo.sign }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-10 text-lg">未找到用户信息</div>
  </div>
  <Collections />
</template>
