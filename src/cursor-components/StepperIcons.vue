<script setup lang="ts">
interface Props {
  type: "circle" | "hexagon" | "square";
  status: "pending" | "current" | "completed" | "error";
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "circle",
  text: "",
});

const iconColor = {
  pending: "#94A3B8",
  current: "#2B32A8",
  completed: "#16A34A",
  error: "#DC2626",
};

const getIconPath = (type: string) => {
  switch (type) {
    case "hexagon":
      return "M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z";
    case "square":
      return "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z";
    case "circle":
    default:
      return "";
  }
};
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    :aria-label="status"
  >
    <!-- Background shape -->
    <template v-if="type === 'circle'">
      <circle
        cx="12"
        cy="12"
        r="10"
        :fill="iconColor[status]"
        fill-opacity="0.1"
        :stroke="iconColor[status]"
        stroke-width="2"
      />
    </template>
    <template v-else>
      <path
        :d="getIconPath(type)"
        :fill="iconColor[status]"
        fill-opacity="0.1"
        :stroke="iconColor[status]"
        stroke-width="2"
      />
    </template>

    <!-- Text in the middle -->
    <text
      x="12"
      y="12"
      text-anchor="middle"
      dominant-baseline="central"
      :fill="iconColor[status]"
      font-size="12"
      font-weight="600"
      font-family="Arial, sans-serif"
    >
      {{ text }}
    </text>

    <!-- Completed check mark -->
    <template v-if="status === 'completed'">
      <path
        d="M9 12l2 2 4-4"
        fill="none"
        :stroke="iconColor.completed"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <!-- Error X mark -->
    <template v-if="status === 'error'">
      <path
        d="M15 9l-6 6m0-6l6 6"
        fill="none"
        :stroke="iconColor.error"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>
  </svg>
</template>
