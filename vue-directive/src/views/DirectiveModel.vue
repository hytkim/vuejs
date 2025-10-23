<template>
  <!-- html 템플릿에서는 ref객체 이름만적어놔도 알아서 .value를 가져온다. -->
  <textarea v-bind:rows="rCount" v-model="textAreaInput"></textarea>
  <!-- /\n/g -> Enter Key를만나면 <br>태그로 대체하겠다. -->
  <p v-html="textAreaInput.replace(/\n/g, `<br>`)"></p>
  <br />
  <!-- 여기서 memberTpye은 select의 value를 따라간다! -->
  <select v-model="memberTpye">
    <option value="일반">일반회원</option>
    <option value="우수">우수회원</option>
    <option value="특별">특별회원</option>
  </select>
  <p>{{ memberTpye }}</p>
  <br />
  <section>
    <label><input name="os" type="checkbox" v-model="selectOS" value="1" />MacOS</label>
    <label><input name="os" type="checkbox" v-model="selectOS" value="2" />Windows</label>
    <label><input name="os" type="checkbox" v-model="selectOS" value="3" />Linux</label>
  </section>
  <p>{{ selectOS }}</p>

  <section>
    <label><input type="radio" name="selectedOS" v-model="selectedOS" value="1" />macOS</label>
    <label><input type="radio" name="selectedOS" v-model="selectedOS" value="2" />Windows</label>
    <label><input type="radio" name="selectedOS" v-model="selectedOS" value="3" />Linux</label>
  </section>
  <p>{{ selectedOS }}</p>
</template>

<script setup>
import { ref } from "vue";
// replace(/\n/g, `<br>`) -> new RegExp() 처럼 표현식
// 객체에다가 엔터키 입력값을찾아서 그 결과를 <br>로치환할건데 /g 글로벌요소로써
// textAreaInput전체 text요소에서 내가 원하는 값을 찾겠다.
const rCount = ref(5);
const textAreaInput = ref("Let's Input now");

const memberTpye = ref("일반");
const selectOS = ref(["1", "2"]); // 얘는 value가 문자열이고
const selectedOS = ref(1); // 얘는 숫자네
</script>
