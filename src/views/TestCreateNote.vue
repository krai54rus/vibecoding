<template>
  <div class="test-create-note-page">
    <h1>Test CreateNote</h1>
    <CreateNote />
  </div>
</template>

<script setup lang="ts">
import CreateNote from "../components/CreateNote.vue";
</script>

<style scoped>
.test-create-note-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding-top: 2rem;
}
</style>
