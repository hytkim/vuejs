<script setup>
// import {ref, reactive} from 'vue';
</script>
<template>
  <div id="container">
    <header>
      <h1>My First Vue Web-Page</h1>
      <p>MTML & CSS Default Structur</p>
    </header>
    <div>
      <h2>WellCome!</h2>
      <p>
        this page's HTML & CSS Maked it, 암튼 기본적인 구조와 스타일을 쌈뽕하게 달리고있습니다잉
      </p>
      <h3>내용 예시</h3>
      <ul>
        <li>
          <p>simple text</p>
        </li>
        <li>
          <p>링크:<a href="">예시 사이트</a></p>
        </li>
        <li>
          <p>list context</p>
        </li>
      </ul>
    </div>
    <div id="buttom_container">
      <p>@ 2025 나의 웹 페이지 모든 권한 보유</p>
    </div>
  </div>
</template>

<style>
body {
  background-color: gainsboro;
}
ul {
  margin: 0;
  padding: 0;
}
#container {
  width: 100%;
  margin: 0 auto;
}
header {
  background-color: greenyellow;
  text-align: center;
  margin: 0;
}
header > h1,
header > p {
  color: aliceblue;
}
h1 {
  font-weight: 600;
}
h3,
h2 {
  font-weight: 700;
}
#container div:nth-child(2) {
  width: 100%;
  height: 360px;
  margin-top: 20px;
  padding: auto, 30px;
  background-color: aliceblue;
  /* 1. 둥근 모서리 */
  border-radius: 10px; /* 10px 만큼 둥글게 만듭니다 */

  /* 2. 그림자 */
  /* box-shadow: [X축] [Y축] [흐림(blur)] [색상]; */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
#container div {
  margin-top: 20px;
  padding: 0px 30px;
}
#buttom_container {
  width: 100%;
  height: 60px;
  text-align: center;
}
#buttom_container p {
  color: #ccc;
}
</style>
