<template>
  <h1>컴포넌트 기초</h1>
  <p>{{ starName }}의 별점: {{ starPoint }}</p>
  <button v-on:click="createStartPoint">random value</button>
  <section>
    <h2>컴포넌트 1개</h2>
    <OneSection
      v-bind:title="fName + 'test'"
      v-bind:desc="fdesc"
      v-on:callStartPoint="createStartPoint"
    />
  </section>
  <section>
    <h2>컴포넌트 여러개</h2>
    <!-- <OnSection v-bind:title="fName + 'test'" v-bind:desc="fdesc" />
    <OnSection title="sss sss" desc="test" />
    <OnSection title="rr r r" desc="test" /> -->
    <OneSection
      v-for="[index, item] in mapData"
      v-bind:key="index"
      v-bind:title="item.title"
      v-bind:desc="item.desc"
      v-on:callStartPoint="createStartPoint"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import OneSection from "../components/OneSection.vue";

const fName = ref("testName"); // 하위 컴포넌트로 변수자체를 넘겨주려고한다면
const fdesc = ref("TestDesc"); // 하위 컴포넌트로 변수자체를 넘겨주려고한다면
const mapData = new Map();
mapData.set(1, { title: "T1", desc: "ttttttttttttttttttttttt" });
mapData.set(2, { title: "22ao", desc: "222222222222222222" });
mapData.set(3, { title: "3333323", desc: "333333333" });
mapData.set(4, { title: "444444444444444444Yeee", desc: "444444444" });

const starPoint = ref(Math.ceil(Math.random() * 5));
const starName = ref("척아이롤");

const createStartPoint = (name) => {
  console.log("call Parent Component Event");
  starName.value = name;
  starPoint.value = Math.ceil(Math.random() * 5);
};
</script>

<style>
section {
  border: green 1px solid;
  margin: 10px;
}
</style>
