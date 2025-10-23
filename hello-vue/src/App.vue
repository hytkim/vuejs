<script setup>
// import 선언하고 안 쓰면 문법이 오류처리함.
// ref 반응형, js값이변경되면 html에도 반영해주는것
import { ref } from 'vue';
const name = ref('홍길동');
</script>

<template>
  <!--name라는 변수의 값을 html이 읽어오는 방식-->
  <h1>안녕하세요 {{ name }}</h1>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
