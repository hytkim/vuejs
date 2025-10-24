<script setup>
import { RouterView } from "vue-router";
import { provide, reactive } from "vue";
import axios from "axios";

// 요청서버: http://localhost:5173
// 요청서버: http://localhost:3000

axios
  .get("http://localhost:3000/customers")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

const memberList = new Map();
memberList.set(33456, {
  id: 33456,
  name: "람다쥐",
  email: "bow@email.com",
  point: 35,
  note: "신규가입 특전",
});
memberList.set(47783, { id: 47783, name: "썬더쥐", email: "light@email.com", point: 53, note: "" });
provide("memberList", reactive(memberList));
</script>

<template>
  <header>
    <h1>Vue 라우터 셈플</h1>
    <!-- <ul>
      <li>d</li>
      <li>d</li>
      <li>d</li>
    </ul>
    TOP > memberList > MemberDetail -->
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
ul {
  list-style-type: none;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}
main {
  border: 1px blue solid;
  padding: 10px;
}
#breadcrums ul li {
  display: inline;
  list-style: none;
}
#breadcrums {
  margin-left: 0;
}

#breadcrums ul {
  margin-left: 0;
  padding-left: 0;
}

#breadcrums ul .current {
  color: red;
}
/* before.content가 li 앞에있는 아이콘설정하는거 */
#breadcrums ul li:before {
  content: " > ";
}
#breadcrums ul li:first-child:before {
  content: none;
}
</style>
