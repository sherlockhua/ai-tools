import { apiClient } from './apiClient';
import { BusinessError } from './errors.js'; // 从共享的 errors.js 导入, 显式添加 .js 扩展名

/**
 * 提交联系表单数据
 * @param {object} contactData - 包含 name, email, subject, message 的对象
 * @returns {Promise<object>} - 后端成功响应的数据 (当 code === 0)
 * @throws {HttpError|NetworkError|BusinessError} - apiClient 会抛出 HttpError/NetworkError
 */
export async function submitContactForm(contactData) {
  const requestBody = {
    full_name: contactData.name,
    email: contactData.email,
    subject: contactData.subject,
    message: contactData.message,
  };

  try {
    // apiClient.post 现在直接返回 response.data (如果成功)
    // 或者抛出 HttpError/NetworkError (由响应拦截器处理)
    const responseData = await apiClient.post('/contactInfo', requestBody);

    // 在这里处理业务特定的成功/失败逻辑
    // 假设 API 总是返回一个对象，即使业务失败也包含 code 和 message
    if (responseData && responseData.code === 0) {
      return responseData; // 业务成功
    } else {
      // HTTP 请求成功 (2xx)，但业务逻辑指示失败 (e.g., code !== 0)
      throw new BusinessError(
        (responseData && responseData.message) || 'Contact form submission failed due to a business rule.',
        responseData,
        responseData ? responseData.code : undefined
      );
    }
  } catch (error) {
    // HttpError 和 NetworkError 会由 apiClient 的响应拦截器抛出并传递到这里
    // BusinessError 是我们自己在这里抛出的
    // 可以在这里记录特定于此服务的错误，或者直接重新抛出让调用方 (Vue 组件) 处理
    console.error('Error in submitContactForm service:', error.name, error.message, error.data || error.status);
    throw error; // 将所有类型的错误（HttpError, NetworkError, BusinessError）传递给调用者
  }
}