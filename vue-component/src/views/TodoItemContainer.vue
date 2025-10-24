<template>
  <li v-bind:class="{ complted: todo.complted }">
    <span @click="handleToggle">{{ todo.text }}</span>
    <TodoItemButton v-bind:item-id="todo.id" />
  </li>
</template>

<script setup>
// 라이브러리 추가
import { defineProps, inject } from "vue";
import TodoItemButton from "./TodoItemButton.vue";

const toggleComplete = inject("toggleComplete");
const props = defineProps({
  todo: {
    type: Object,
    require: true,
  },
});

// methode
const handleToggle = () => {
  toggleComplete(props.todo.id);
};
</script>

<style scoped>
.complted span {
  text-decoration: line-through;
}
</style>
