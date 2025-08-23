/**
 * 扩展的 API 请求选项，支持缓存配置
 */

import type { ApiRequestOptions } from "./ApiRequestOptions";

export interface CachedApiRequestOptions extends ApiRequestOptions {
  /**
   * 是否启用缓存
   */
  cache?: boolean;
  /**
   * 缓存时间（毫秒）
   */
  ttl?: number;
}