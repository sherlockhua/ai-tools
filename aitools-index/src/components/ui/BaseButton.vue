<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      { 'base-button--disabled': disabled },
      { 'base-button--full-width': fullWidth }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <BaseSpinner v-if="loading" class="base-button__spinner" />
    <span v-if="!loading"><slot /></span>
  </button>
</template>

<script setup>
// import { defineProps, defineEmits } from 'vue'; // Remove this line
import BaseSpinner from './BaseSpinner.vue'; // Assuming BaseSpinner is created

/**
 * @file BaseButton.vue
 * @description A versatile button component with different styles and states.
 */

const props = defineProps({
  /**
   * The visual style of the button.
   * @values primary, secondary, outline, text
   */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value),
  },
  /**
   * Whether the button is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * Whether the button should take up the full width of its container.
   */
  fullWidth: {
    type: Boolean,
    default: false,
  },
  /**
   * Whether to show a loading spinner instead of the button content.
   */
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

/**f
 * Handles the click event on the button.
 * Emits a 'click' event if the button is not disabled or loading.
 * @param {Event} event - The click event object.
 */
function handleClick(event) {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
}
</script>

<style scoped lang="scss">
/* BEM-like styling with CSS variables */
:root {
  --button-primary-bg: #007bff;
  --button-primary-bg-hover: #0056b3; /* Darkened primary background */
  --button-primary-text: white;
  --button-secondary-bg: #6c757d;
  --button-secondary-bg-hover: #545b62; /* Darkened secondary background */
  --button-secondary-text: white;
  --button-outline-border: #007bff;
  --button-outline-text: #007bff;
  --button-text-text: #007bff;
  --button-disabled-bg: #e9ecef;
  --button-disabled-text: #6c757d;
  --button-padding: 0.5rem 1rem;
  --button-border-radius: 0.25rem;
  --button-font-size: 1rem;
}

.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--button-padding);
  font-size: var(--button-font-size);
  border-radius: var(--button-border-radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, color 0.15s ease-in-out;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  user-select: none;

  &__spinner {
    margin-right: 0.5em; /* Adjust as needed */
  }

  &--primary {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border-color: var(--button-primary-bg);

    &:hover:not(.base-button--disabled) {
      background-color: var(--button-primary-bg-hover);
      border-color: var(--button-primary-bg-hover);
    }
  }

  &--secondary {
    background-color: var(--button-secondary-bg);
    color: var(--button-secondary-text);
    border-color: var(--button-secondary-bg);

    &:hover:not(.base-button--disabled) {
      background-color: var(--button-secondary-bg-hover);
      border-color: var(--button-secondary-bg-hover);
    }
  }

  &--outline {
    background-color: transparent;
    color: var(--button-outline-text);
    border-color: var(--button-outline-border);

    &:hover:not(.base-button--disabled) {
      background-color: var(--button-outline-text);
      color: white;
    }
  }

  &--text {
    background-color: transparent;
    color: var(--button-text-text);
    border-color: transparent;

    &:hover:not(.base-button--disabled) {
      background-color: rgba(var(--button-text-text), 0.1); // Slight background on hover
    }
  }

  &--disabled {
    background-color: var(--button-disabled-bg);
    color: var(--button-disabled-text);
    border-color: var(--button-disabled-bg);
    cursor: not-allowed;
    opacity: 0.65;
  }

  &--full-width {
    width: 100%;
  }
}
</style>