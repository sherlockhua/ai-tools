import axios from 'axios';

// 建议将 API_BASE_URL 存储在环境变量中
const API_BASE_URL = 'http://localhost:8999/api/v2'; // 您的 API 基础路径

// --- 自定义错误类 ---
export class HttpError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'HttpError';
    this.status = status; // HTTP 状态码
    this.data = data;     // 服务器返回的错误响应体
    this.isHttpError = true;
  }
}

export class NetworkError extends Error {
  constructor(message = 'A network error occurred. Please check your connection and try again.') {
    super(message);
    this.name = 'NetworkError';
    this.isNetworkError = true;
  }
}
// --- ---

// 模拟获取 token 的函数，您需要根据实际情况实现
// 例如，从 localStorage, Vuex store, Pinia store 等获取
function getToken() {
  // return localStorage.getItem('authToken');
  return 'YOUR_STATIC_TOKEN_FOR_TESTING'; // 替换为实际的 token 获取逻辑
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 请求超时时间 (例如 10 秒)
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- 请求拦截器 ---
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 可以在这里添加其他全局请求头或处理逻辑
    // 例如：config.headers['X-Custom-Header'] = 'value';
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// --- 响应拦截器 ---
axiosInstance.interceptors.response.use(
  (response) => {
    // HTTP 状态码为 2xx 时，会进入这里
    //可以直接返回 response.data，简化后续处理
    return response.data;
  },
  (error) => {
    // HTTP 状态码非 2xx 或其他错误会进入这里
    console.error('Response interceptor error:', error.config?.url, error.message);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // 服务器返回了响应，但状态码非 2xx
        // error.response.data 是服务器返回的错误信息主体
        // error.response.status 是 HTTP 状态码
        // error.response.headers 是响应头
        throw new HttpError(
          (error.response.data && error.response.data.message) || error.message,
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // 请求已发出，但没有收到响应 (例如网络错误, 超时)
        // error.request 在浏览器中是 XMLHttpRequest 实例，在 Node.js 中是 http.ClientRequest 实例
        throw new NetworkError('The request was made but no response was received. Please check your network.');
      } else {
        // 设置请求时发生了一些事情，触发了一个错误 (例如配置错误)
        throw new Error(`Axios setup error: ${error.message}`);
      }
    }
    // 如果不是 Axios 错误，直接抛出原始错误
    return Promise.reject(error);
  }
);

// 封装的 API 调用方法
// 注意：由于响应拦截器已经处理了 response.data 和大部分错误，
// 这些方法现在主要负责传递参数给 axiosInstance
export const apiClient = {
  get: (endpoint, params, options = {}) => {
    return axiosInstance.get(endpoint, { ...options, params });
  },
  post: (endpoint, data, options = {}) => {
    return axiosInstance.post(endpoint, data, { ...options });
  },
  put: (endpoint, data, options = {}) => {
    return axiosInstance.put(endpoint, data, { ...options });
  },
  delete: (endpoint, options = {}) => {
    return axiosInstance.delete(endpoint, { ...options });
  },
  patch: (endpoint, data, options = {}) => {
    return axiosInstance.patch(endpoint, data, { ...options });
  },
  // 如果需要上传文件等特殊请求，可以单独封装
  // 例如：
  // upload: (endpoint, formData, options = {}) => {
  //   return axiosInstance.post(endpoint, formData, {
  //     ...options,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       ...options.headers,
  //     },
  //   });
  // }
};