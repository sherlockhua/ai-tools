// 自定义业务错误类
export class BusinessError extends Error {
  constructor(message, data, code) {
    super(message);
    this.name = 'BusinessError';
    this.data = data; // API 返回的完整数据
    this.code = code; // API 返回的业务错误码
    this.isBusinessError = true;
  }
}

// HttpError 和 NetworkError 在 apiClient.js 中定义