<template>
  <p>이름: <input type="text" v-model="fname" /></p>
  <p>나이: <input type="text" v-model="fage" /></p>
  <br />
  <button v-on:click="addFriend">친구추가</button>
  <table>
    <thead>
      <tr>
        <th>이름</th>
        <th>나이</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="friend in friends" v-bind:key="friend.name">
        <td>{{ friend.name }}</td>
        <td>{{ friend.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { reactive, ref } from "vue";
//data.
let finfo = reactive({
  name: "test",
  age: 20,
});
const fname = ref(finfo.name);
const fage = ref(finfo.age);
const friends = reactive([
  {
    name: "람지",
    age: 20,
  },
  {
    name: "썬더",
    age: 21,
  },
]);

const addFriend = () => {
  const newFriend = {
    name: fname.value,
    age: fage.value,
  };

  // 3-2. 'reactive'로 만든 배열에는 .value 없이 바로 push 합니다.
  friends.push(newFriend);

  // 3-3. 'finfo'가 아닌, input에 연결된 ref 변수의 .value를 직접 초기화합니다.
  fname.value = "";
  fage.value = "";
};
</script>
