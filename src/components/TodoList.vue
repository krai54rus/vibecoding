<!-- TodoList.vue -->
<template>
  <div class="todo-list">
    <div class="columns">
      <DragNDropArea id="todo" className="todo-column" @drop="handleDrop">
        <h2>Todo</h2>
        <DragNDropItem
          v-for="item in todoItems"
          :key="item.id"
          :id="item.id"
          @dragStart="handleDragStart"
        >
          <div class="todo-item">
            {{ item.text }}
          </div>
        </DragNDropItem>
      </DragNDropArea>

      <DragNDropArea
        id="inProgress"
        className="in-progress-column"
        @drop="handleDrop"
      >
        <h2>In Progress</h2>
        <DragNDropItem
          v-for="item in inProgressItems"
          :key="item.id"
          :id="item.id"
          @dragStart="handleDragStart"
        >
          <div class="todo-item">
            {{ item.text }}
          </div>
        </DragNDropItem>
      </DragNDropArea>

      <DragNDropArea id="done" className="done-column" @drop="handleDrop">
        <h2>Done</h2>
        <DragNDropItem
          v-for="item in doneItems"
          :key="item.id"
          :id="item.id"
          @dragStart="handleDragStart"
        >
          <div class="todo-item">
            {{ item.text }}
          </div>
        </DragNDropItem>
      </DragNDropArea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import DragNDropArea from "./DragNDropArea.vue";
import DragNDropItem from "./DragNDropItem.vue";

interface TodoItem {
  id: string;
  text: string;
  status: "todo" | "inProgress" | "done";
}

const items = ref<TodoItem[]>([
  { id: "1", text: "Learn Vue 3", status: "todo" },
  { id: "2", text: "Build a todo app", status: "inProgress" },
  { id: "3", text: "Master TypeScript", status: "done" },
]);

const todoItems = computed(() =>
  items.value.filter((item) => item.status === "todo")
);

const inProgressItems = computed(() =>
  items.value.filter((item) => item.status === "inProgress")
);

const doneItems = computed(() =>
  items.value.filter((item) => item.status === "done")
);

const handleDragStart = (event: DragEvent, id: string) => {
  console.log("Started dragging item:", id);
};

const handleDrop = (sourceId: string, targetId: string) => {
  const item = items.value.find((item) => item.id === sourceId);
  if (item) {
    item.status = targetId as TodoItem["status"];
  }
};
</script>

<style scoped>
.todo-list {
  padding: 20px;
}

.columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.todo-column,
.in-progress-column,
.done-column {
  min-height: 300px;
}

.todo-item {
  background-color: white;
  padding: 12px;
  margin: 8px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0 0 16px;
  color: #333;
}
</style>
