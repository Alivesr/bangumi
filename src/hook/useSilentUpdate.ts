import { ref, onMounted, type Ref } from "vue";

interface UseSilentUpdateOptions<T> {
  fetchFn: () => Promise<T>;
  cacheKey: string;
  cacheTime?: number;
  immediate?: boolean;
}

interface UseSilentUpdateReturn<T> {
  data: Ref<T | null>;
  isUpdating: Ref<boolean>;
  isLoading: Ref<boolean>;
  error: Ref<Error | null>;
  refresh: () => Promise<void>;
  clearCache: () => void;
  showSkeleton: Ref<boolean>; // 控制是否显示骨架屏
}

export function useSilentUpdate<T>({
  fetchFn,
  cacheKey,
  cacheTime = 60 * 60 * 1000,
  immediate = true,
}: UseSilentUpdateOptions<T>): UseSilentUpdateReturn<T> {
  const data = ref<T | null>(null);
  const isUpdating = ref(false);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const hasLoadedOnce = ref(false);
  const showSkeleton = ref(true); // 默认显示骨架屏 // 用于标记是否第一次加载

  const getCachedData = (): {
    data: T | null;
    error: Error | null;
    expireTime: number;
  } | null => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return null;
      const parsed = JSON.parse(cached);
      if (Date.now() > parsed.expireTime) {
        localStorage.removeItem(cacheKey);
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  };

  const saveToCache = (payload: { data: T | null; error: Error | null }) => {
    const cacheObject = { ...payload, expireTime: Date.now() + cacheTime };
    localStorage.setItem(cacheKey, JSON.stringify(cacheObject));
  };

  const clearCache = () => {
    localStorage.removeItem(cacheKey);
    data.value = null;
    error.value = null;
    hasLoadedOnce.value = false;
  };

  const fetchData = async (isBackgroundUpdate = false) => {
    // 首次加载且非后台更新时显示 loading
    if (!isBackgroundUpdate && !hasLoadedOnce.value) isLoading.value = true;
    if (isBackgroundUpdate) isUpdating.value = true;

    try {
      const result = await fetchFn();
      data.value = result;
      error.value = null;
      saveToCache({ data: result, error: null });
    } catch (err: any) {
      // 只缓存简化后的错误信息
      const simpleErr = new Error(err?.message || "请求失败");
      error.value = simpleErr;
      data.value = null;
      saveToCache({ data: null, error: simpleErr });
    } finally {
      isLoading.value = false;
      isUpdating.value = false;
      hasLoadedOnce.value = true; // 标记首次加载完成
      showSkeleton.value = false; // 首次加载完成后不再显示骨架屏
    }
  };

  const refresh = async () => {
    await fetchData(false);
  };

  const initialize = async () => {
    const cached = getCachedData();
    if (cached) {
      data.value = cached.data;
      error.value = cached.error;
      showSkeleton.value = false; // 有缓存数据时不显示骨架屏
      fetchData(true).catch(() => {}); // 后台静默刷新
    } else {
      await fetchData(false); // 首次加载
    }
  };

  if (immediate) {
    onMounted(() => {
      initialize();
    });
  }

  return {
    data,
    isUpdating,
    isLoading,
    error,
    refresh,
    clearCache,
    showSkeleton,
  };
}
