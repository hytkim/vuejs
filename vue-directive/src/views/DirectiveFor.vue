<template>
  <!-- source 는 배열, value는 source의 요소중 하나, foreach문같은건듯? -->
  <!-- 받아올 배열에서 중복을방지가능한 고유한 속성을 바인딩해줘야한다. -->
  <p v-for="item in itemList" v-bind:key="item">
    <ul>
      <li>{{ item }}</li>
    </ul>
  </p>
  <!-- 배열요소들개수만큼 반복하는게아니라 그냥 몇번하겠다 하면 숫자값만주면된다. -->
   <p v-for="num in 9" v-bind:key="num">
    <!-- 무려 연산도 가능하다! -->
    3 * {{num}} = {{ num * 3}}
   </p>

   친구이름: <input type="text" v-model="newFriend" v-on:change="addNewFriend">
   <h3>친구목록</h3>
   <ul>
    <li v-for="name in friends" v-bind:key="name">
      {{ name }}
    </li>
   </ul>
</template>

<script setup>
import { ref } from "vue";
const ary = ["키보드", "마우스", "USB", "장패드", "SSD", "RAM", "ROM", "HDD"];
const itemList = ref(ary);
const friends = ref(['람지', '썬더', '파이어', '워터', '아꾸아']);
let newFriend = ref(['Blue Fin Tuna']);

const addNewFriend = () => {
  friends.value.push(newFriend.value.trim());
  newFriend = ref("");
}
</script>
