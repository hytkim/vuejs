<template>
  <h3>Todo List(Provide/Inject)</h3>
  <!-- html넘겨줄땐 v-bind:msg="<h3></h3>" 를 써라-->
  <TodoInput msg="<h3>글등록</h3>"></TodoInput>
  <TodoItemContainer v-for="todo in todos" :key="todo.id" v-bind:todo="todo"> </TodoItemContainer>
</template>

<script setup>
import { reactive, provide } from "vue";
import TodoInput from "./TodoInput.vue";
import TodoItemContainer from "./TodoItemContainer.vue";

// Data.
let nextId = 3;
const todoData = [
  { id: 1, text: "Vue.js study", complted: true },
  { id: 2, text: "Provide/Inject study", complted: false },
];
let todos = reactive(todoData);

// Methode ? Function
const addTodo = (newText) => {
  console.log("newText: ", newText);

  if (!newText) {
    alert("return");
    return;
  }
  todos.push({
    id: nextId++,
    text: newText,
    complted: false,
  });
  console.log("what todos: ", todos);
};

const toggleComplete = (id) => {
  const todo = todos.find((t) => t.id == id);
  if (todo) {
    todo.complted = !todo.complted;
  }
};

const removeTodo = (id) => {
  // todos = reactive(todos.filter((t) => t.id !== id)); // id값이 다른배열만 필터링한 배열을 todos에 다시 집어넣는다.
  console.log("rm id: ", id);
  let idx = todos.findIndex((t) => t.id == id);
  console.log("idx: ", idx);
  todos.splice(idx, 1);
};

//provide
// 최상위 Data에 todos라는이름으로 생성한 동적객체 todos를 할당
provide("todos", todos);
provide("addTodo", addTodo);
provide("toggleComplete", toggleComplete);
provide("removeTodo", removeTodo);
</script>

<style></style>
