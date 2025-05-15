<template>
  <div class="upload-area">
    <div
      class="dropzone"
      :class="{ 'dropzone--active': isDragOver }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        type="file"
        ref="fileInput"
        multiple
        @change="handleFileSelect"
        class="dropzone__input"
        :accept="acceptedFormats.join(',')"
      />
      <div v-if="!uploadedFiles.length">
        <p>Drag & drop your audio/video files here, or click to select files.</p>
        <p class="dropzone__formats">Supported formats: {{ acceptedFormats.join(', ') }}</p>
      </div>
      <div v-else class="file-preview-list">
        <h4>Selected files:</h4>
        <ul>
          <li v-for="file in uploadedFiles" :key="file.name">
            {{ file.name }} ({{ formatFileSize(file.size) }})
          </li>
        </ul>
      </div>
    </div>

    <div class="link-input">
      <BaseInput
        v-model="youtubeUrl"
        placeholder="Or paste a YouTube video URL here"
        @keyup.enter="submitUrl"
      />
      <BaseButton @click="submitUrl" :disabled="!isUrlValid">Submit URL</BaseButton>
    </div>
    <div v-if="uploadError" class="upload-error">
      {{ uploadError }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BaseInput from './ui/BaseInput.vue'; // Assuming BaseInput is created
import BaseButton from './ui/BaseButton.vue';
// import { validateFile, validateUrl } from '@/utils/validators'; // Assuming validators are created
// import { SUPPORTED_FORMATS } from '@/utils/constants'; // Assuming constants are created

/**
 * @file UploadArea.vue
 * @description Component for uploading files via drag & drop or URL input.
 */

const emit = defineEmits(['files-uploaded', 'url-submitted']);

const fileInput = ref(null);
const isDragOver = ref(false);
const youtubeUrl = ref('');
const uploadedFiles = ref([]);
const uploadError = ref('');

// Placeholder for accepted formats - move to constants.js
const acceptedFormats = ['.mp3', '.mp4', '.wav', '.m4a', '.ogg', '.webm'];
// Placeholder for max file size (e.g., 100MB) - move to constants.js
const MAX_FILE_SIZE = 100 * 1024 * 1024;


/**
 * Handles the drag over event on the dropzone.
 */
function handleDragOver() {
  isDragOver.value = true;
}

/**
 * Handles the drag leave event on the dropzone.
 */
function handleDragLeave() {
  isDragOver.value = false;
}

/**
 * Validates a single file.
 * @param {File} file - The file to validate.
 * @returns {string|null} Error message or null if valid.
 */
function validateFile(file) {
  if (!acceptedFormats.some(format => file.name.toLowerCase().endsWith(format))) {
    return `Invalid file type: ${file.name}. Accepted formats: ${acceptedFormats.join(', ')}.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File too large: ${file.name}. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`;
  }
  return null;
}

/**
 * Handles the drop event on the dropzone.
 * @param {DragEvent} event - The drop event object.
 */
function handleDrop(event) {
  isDragOver.value = false;
  uploadError.value = '';
  const files = Array.from(event.dataTransfer.files);
  processFiles(files);
}

/**
 * Triggers the hidden file input click.
 */
function triggerFileInput() {
  fileInput.value?.click();
}

/**
 * Handles file selection from the file input.
 * @param {Event} event - The change event object from file input.
 */
function handleFileSelect(event) {
  uploadError.value = '';
  const files = Array.from(event.target.files);
  processFiles(files);
  event.target.value = null; // Reset file input
}

/**
 * Processes and validates selected files.
 * @param {File[]} files - Array of files to process.
 */
function processFiles(files) {
  const validFiles = [];
  for (const file of files) {
    const error = validateFile(file);
    if (error) {
      uploadError.value = error;
      uploadedFiles.value = []; // Clear previous valid files if one is invalid
      return;
    }
    validFiles.push(file);
  }

  if (validFiles.length > 0) {
    uploadedFiles.value = [...uploadedFiles.value, ...validFiles].filter((f, i, self) => self.findIndex(t => t.name === f.name && t.size === f.size) === i); // Avoid duplicates
    emit('files-uploaded', uploadedFiles.value);
  }
}

/**
 * Validates the YouTube URL.
 * @returns {boolean} True if the URL is valid, false otherwise.
 */
const isUrlValid = computed(() => {
  // Basic YouTube URL validation (placeholder) - use a robust regex from utils/validators.js
  const youtubeRegex = /^(https|http):\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&.*)?$/;
  return youtubeRegex.test(youtubeUrl.value);
});

/**
 * Submits the YouTube URL.
 */
function submitUrl() {
  uploadError.value = '';
  if (isUrlValid.value) {
    emit('url-submitted', youtubeUrl.value);
    youtubeUrl.value = ''; // Clear input after submission
  } else {
    uploadError.value = 'Invalid YouTube URL.';
  }
}

/**
 * Formats file size into a readable string.
 * @param {number} bytes - File size in bytes.
 * @returns {string} Formatted file size.
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

</script>

<style scoped lang="scss">
.upload-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Consistent spacing */
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.dropzone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;

  &--active {
    border-color: #007bff;
    background-color: #f0f8ff;
  }

  &__input {
    display: none; /* Hidden file input */
  }

  &__formats {
    font-size: 0.8rem;
    color: #6c757d;
    margin-top: 0.5rem;
  }
}

.file-preview-list {
  text-align: left;
  margin-top: 1rem;
  ul {
    list-style: none;
    padding: 0;
    li {
      padding: 0.25rem 0;
      font-size: 0.9rem;
    }
  }
}

.link-input {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  .base-input { // Assuming BaseInput component has this class or style it directly
    flex-grow: 1;
  }
}

.upload-error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>