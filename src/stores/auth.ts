import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface User {
  id: string;
  username?: string;
  nickname?: string;
  avatar?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuthStore = defineStore("auth", () => {
  // 状态
  const token = ref<string | null>(null);
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  // 计算属性
  const isAuthenticated = computed(() => !!token.value);
  const hasToken = computed(() => !!token.value);

  // 从 localStorage 恢复状态
  const initializeAuth = () => {
    try {
      const savedToken = localStorage.getItem("bangumi_token");
      const savedUser = localStorage.getItem("bangumi_user");

      if (savedToken) {
        token.value = savedToken;
      }

      if (savedUser) {
        user.value = JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("恢复认证状态失败:", error);
      clearAuth();
    }
  };

  // 设置认证信息
  const setAuth = (newToken: string, userData: User) => {
    token.value = newToken;
    user.value = userData;

    // 保存到 localStorage
    localStorage.setItem("bangumi_token", newToken);
    localStorage.setItem("bangumi_user", JSON.stringify(userData));
  };

  // 更新用户信息
  const updateUser = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData };
      localStorage.setItem("bangumi_user", JSON.stringify(user.value));
    }
  };

  // 设置加载状态
  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  // 清除认证信息
  const clearAuth = () => {
    token.value = null;
    user.value = null;

    // 清除 localStorage
    localStorage.removeItem("bangumi_token");
    localStorage.removeItem("bangumi_user");
  };

  // 登出
  const logout = () => {
    clearAuth();
    // 可以在这里添加其他登出逻辑，比如调用登出 API
  };

  // 检查 token 是否有效（可选：添加过期时间检查）
  const isTokenValid = computed(() => {
    if (!token.value) return false;
    // 这里可以添加 token 过期时间检查逻辑
    return true;
  });

  // 获取认证头（用于 API 请求）
  const getAuthHeaders = computed(() => {
    if (!token.value) return {};

    return {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    };
  });

  return {
    // 状态
    token,
    user,
    isLoading,

    // 计算属性
    isAuthenticated,
    hasToken,
    isTokenValid,
    getAuthHeaders,

    // 方法
    initializeAuth,
    setAuth,
    updateUser,
    setLoading,
    clearAuth,
    logout,
  };
});
