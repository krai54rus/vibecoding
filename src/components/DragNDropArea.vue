<!-- DragNDropArea.vue -->
<template>
  <div
    :class="['drag-drop-area', className]"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
    :data-active="isDragActive"
  >
    <div class="area-title" v-if="title">{{ title }}</div>
    <div class="items-container" ref="containerRef">
      <template v-for="(item, index) in items" :key="item.id">
        <DragItemPlaceholder
          v-if="showPlaceholderAt === index"
          :is-active="true"
          :text="currentDragText"
        />
        <DragNDropItem
          :id="item.id"
          @drag-start="handleItemDragStart"
          @drag-end="handleItemDragEnd"
        >
          <div class="todo-item">
            {{ item.text }}
          </div>
        </DragNDropItem>
      </template>
      <!-- Placeholder for empty list or last position -->
      <DragItemPlaceholder
        v-if="showPlaceholderAt === items.length"
        :is-active="true"
        :text="currentDragText"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import DragNDropItem from "./DragNDropItem.vue";
import DragItemPlaceholder from "./DragItemPlaceholder.vue";

interface TodoItem {
  id: string;
  text: string;
  completed?: boolean;
}

interface Props {
  id: string;
  title?: string;
  items: TodoItem[];
  className?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (
    e: "drop",
    sourceId: string,
    targetAreaId: string,
    item: TodoItem,
    position: number
  ): void;
  (e: "dragStart", itemId: string, areaId: string, item: TodoItem): void;
  (e: "dragEnd"): void;
}>();

const isDragActive = ref(false);
const showPlaceholderAt = ref<number | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const currentDragText = ref<string>("");

const findDropIndex = (event: DragEvent): number => {
  if (!containerRef.value) return props.items.length;

  const items = containerRef.value.querySelectorAll(".todo-item");
  const mouseY = event.clientY;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const rect = item.getBoundingClientRect();
    const itemMiddle = rect.top + rect.height / 2;

    if (mouseY < itemMiddle) {
      return i;
    }
  }

  return props.items.length;
};

const handleDragOver = (event: DragEvent) => {
  const dropIndex = findDropIndex(event);
  showPlaceholderAt.value = dropIndex;
};

const handleDrop = (event: DragEvent) => {
  isDragActive.value = false;
  if (!event.dataTransfer) return;

  try {
    const dragData = JSON.parse(event.dataTransfer.getData("application/json"));
    const { sourceId, itemData } = dragData;
    const dropIndex = showPlaceholderAt.value ?? props.items.length;

    if (sourceId && itemData) {
      emit("drop", sourceId, props.id, itemData, dropIndex);
    }
  } catch (error) {
    console.error("Error parsing drag data:", error);
  }

  showPlaceholderAt.value = null;
  currentDragText.value = "";
};

const handleItemDragStart = (event: DragEvent, itemId: string) => {
  const item = props.items.find((item) => item.id === itemId);
  if (!item || !event.dataTransfer) return;

  // Store the full item data in the drag event
  const dragData = {
    sourceId: itemId,
    itemData: item,
  };

  event.dataTransfer.setData("application/json", JSON.stringify(dragData));
  currentDragText.value = item.text;
  emit("dragStart", itemId, props.id, item);
};

const handleItemDragEnd = () => {
  showPlaceholderAt.value = null;
  currentDragText.value = "";
  emit("dragEnd");
};

const handleDragEnter = () => {
  isDragActive.value = true;
};

const handleDragLeave = (event: DragEvent) => {
  // Check if we're actually leaving the container and not just moving between items
  const relatedTarget = event.relatedTarget as HTMLElement;
  if (!containerRef.value?.contains(relatedTarget)) {
    isDragActive.value = false;
    showPlaceholderAt.value = null;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

.drag-drop-area {
  min-height: 100px;
  border: 2px dashed $border-color;
  border-radius: $border-radius-lg;
  padding: $spacing-4;
  transition: $transition-base;
  background: $white;

  &[data-active="true"] {
    border-color: $primary-color;
    background-color: rgba($primary-color, 0.05);
  }
}

.area-title {
  font-size: $font-size-lg;
  font-weight: 600;
  margin-bottom: $spacing-4;
  color: $gray-800;
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  min-height: 60px;
}

.todo-item {
  padding: $spacing-3 $spacing-4;
  background: $gray-100;
  border-radius: $border-radius;
  box-shadow: $shadow-sm;
  transition: $transition-base;
  cursor: move;

  &:hover {
    background: $gray-200;
  }
}
</style>
