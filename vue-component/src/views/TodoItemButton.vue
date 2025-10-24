<template>
  <button @click="handleDelete">삭제</button>
</template>

<script setup>
import { inject, defineProps } from "vue";

//<TodoItemButton v-bind:item-id="todo.id" /> 형식으로 보내줬는데
// 이거그대로쓰면 구문에러남 인식못해서 그래서 vue에서 자동으로 카멜형식으로 변환을해주기때문에
// itemId로쓰면된다, 아무튼 그렇게 받아온 todo List의 한 요소에 해당하는 todo의 id값으로 이렇게쓴다.
const props = defineProps({
  itemId: {
    type: Number,
    required: true,
  },
});

const removeTodo = inject("removeTodo");
const handleDelete = () => {
  removeTodo(props.itemId);
};
</script>
