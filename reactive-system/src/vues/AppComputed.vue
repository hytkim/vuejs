<script setup>
import { ref, computed } from 'vue';
const radiusInit = Math.round(Math.random() * 10);
const PI = ref(3.14);
const radius = ref(radiusInit);

const area = computed(() => {
  return radius.value * radius.value * PI.value;
});

setInterval(() => {
  radius.value = Math.round(Math.random() * 10);
}, 3000);
</script>

<template>
  <p>반지름이 {{ radius }}이고 원주율이 {{ PI }}인 원의 면적은 {{ area }}</p>
</template>

<style scoped></style>
