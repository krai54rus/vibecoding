<!-- DragNDropItem.vue -->
<template>
  <div
    :class="['drag-drop-item', className]"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    style="cursor: move"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Props {
  id: string;
  className?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "dragStart", event: DragEvent, id: string): void;
  (e: "dragEnd", event: DragEvent): void;
}>();

const handleDragStart = (e: DragEvent) => {
  if (!e.dataTransfer || !e.currentTarget) return;

  // Create a ghost image of the dragged element
  const draggedElement = e.currentTarget as HTMLElement;
  const ghost = draggedElement.cloneNode(true) as HTMLElement;
  ghost.style.position = "absolute";
  ghost.style.top = "-1000px";
  document.body.appendChild(ghost);
  e.dataTransfer.setDragImage(ghost, 0, 0);

  // Clean up ghost element after drag starts
  setTimeout(() => {
    document.body.removeChild(ghost);
  }, 0);

  e.dataTransfer.setData("text/plain", props.id);
  emit("dragStart", e, props.id);
};

const handleDragEnd = (e: DragEvent) => {
  emit("dragEnd", e);
};
</script>

<style scoped>
.drag-drop-item {
  user-select: none;
}
</style>
