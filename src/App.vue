<template>
  <div class="app">
    <header class="header">
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link
          :to="{ name: 'board', params: { id: 'main' } }"
          class="nav-link"
          >Main Board</router-link
        >
      </nav>
      <h1>Vue 3 Todo Board</h1>
    </header>
    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style lang="scss">
.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: $spacing-5;
}

.header {
  text-align: center;
  margin-bottom: $spacing-10;

  .nav {
    margin-bottom: $spacing-6;
    display: flex;
    justify-content: center;
    gap: $spacing-4;
  }

  .nav-link {
    color: $gray-700;
    text-decoration: none;
    padding: $spacing-2 $spacing-4;
    border-radius: $border-radius;
    transition: $transition-base;

    &:hover {
      background: $gray-100;
    }

    &.router-link-active {
      color: $primary-color;
      background: rgba($primary-color, 0.1);
    }
  }

  h1 {
    font-size: $font-size-3xl;
    font-weight: 600;
    color: $gray-800;
  }
}

.main {
  background: $white;
  border-radius: $border-radius-xl;
  box-shadow: $shadow-md;
  padding: $spacing-6;
}
</style>
