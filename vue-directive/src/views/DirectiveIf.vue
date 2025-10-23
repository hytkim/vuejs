<script setup>
import { ref } from "vue";
const score = ref(80);
const point = ref(100);

const getRandomValue = () => {
  score.value = Math.round(Math.random() * 60) + 40;
};
const customerInfo = () => {
  point.value = Math.round(Math.random() * 200) + 100;
};
</script>

<template>
  <button v-on:click="getRandomValue">random 점수</button>

  <p>{{ score }}</p>

  <p v-if="score >= 90">A</p>
  <p v-else-if="score >= 80">B</p>
  <p v-else-if="score >= 70">C</p>
  <p v-else>Fail</p>

  <input type="text" v-model="point" v-on:change="customerInfo" />
  <p v-if="point >= 300">점수 {{ point }}은 우수회원 입니다</p>
  <p v-else-if="point >= 200">점수 {{ point }}은 일반회원 입니다</p>
  <p v-else>점수 {{ point }}은 신규회원 입니다</p>
</template>
