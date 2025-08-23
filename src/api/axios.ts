import axios, { AxiosRequestConfig } from "axios";

interface CacheConfig {
  cache?: boolean; // 是否启用缓存
  ttl?: number; // 缓存有效期（毫秒），默认5分钟
}

// 扩展 AxiosRequestConfig 以支持缓存配置
interface AxiosRequestConfigWithCache extends AxiosRequestConfig {
  cache?: boolean;
  ttl?: number;
}

const api = axios.create({
  baseURL: "https://api.bgm.tv",
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const cacheCfg = config as AxiosRequestConfigWithCache;
  if (cacheCfg.cache) {
    const ttl = cacheCfg.ttl ?? 300000; // 默认5分钟
    const cacheKey = `cache_${config.url}_${JSON.stringify(config.params || {})}`;

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, time } = JSON.parse(cached);
      if (Date.now() - time < ttl) {
        // ⚠️ 特殊标记，交给响应拦截器处理
        return Promise.reject({ __fromCache: true, data });
      }
    }
    // 把 cacheKey 绑定到 config 上，方便响应拦截器写入
    (config as any)._cacheKey = cacheKey;
  }

  return config;
});

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    const cacheKey = (response.config as any)._cacheKey;
    if (cacheKey) {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: response.data,
          time: Date.now(),
        }),
      );
    }
    return response.data;
  },
  (error) => {
    if (error.__fromCache) {
      return Promise.resolve(error.data);
    }
    return Promise.reject(error);
  },
);

export default api;
