<template>
  <slot name="header"></slot>
  <slot></slot>
  <slot name="footer"></slot>

  <div>
    <input
      type="text"
      placeholder="새 할일을 입력하세요."
      v-model="todoText"
      @keyup.enter="handleAdd"
    />
    <button @click="handleAdd">Add</button>
  </div>
</template>

<script setup>
import { defineProps, inject, ref } from "vue";

const todoText = ref("");

defineProps({
  msg: String,
});

const addTodo = inject("addTodo");
const handleAdd = () => {
  console.log("너의 입력은: ", todoText.value);
  addTodo(todoText.value);
  todoText.value = "";
};
</script>
