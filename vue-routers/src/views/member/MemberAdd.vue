<template>
  <h1>회원 관리</h1>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }"> TOP</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }"> 회원목록</RouterLink></li>
      <li>회원정 보추가</li>
    </ul>
  </nav>
  <section>
    <h3>회원정 보추 가</h3>
    <p>회원정보를 입력하고 추가버튼 클릭</p>
    <form v-on:submit.prevent="onAdd">
      <!-- <dl>
        <dt><label for="">ID</label></dt>
        <dd><input type="number" v-model.number="member.id" /></dd>
        <dt><label for="">이름</label></dt>
        <dd><input type="text" v-model="member.name" /></dd>
        <dt><label for="">메일</label></dt>
        <dd><input type="text" v-model="member.email" /></dd>
        <dt><label for="">Point</label></dt>
        <dd><input type="number" v-model.number="member.point" /></dd>
        <dt><label for="">비고</label></dt>
        <dd><input type="text" v-model="member.note" /></dd>
      </dl> -->
      <dl>
        <dt><label for="">ID</label></dt>
        <dd><input type="number" v-model.number="member.id" /></dd>
        <dt><label for="">이름</label></dt>
        <dd><input type="text" v-model="member.name" /></dd>
        <dt><label for="">pass</label></dt>
        <dd><input type="text" v-model="member.password" /></dd>
        <dt><label for="">메일</label></dt>
        <dd><input type="text" v-model="member.email" /></dd>
        <dt><label for="">폰</label></dt>
        <dd><input type="text" v-model="member.phone" /></dd>
      </dl>
      <button type="submit">추가</button>
    </form>
  </section>
</template>

<script setup>
// import { reactive, inject } from "vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
// const memberList = inject("memberList");

const router = useRouter(); // 라우터객체

// const member = reactive({
//   id: 0,
//   name: "",
//   email: "",
//   point: 0,
//   note: "",
// });

const member = reactive({
  id: 0,
  name: "",
  email: "",
  phone: "",
  password: "",
});

const onAdd = () => {
  axios
    .post("http://localhost:3000/signup", {
      id: member.id,
      name: member.name,
      email: member.email,
      phone: member.phone,
      password: member.password,
    })
    .then(function (response) {
      console.log("이게뭔데요대체~");
      console.log(response);
      //목록 이동
      router.push({ name: "MemberList" });
    })
    .catch(function (error) {
      console.log(error);
    });
};

//함수
// const onAdd = () => {
//   memberList.set(member.id, member);
//   //목록 이동
//   router.push({ name: "MemberList" });
// };
</script>
