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
  showSkeleton: Ref<boolean>;
  shouldShowContent: Ref<boolean>;
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
  const showSkeleton = ref(true);
  const shouldShowContent = ref(false);

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
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ ...payload, expireTime: Date.now() + cacheTime }),
    );
  };

  const clearCache = () => {
    localStorage.removeItem(cacheKey);
    data.value = null;
    error.value = null;
    hasLoadedOnce.value = false;
    shouldShowContent.value = false;
    showSkeleton.value = true;
  };

  const fetchData = async (isBackgroundUpdate = false) => {
    if (!isBackgroundUpdate && !hasLoadedOnce.value) isLoading.value = true;
    if (isBackgroundUpdate) isUpdating.value = true;

    try {
      const result = await fetchFn();
      data.value = result;
      error.value = null;
      saveToCache({ data: result, error: null });
    } catch (err: any) {
      data.value = null;
      error.value = new Error("无法获取收藏信息"); // 自定义错误提示
      saveToCache({ data: null, error: error.value });
    } finally {
      isLoading.value = false;
      isUpdating.value = false;
      hasLoadedOnce.value = true;
      showSkeleton.value = false;
      shouldShowContent.value = true;
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
      showSkeleton.value = false;
      shouldShowContent.value = true;
      fetchData(true).catch(() => {}); // 静默刷新
    } else {
      await fetchData(false);
    }
  };

  if (immediate) onMounted(initialize);

  return {
    data: data as Ref<T | null>,
    isUpdating,
    isLoading,
    error,
    refresh,
    clearCache,
    showSkeleton,
    shouldShowContent,
  };
}
