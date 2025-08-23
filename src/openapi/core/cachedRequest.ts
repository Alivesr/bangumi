/**
 * 带缓存功能的请求封装
 * 为 OpenAPI 生成的 API 添加缓存支持
 */

import type { ApiRequestOptions } from "./ApiRequestOptions";
import type { OpenAPIConfig } from "./OpenAPI";
import { request as __request } from "./request";
import OpenAPICache from "./Cache";
import type { CachedApiRequestOptions } from "./CachedApiRequestOptions";
import type { CancelablePromise } from "./CancelablePromise";

// 默认缓存时间：5分钟
const DEFAULT_TTL = 5 * 60 * 1000;

/**
 * 带缓存功能的请求方法
 * @param config OpenAPI配置
 * @param options 请求选项
 * @param cacheOptions 缓存选项
 * @returns CancelablePromise<T>
 */
export const cachedRequest = <T>(
  config: OpenAPIConfig, 
  options: ApiRequestOptions, 
  cacheOptions: { cache?: boolean; ttl?: number } = {}
): CancelablePromise<T> => {
  return new CancelablePromise(async (resolve, reject) => {
    const { cache = false, ttl = DEFAULT_TTL } = cacheOptions;
    
    // 如果未启用缓存，直接发送请求
    if (!cache) {
      try {
        const response = await __request<T>(config, options);
        resolve(response);
      } catch (error) {
        reject(error);
      }
      return;
    }
    
    // 生成缓存键
    const cacheKey = options.url;
    const cacheParams = {
      ...options.path,
      ...options.query,
      ...options.formData
    };
    
    // 尝试从缓存获取数据
    const cachedData = OpenAPICache.get<T>(cacheKey, cacheParams);
    if (cachedData !== null) {
      resolve(cachedData);
      return;
    }
    
    // 发送请求并缓存结果
    try {
      const response = await __request<T>(config, options);
      OpenAPICache.set(cacheKey, cacheParams, response, ttl);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 清除指定请求的缓存
 * @param options 请求选项
 */
export const clearCache = (options: ApiRequestOptions): void => {
  const cacheKey = options.url;
  const cacheParams = {
    ...options.path,
    ...options.query,
    ...options.formData
  };
  OpenAPICache.remove(cacheKey, cacheParams);
};

/**
 * 清除所有缓存
 */
export const clearAllCache = (): void => {
  OpenAPICache.clear();
};