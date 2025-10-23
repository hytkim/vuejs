<script setup>
// 컴포넌트? 모듈? 라이브러리?
import { ref } from 'vue';

// 현재 시각 정보를 취득할수있는 Date객체 생성
const now = new Date();
// 객체에서 현재 시각 문자열 반환 함수를 사용하여 값을 할당함 :: 값인줄 알았는데 밑에서보니까 객체네?
const nowStr = now.toLocaleTimeString();
// 현재 시각 문자열을 html 변수로 담음 (정적 인가?)
let timeStrt = nowStr;
// 현재 시각 문자열을 반응형 html 변수로 담음 (이건 동적이 맞지)
const timeStrRef = ref(nowStr); // timeStrRef.value 반응형 처리 되도록 동적으로변경되는.value 속성을 넣어주는게 ref() 인듯?

const changeTime = () => {
  const newTime = new Date();
  const newTimeStr = newTime.toLocaleTimeString();
  timeStrt = newTimeStr;
  timeStrRef.value = newTimeStr;
};
setInterval(changeTime, 10000); // 1000분에 1초 단위라서 10,000 넣으면 10초에 1번갱신된다
</script>

<template>
  <!-- 하지만 둘 다 갱신된다! -->
  <p>현재 시간: {{ timeStrt }}</p>
  <p>현재 시간(ref): {{ timeStrRef }}</p>
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
