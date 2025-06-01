<template>
  <div class="todo-board">
    <DragNDropArea
      v-for="list in todoLists"
      :key="list.id"
      :id="list.id"
      :title="list.title"
      :items="list.items"
      class="todo-list"
      @drop="handleDrop"
      @drag-start="handleDragStart"
      @drag-end="handleDragEnd"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DragNDropArea from "./DragNDropArea.vue";

interface TodoItem {
  id: string;
  text: string;
  completed?: boolean;
}

interface TodoList {
  id: string;
  title: string;
  items: TodoItem[];
}

// Sample data - in a real app this would likely come from props or a store
const todoLists = ref<TodoList[]>([
  {
    id: "todo",
    title: "To Do",
    items: [
      { id: "1", text: "Learn Vue 3" },
      { id: "2", text: "Build a todo app" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    items: [{ id: "3", text: "Review code" }],
  },
  {
    id: "done",
    title: "Done",
    items: [{ id: "4", text: "Setup project", completed: true }],
  },
]);

const handleDrop = (
  sourceId: string,
  targetAreaId: string,
  item: TodoItem,
  position: number
) => {
  // Find source and target lists
  const sourceList = todoLists.value.find((list) =>
    list.items.some((i) => i.id === sourceId)
  );
  const targetList = todoLists.value.find((list) => list.id === targetAreaId);

  if (!sourceList || !targetList) return;

  // Remove item from source list if moving to a different list
  if (sourceList.id !== targetList.id) {
    const sourceIndex = sourceList.items.findIndex((i) => i.id === sourceId);
    if (sourceIndex !== -1) {
      sourceList.items.splice(sourceIndex, 1);
    }
  }

  // Create a copy of the item with a new ID if staying in the same list
  const newItem =
    sourceList.id === targetList.id
      ? { ...item, id: `${item.id}-copy-${Date.now()}` }
      : item;

  // Insert the item at the specified position
  targetList.items.splice(position, 0, newItem);
};

const handleDragStart = (itemId: string, areaId: string, item: TodoItem) => {
  console.log(`Started dragging item ${itemId} from area ${areaId}`, item);
};

const handleDragEnd = () => {
  console.log("Drag ended");
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

.todo-board {
  display: flex;
  gap: $spacing-6;
  padding: $spacing-5;
  min-height: 400px;
  background: $gray-100;
  border-radius: $border-radius-lg;
}

.todo-list {
  flex: 1;
  min-width: 280px;
  max-width: 400px;
}
</style>
