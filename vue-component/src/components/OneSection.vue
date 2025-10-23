<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  title: {
    type: String,
    required: true, // 반드시 값을 전달받게한다
    // default: "Hello", // 기본 값 할당
  },
  desc: {
    type: String,
    required: true, // 반드시 값을 전달받게한다
    // default: "Hello", // 기본 값 할당
  },
});
// defineEmits는 상위컴포넌트에서 하위컴포넌트로 전달해주는 사용자정의 이벤트
const emit = defineEmits(["callStartPoint"]);
// 부모컴포넌트에서사전에 정의한 callStartPoint에 createStartPoint를 할당했고
// 자식컴포넌트 에서 onClick이벤트가 발생할때, callStartPoint이벤트 핸들러에게 요청해서 createStartPoint를실행하럯이다.
const onClick = (e) => {
  // console.log(e.target.parentElement.parentElement.children[0].innerText);
  console.log("test", e.target.parentElement.children[0].innerText);
  emit("callStartPoint", e.target.parentElement.children[0].innerText);
};
</script>
<template>
  <section class="box">
    <h3>{{ title }}</h3>
    <p>{{ desc }}</p>
    <button v-on:click="onClick">자식 컴포넌트에서 임의의 값 생성</button>
  </section>
</template>

<style scoped>
/* .box */
section {
  border: green 1px dashed;
  margin: 10px;
}
</style>
