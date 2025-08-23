import { ref } from "vue";

/**
 * 一个简单的 localStorage 缓存 + 静默刷新 Hook
 * @param key localStorage 的缓存 key
 * @param fetcher 一个返回 Promise 的接口函数
 */
export function useLocalStorageFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
) {
  const data = ref<T | null>(null); // 页面渲染数据
  const loading = ref(false); // 首次加载状态
  const silentLoading = ref(false); // 静默刷新状态
  const error = ref<string | null>(null); // 错误状态
  const hasCache = ref(false); // 是否有缓存数据

  // 加载数据函数
  const load = async () => {
    // 设置首次加载状态
    loading.value = true;
    error.value = null;

    try {
      // 1. 先从 localStorage 读取缓存（静默渲染）
      const cacheStr = localStorage.getItem(key);
      if (cacheStr) {
        data.value = JSON.parse(cacheStr);
        hasCache.value = true;
      }

      // 2. 静默刷新：后台请求最新数据
      silentLoading.value = true;
      const res = await fetcher();
      data.value = res; // 更新页面
      localStorage.setItem(key, JSON.stringify(res)); // 更新缓存
      hasCache.value = true;
    } catch (err) {
      // 如果没有缓存数据，则显示错误
      if (!hasCache.value) {
        error.value = "暂未收藏";
      }
      console.error("请求失败", err);
    } finally {
      loading.value = false;
      silentLoading.value = false;
    }
  };

  return { data, loading, silentLoading, error, load, hasCache };
}
