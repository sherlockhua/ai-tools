<template>
  <div class="base-input-wrapper">
    <label v-if="label" :for="inputId" class="base-input-label">{{ label }}</label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="base-input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="base-input-error">{{ error }}</p>
  </div>
</template>

<script setup>
// defineProps and defineEmits are compiler macros and do not need to be imported.
// import { defineProps, defineEmits } from 'vue'; // No longer needed

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  inputId: {
    type: String,
    default: () => `base-input-${Math.random().toString(36).substring(7)}`,
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
.base-input-wrapper {
  margin-bottom: 1rem;
}

.base-input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text-primary, #333);
}

.base-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--color-border, #ccc);
  border-radius: 0.25rem;
  box-sizing: border-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: var(--color-primary, #007bff);
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: var(--color-bg-disabled, #e9ecef);
    opacity: 0.65;
    cursor: not-allowed;
  }
}

.base-input-error {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-error, #dc3545);
}
</style>