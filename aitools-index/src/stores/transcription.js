import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { createTranscription as apiCreateTranscription, fetchTranscriptions as apiFetchTranscriptions, exportTranscription as apiExportTranscription } from '@/api/transcription'

/**
 * @file Pinia store for managing transcriptions.
 */
export const useTranscriptionStore = defineStore('transcription', () => {
  /**
   * @type {import('vue').Ref<Array<Object>>}
   * @description List of transcriptions. Each object should represent a transcription.
   * Example: { id: '1', name: 'meeting_notes.mp3', status: 'completed', createdAt: '2023-10-26T10:00:00Z', summary: '...' }
   */
  const transcriptions = ref([])

  /**
   * @type {import('vue').Ref<boolean>}
   * @description Loading state for transcription operations.
   */
  const isLoading = ref(false)

  /**
   * @type {import('vue').Ref<string|null>}
   * @description Error message if an operation fails.
   */
  const error = ref(null)

  /**
   * Fetches all transcriptions for the user.
   * @async
   */
  async function fetchTranscriptions() {
    isLoading.value = true
    error.value = null
    try {
      const data = await apiFetchTranscriptions()
      transcriptions.value = data // Assuming API returns an array of transcriptions
    } catch (err) {
      error.value = err.message || 'Failed to fetch transcriptions.'
      console.error(err);
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Creates a new transcription from a file or URL.
   * @async
   * @param {File|string} fileOrUrl - The file object or YouTube URL.
   * @param {string} language - The language for transcription.
   */
  async function createTranscription(fileOrUrl, language) {
    isLoading.value = true
    error.value = null
    try {
      const newTranscription = await apiCreateTranscription(fileOrUrl, language)
      // Add to list or re-fetch, depending on API response and desired UX
      // For simplicity, let's assume the API returns the created transcription
      // and we add it to the top.
      if (newTranscription) {
        transcriptions.value.unshift(newTranscription);
      } else {
        // Or trigger a re-fetch if the API doesn't return the new item
        await fetchTranscriptions();
      }
    } catch (err) {
      error.value = err.message || 'Failed to create transcription.'
      console.error(err);
      throw err; // Re-throw to allow component to handle
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Exports a transcription in the specified format.
   * @async
   * @param {string} id - The ID of the transcription to export.
   * @param {string} format - The desired export format (e.g., 'txt', 'docx', 'srt').
   * @returns {Promise<Blob|null>} The exported file as a Blob, or null on error.
   */
  async function exportTranscription(id, format) {
    isLoading.value = true;
    error.value = null;
    try {
      const blob = await apiExportTranscription(id, format);
      // The component calling this will handle the download of the blob
      return blob;
    } catch (err) {
      error.value = err.message || `Failed to export transcription in ${format} format.`;
      console.error(err);
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  // Getters
  /**
   * @description Returns transcriptions sorted by creation date (newest first).
   */
  const sortedTranscriptions = computed(() => {
    return [...transcriptions.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  /**
   * @description Returns transcriptions that are currently processing.
   */
  const processingTranscriptions = computed(() => {
    return transcriptions.value.filter(t => t.status === 'processing');
  });

  /**
   * @description Returns transcriptions that are completed.
   */
  const completedTranscriptions = computed(() => {
    return transcriptions.value.filter(t => t.status === 'completed');
  });


  return {
    transcriptions,
    isLoading,
    error,
    fetchTranscriptions,
    createTranscription,
    exportTranscription,
    // Getters
    sortedTranscriptions,
    processingTranscriptions,
    completedTranscriptions,
  }
})