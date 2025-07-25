import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.bgm.tv',
  timeout: 10000,
})

// 请求拦截器
api.interceptors.request.use(config => {
  // 比如添加 token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    // 错误处理
    return Promise.reject(error)
  }
)

export default api