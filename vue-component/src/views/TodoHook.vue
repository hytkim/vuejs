<template>
  <p>세로 {{ height }}, 가로 {{ width }} 인 사각형 면적 {{ area }}</p>
  <br />
  <button v-on:click="change">값 변경</button>
</template>
<script setup>
// 처리전엔 t, 처리후엔 ed
import {
  ref,
  computed,
  // set up이 처리하기때문에 지원되지않는 기능들:
  // onBeforeCreate,
  // onCreated,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onRenderTracked,
  onRenderTriggered,
} from "vue";

// Data
const heightData = Math.round(Math.random() * 10);
const widthData = Math.round(Math.random() * 10);

// 반응형: 얘들이 변경이 발생하게 되면
// 1. 해당 값 들을 onRenderTriggered가 추적
// 2. update -> mounted
const height = ref(heightData);
const width = ref(widthData);
const area = computed(() => {
  return height.value * width.value;
});

// Methode
const change = () => {
  height.value = Math.round(Math.random() * 10);
  width.value = Math.round(Math.random() * 10);
};

// Life Cycle Hook
// onBeforeCreate(() => {
//   console.log(`onBeforeMount : ${height.value} * ${width.value}`);
// });
// onCreated(() => {
//   console.log(`onBeforeMount : ${height.value} * ${width.value}`);
// });

onBeforeMount(() => {
  console.log(`onBeforeMount : ${height.value} * ${width.value}`);
});

onMounted(() => {
  console.log(`onMounted : ${height.value} * ${width.value}`);
});

onBeforeUpdate(() => {
  console.log(`onBeforeUpdate : ${height.value} * ${width.value}`);
});
onUpdated(() => {
  console.log(`onUpdated : ${height.value} * ${width.value}`);
});
onRenderTracked(() => {
  console.log(`onRenderTracked : ${height.value} * ${width.value}`);
});
onRenderTriggered(() => {
  console.log(`onRenderTriggered : ${height.value} * ${width.value}`);
});
</script>
