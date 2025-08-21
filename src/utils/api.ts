import { useAuthStore } from "@/stores";

// 创建带认证头的 fetch 函数
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {},
) => {
  const authStore = useAuthStore();

  const headers = {
    "Content-Type": "application/json",
    ...authStore.getAuthHeaders,
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};

// 创建带认证头的 API 请求函数
export const apiRequest = async <T = any>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const response = await authenticatedFetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// 检查认证状态
export const checkAuth = () => {
  const authStore = useAuthStore();
  return authStore.isAuthenticated;
};

// 获取用户信息
export const getCurrentUser = () => {
  const authStore = useAuthStore();
  return authStore.user;
};
