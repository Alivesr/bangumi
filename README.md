# Bangumi App

这是一个基于Vue 3 + TypeScript + Vite的Bangumi应用。

## 环境变量配置

在本地开发和部署到Vercel时需要正确配置环境变量。

### 本地开发环境变量 (.env.local)
```env
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here
REDIRECT_URI=http://localhost:5174/api/callback
FRONTEND_URL=http://localhost:5174
NODE_ENV=development
```

### Vercel生产环境变量
在Vercel项目设置中需要配置以下环境变量：
- CLIENT_ID: 你的Bangumi应用Client ID
- CLIENT_SECRET: 你的Bangumi应用Client Secret
- REDIRECT_URI: https://your-vercel-app.vercel.app/api/callback
- FRONTEND_URL: https://your-vercel-app.vercel.app
- NODE_ENV: production

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```
