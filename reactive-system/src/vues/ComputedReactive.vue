<script setup>
import { reactive, computed } from 'vue';

//radius, PI객체를 반응형으로 만들겠다.
const data = reactive({
  PI: 3.14,
  radius: Math.round(Math.random() * 10),
});

const area = computed(() => {
  return data.radius * data.radius * data.PI;
});

setInterval(() => {
  data.radius = Math.round(Math.random() * 10);
}, 3000);
</script>

<template>
  <p>반지름이 {{ data.radius }}이고 원주율이 {{ PI }}인 원의 면적은 {{ area }}</p>
</template>

<style scoped></style>
