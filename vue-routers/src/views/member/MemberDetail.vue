<template>
  <h1>회원 상세개인정보 긴빠이</h1>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }"> TOP</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }"> 회원목록</RouterLink></li>
      <li>회원상세</li>
    </ul>
  </nav>
  <section>
    <h3>회원상세정보</h3>
    <dl>
      <dt>ID</dt>
      <dd>{{ member.id }}</dd>
      <dt>이름</dt>
      <dd>{{ member.name }}</dd>
      <dt>ID</dt>
      <dd>{{ member.email }}</dd>
      <dt>ID</dt>
      <dd>{{ member.phone }}</dd>
      <dt>비고</dt>
      <dd>{{ member.address }}</dd>
    </dl>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
// import { defineProps, inject } from "vue";
import { defineProps, ref } from "vue";
import axios from "axios";
// const memberList = inject("memberList");
// const member = memberList.get(props.id);

const props = defineProps({
  id: Number,
});
const member = ref({});

axios
  .get("http://localhost:3000/customer/" + props.id)
  .then((res) => {
    console.log(res);
    member.value = res.data[0];
  })
  .catch((err) => console.log(err));
</script>
