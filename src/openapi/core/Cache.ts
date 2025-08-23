/**
 * localStorage 缓存工具类
 * 为 OpenAPI 生成的 API 封装缓存功能
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class OpenAPICache {
  private static instance: OpenAPICache;
  private cachePrefix = 'openapi_cache_';

  private constructor() {}

  static getInstance(): OpenAPICache {
    if (!OpenAPICache.instance) {
      OpenAPICache.instance = new OpenAPICache();
    }
    return OpenAPICache.instance;
  }

  /**
   * 生成缓存键
   * @param url 请求URL
   * @param params 请求参数
   * @returns 缓存键
   */
  private generateCacheKey(url: string, params?: Record<string, any>): string {
    const paramStr = params ? JSON.stringify(params) : '';
    return `${this.cachePrefix}${url}_${paramStr}`;
  }

  /**
   * 设置缓存
   * @param url 请求URL
   * @param params 请求参数
   * @param data 缓存数据
   * @param ttl 缓存时间（毫秒）
   */
  set<T>(url: string, params: Record<string, any> | undefined, data: T, ttl: number): void {
    try {
      const key = this.generateCacheKey(url, params);
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl
      };
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.warn('Failed to set cache:', error);
    }
  }

  /**
   * 获取缓存
   * @param url 请求URL
   * @param params 请求参数
   * @returns 缓存数据或null
   */
  get<T>(url: string, params: Record<string, any> | undefined): T | null {
    try {
      const key = this.generateCacheKey(url, params);
      const item = localStorage.getItem(key);
      
      if (!item) {
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(item);
      
      // 检查是否过期
      if (Date.now() - entry.timestamp > entry.ttl) {
        // 过期则删除
        localStorage.removeItem(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('Failed to get cache:', error);
      return null;
    }
  }

  /**
   * 删除缓存
   * @param url 请求URL
   * @param params 请求参数
   */
  remove(url: string, params: Record<string, any> | undefined): void {
    try {
      const key = this.generateCacheKey(url, params);
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove cache:', error);
    }
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.cachePrefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  /**
   * 获取缓存信息
   * @returns 缓存统计信息
   */
  getCacheInfo(): { count: number; size: number } {
    try {
      let count = 0;
      let size = 0;
      
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(this.cachePrefix)) {
          count++;
          size += localStorage.getItem(key)?.length || 0;
        }
      });
      
      return { count, size };
    } catch (error) {
      console.warn('Failed to get cache info:', error);
      return { count: 0, size: 0 };
    }
  }
}

export default OpenAPICache.getInstance();