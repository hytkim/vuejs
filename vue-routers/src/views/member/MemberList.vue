<script setup>
import { RouterLink } from "vue-router";
// import { inject } from "vue";
import axios from "axios";
import { ref } from "vue";
// const memberList = inject("memberList");
// console.log(memberList);
const customers = ref([]);

axios
  .get("http://localhost:3000/customers")
  .then((res) => {
    customers.value = res.data;
    console.log(res);
    console.log(customers.value);
  })
  .catch((err) => console.log(err));
</script>
<template>
  <h1>회원 ㅁㄹ</h1>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }"> TOP</RouterLink></li>
      <li>회원목록</li>
    </ul>
  </nav>
  <section>
    <h3>회원리스트</h3>
    <p>신규등록은 <RouterLink v-bind:to="{ name: 'MemberAdd' }">여기를</RouterLink> 클릭</p>
    <ul>
      <!-- <li v-for="[id, member] in memberList" v-bind:key="id">
        <RouterLink v-bind:to="{ name: 'MemberDetail', params: { id: id } }">
          {{ member.id }} / {{ member.name }} 가 가진 포인트: {{ member.point }}
        </RouterLink>
      </li> -->
      <li v-for="member in customers" v-bind:key="member.id">
        <RouterLink v-bind:to="{ name: 'MemberDetail', params: { id: member.id } }">
          ID가 {{ member.id }}인 {{ member.name }}님
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
