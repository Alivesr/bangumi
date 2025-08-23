# OpenAPI 缓存功能使用说明

## 简介

本项目为 OpenAPI 生成的 API 客户端添加了 localStorage 缓存功能，以提高应用性能并减少不必要的网络请求。

## 核心组件

1. `CachedService` - 带缓存功能的服务类
2. `OpenAPICache` - 缓存管理器
3. `cachedRequest` - 带缓存的请求函数

## 使用方法

### 1. 使用 CachedService（推荐）

```typescript
import { CachedService } from '@/openapi';

// 获取条目信息（带缓存）
const subject = await CachedService.getSubjectById(123);

// 获取用户收藏（带缓存）
const collections = await CachedService.getUserCollectionsByUsername('username');
```

### 2. 直接使用缓存管理器

```typescript
import { OpenAPICache } from '@/openapi';

// 手动设置缓存
OpenAPICache.set('/v0/subjects/123', undefined, subjectData, 5 * 60 * 1000);

// 获取缓存
const cachedData = OpenAPICache.get('/v0/subjects/123', undefined);

// 清除缓存
OpenAPICache.remove('/v0/subjects/123', undefined);

// 清除所有缓存
OpenAPICache.clear();
```

### 3. 使用缓存请求函数

```typescript
import { cachedRequest, OpenAPI } from '@/openapi';

const response = await cachedRequest(OpenAPI, {
  method: 'GET',
  url: '/v0/subjects/{subject_id}',
  path: {
    'subject_id': 123
  }
}, {
  cache: true,
  ttl: 5 * 60 * 1000 // 5分钟缓存
});
```

## 缓存策略

不同类型的 API 调用使用不同的缓存时间：

- 短缓存（1分钟）：角色详情、人物详情等频繁变动的数据
- 中等缓存（5分钟）：条目信息、章节信息等一般变动的数据
- 长缓存（30分钟）：列表数据等较少变动的数据
- 超长缓存（24小时）：静态数据或首页数据

## 注意事项

1. 写操作（POST、PUT、DELETE）不会使用缓存
2. 搜索接口不会使用缓存，因为每次搜索结果可能不同
3. 缓存数据会根据 TTL 自动过期
4. 可以通过 `clearCache` 和 `clearAllCache` 方法手动清除缓存