import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'; // Fallback if not set

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    // Add other common headers like Authorization if needed
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});

/**
 * @file API service layer for transcription operations.
 */

/**
 * Creates a new transcription.
 * @async
 * @param {File|string} fileOrUrl - The audio/video file or a YouTube URL.
 * @param {string} language - The language code for transcription (e.g., 'en-US').
 * @returns {Promise<Object>} The created transcription object.
 * @throws {Error} If the API request fails.
 */
export const createTranscription = async (fileOrUrl, language) => {
  try {
    let response;
    if (fileOrUrl instanceof File) {
      const formData = new FormData();
      formData.append('file', fileOrUrl);
      formData.append('language', language);
      // Add other parameters as needed, e.g., speaker_diarization: true

      response = await apiClient.post('/transcriptions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else if (typeof fileOrUrl === 'string') {
      response = await apiClient.post('/transcriptions', {
        url: fileOrUrl,
        language: language,
        // Add other parameters
      });
    } else {
      throw new Error('Invalid input: must be a File object or a URL string.');
    }
    return response.data; // Assuming API returns the new transcription object
  } catch (error) {
    console.error('API Error - createTranscription:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create transcription.');
  }
};

/**
 * Fetches the list of user's transcriptions.
 * @async
 * @param {Object} [params] - Optional query parameters (e.g., for pagination, filtering).
 * @returns {Promise<Array<Object>>} A list of transcription objects.
 * @throws {Error} If the API request fails.
 */
export const fetchTranscriptions = async (params = {}) => {
  try {
    const response = await apiClient.get('/transcriptions', { params });
    return response.data; // Assuming API returns an array of transcriptions
  } catch (error) {
    console.error('API Error - fetchTranscriptions:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch user's transcriptions.");
  }
};

/**
 * Fetches a single transcription by its ID.
 * @async
 * @param {string} id - The ID of the transcription.
 * @returns {Promise<Object>} The transcription object.
 * @throws {Error} If the API request fails.
 */
export const fetchTranscriptionById = async (id) => {
  try {
    const response = await apiClient.get(`/transcriptions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`API Error - fetchTranscriptionById (${id}):`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch transcription details.');
  }
};


/**
 * Exports a transcription in the specified format.
 * @async
 * @param {string} id - The ID of the transcription to export.
 * @param {string} format - The desired export format (e.g., 'txt', 'docx', 'pdf', 'srt', 'vtt').
 * @returns {Promise<Blob>} The exported file content as a Blob.
 * @throws {Error} If the API request fails or format is unsupported.
 */
export const exportTranscription = async (id, format) => {
  try {
    const response = await apiClient.get(`/transcriptions/${id}/export`, {
      params: { format },
      responseType: 'blob', // Important for file downloads
    });
    return response.data; // This will be a Blob
  } catch (error) {
    console.error(`API Error - exportTranscription (${id}, ${format}):`, error.response?.data || error.message);
    // If responseType is blob, error.response.data might be a blob too, try to parse it if it's JSON error
    let errorMessage = `Failed to export transcription in ${format} format.`;
    if (error.response && error.response.data instanceof Blob && error.response.data.type.includes('application/json')) {
        try {
            const errorJson = JSON.parse(await error.response.data.text());
            errorMessage = errorJson.message || errorMessage;
        } catch (e) {
            // Ignore parsing error, use default message
        }
    } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
    }
    throw new Error(errorMessage);
  }
};

// Add other API functions as needed:
// - deleteTranscription(id)
// - updateTranscription(id, data)