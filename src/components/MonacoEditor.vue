<template>
  <div class="monaco-editor-wrapper">
    <MonacoEditorVue
      v-model:value="value"
      :language="language"
      :theme="theme"
      :options="editorOptions"
      class="monaco-editor"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import MonacoEditorVue from "monaco-editor-vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "html", // 'html', 'xml', 'freemarker'
  },
  theme: {
    type: String,
    default: "vs-dark",
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    if (val !== value.value) value.value = val;
  }
);

watch(value, (val) => {
  emit("update:modelValue", val);
});

const editorOptions = {
  fontSize: 14,
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
};
</script>

<style scoped>
.monaco-editor-wrapper {
  width: 100%;
  min-height: 300px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}
.monaco-editor {
  width: 100%;
  height: 300px;
}
</style>
