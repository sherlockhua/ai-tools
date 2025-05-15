<template>
  <footer>
    <!-- TheFooter content will go here -->
    <p>&copy; {{ new Date().getFullYear() }} UniScribe Clone</p>
  </footer>
</template>

<script setup>
// Script setup for TheFooter
</script>

<style scoped>
/* Styles for TheFooter */
footer {
  padding: 1rem;
  background-color: #333;
  color: white;
  text-align: center;
  margin-top: auto; /* Pushes footer to bottom if main content is short */
}
</style>