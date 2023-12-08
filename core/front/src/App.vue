<template>
  <h1>Good morning</h1>

  <div>
    <button>like</button>
    <button>dislike</button>
  </div>

  <div>
    <div>Количество лайков: {{ likes }}</div>
    <div>Количество дизлайков: {{ dislikes }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style></style>
