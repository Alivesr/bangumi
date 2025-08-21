# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript + Vite application that integrates with the Bangumi API (bgm.tv) to display anime, manga, and other Japanese entertainment content information.

## Project Structure

- `src/` - Main source code
  - `api/` - API clients for communicating with Bangumi API
  - `components/` - Reusable Vue components
  - `openapi/` - Auto-generated API models and services from OpenAPI specification
  - `page/` - Page-level Vue components organized by route
  - `router/` - Vue Router configuration
  - `stores/` - Pinia stores for state management
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions

## Common Development Commands

### Development

```bash
npm install    # Install dependencies
npm run dev    # Start development server
```

### Building

```bash
npm run build  # Build for production
npm run preview # Preview production build locally
```

### Code Generation

```bash
npm run openapi # Regenerate OpenAPI client from specification
```

### Code Formatting

```bash
npm run format # Format code with Prettier
```

## Architecture

### Frontend Framework

- Vue 3 with Composition API
- TypeScript for type safety
- Vue Router for client-side routing
- Pinia for state management

### Styling

- Tailwind CSS for utility-first styling
- DaisyUI component library
- Responsive design with mobile-first approach

### State Management

- Authentication state is managed in `src/stores/auth.ts` using Pinia
- Authentication information is persisted in localStorage

### API Integration

- Axios is used for HTTP requests
- API client is configured in `src/api/axios.ts`
- Specific API services are in `src/api/` directory
- OpenAPI-generated models and services in `src/openapi/`

### Routing

- Routes are defined in `src/router/index.ts`
- Nested routes are used for the main layout component
- All pages are located in `src/page/home/` directory

## Key Components

1. **Authentication Flow**:
   - Managed by `src/stores/auth.ts`
   - Login is handled through OAuth redirection
   - Token is stored in localStorage

2. **Search Functionality**:
   - Implemented in `src/page/home/subject_search/index.vue`
   - Uses `src/api/subject.ts` for API communication

3. **Navigation Layout**:
   - Main layout in `src/page/home/index.vue`
   - Contains header with navigation, search, and user menu

## Environment Variables

Required environment variables are documented in README.md:

- CLIENT_ID
- CLIENT_SECRET
- REDIRECT_URI
- FRONTEND_URL
- NODE_ENV

## Deployment

The application is designed to be deployed on Vercel. Configuration for Vercel deployment is in `vercel.json`.

## Styling & Design Guidelines

### 视觉风格参考

- **参考网站**：
  - 哔哩哔哩 (Bilibili)
    - 青蓝色调为主，突出活泼、年轻化的氛围
    - 弹性布局、卡片化内容展示
    - 动态 hover 和交互动效丰富
  - Bangumi (bgm.tv)
    - 简洁的灰白背景，信息密度高
    - 标题、评分、标签信息清晰突出
    - 强调文字可读性和内容层次感

### 色彩

- 主色调：青蓝色 (#00a1d6) 或 #00b4ff，可用于按钮、链接和导航高亮
- 辅助色：灰白 (#f8f8f8, #eaeaea) 背景，用于卡片和分区
- 强调色：橙色或红色 (#ff6b6b) 用于重要提示、收藏、徽章

### 布局

- **卡片式布局**：
  - 每条番组/漫画/条目信息显示在卡片中
  - 卡片包含封面、标题、评分、类型、标签
- **响应式设计**：
  - 移动端优先布局，使用 Tailwind CSS 的 `sm`, `md`, `lg` 响应式断点
  - 卡片在小屏下纵向排列，在大屏下网格排列
- **边距与间距**：
  - 内容之间保持统一间距，卡片边距 16px ~ 24px
  - 内部文字、图片有合理 padding

### 字体与排版

- 主字体：`Noto Sans`, `Helvetica`, `Arial`, sans-serif
- 字号分级：
  - 页面标题：20-24px
  - 卡片标题：16-18px
  - 正文文字：14px
  - 标签、评分：12-13px
- 行高 1.4 ~ 1.6，确保可读性

### 交互与动效

- **按钮和链接**：
  - hover 时改变颜色或加阴影
  - 鼠标悬停封面时，轻微缩放或出现阴影
- **滚动与加载**：
  - 异步加载内容可使用骨架屏（skeleton）占位
  - 分页或 infinite scroll 提示加载状态
- **导航与搜索**：
  - 顶部导航固定，包含搜索框、用户菜单、快捷入口
  - 搜索结果使用卡片列表呈现

### 图像与媒体

- 封面图片保持固定比例（通常 2:3 或 3:4）
- 支持懒加载，提高页面性能
- 鼠标悬停显示更多信息（评分、标签、收藏按钮等）

### 总结

- 整体风格结合 **哔哩哔哩的活泼色彩** + **Bangumi 的信息密集与清晰排版**
- 保持统一的色彩、间距和字体风格
- 移动端友好、响应式布局、动态交互丰富但不喧宾夺主
