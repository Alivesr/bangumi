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

  // 修复 headers 类型问题，确保所有 header 的值都是字符串
  const normalizedHeaders: Record<string, string> = {};

  // 合并 headers，确保值为字符串
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value !== "undefined") {
      normalizedHeaders[key] = String(value);
    }
  }

  return fetch(url, {
    ...options,
    headers: normalizedHeaders,
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
