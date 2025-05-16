import { apiClient } from './apiClient';
import { BusinessError } from './errors'; // 从共享的 errors.js 导入

/**
 * 创建一个新的转录任务
 * @param {object} transcriptionData - 例如 { audioUrl: '...', language: 'en-US' }
 * @returns {Promise<object>} - 后端成功响应的数据 (例如包含 taskId)
 * @throws {HttpError|NetworkError|BusinessError}
 */
export async function createTranscriptionTask(transcriptionData) {
  const requestBody = { ...transcriptionData };

  try {
    const responseData = await apiClient.post('/transcriptions', requestBody); // 假设端点是 /transcriptions

    if (responseData && responseData.code === 0) {
      return responseData;
    } else {
      throw new BusinessError(
        (responseData && responseData.message) || 'Failed to create transcription task.',
        responseData,
        responseData ? responseData.code : undefined
      );
    }
  } catch (error) {
    console.error('Error in createTranscriptionTask service:', error.name, error.message, error.data || error.status);
    throw error;
  }
}

/**
 * 获取转录任务的状态
 * @param {string} taskId - 转录任务的 ID
 * @returns {Promise<object>} - 后端成功响应的数据 (例如任务状态)
 * @throws {HttpError|NetworkError|BusinessError}
 */
export async function getTranscriptionTaskStatus(taskId) {
  try {
    const responseData = await apiClient.get(`/transcriptions/${taskId}/status`);

    if (responseData && responseData.code === 0) {
      return responseData;
    } else {
      throw new BusinessError(
        (responseData && responseData.message) || `Failed to get status for task ${taskId}.`,
        responseData,
        responseData ? responseData.code : undefined
      );
    }
  } catch (error){
    console.error(`Error in getTranscriptionTaskStatus service for task ${taskId}:`, error.name, error.message, error.data || error.status);
    throw error;
  }
}