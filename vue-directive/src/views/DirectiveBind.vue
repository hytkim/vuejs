<script setup>
// js로 만들려면 변경된데이터를 화면에 갱신해주는 기능을 직접 만들어줘야함

// Vue.js 특징 1. 데이터 변경 -> 화면 갱신(DOM update) refresh.

import { ref, reactive, computed } from "vue";
// Data(.js)영역에 존재하는 url의 값을 a태그의 href속성에다가 바인딩함
const url = ref("http://vuejs.org/");
const boolean = ref(true);

// 복수 속성을 한번에 바인딩하려면 객체로 바인딩해야하는데 그러려면 reactive가 필요하다!
// 최종 경로가 index.html/src/assets/logo.svg라서 최종 html기준으로  경로작성해줘야한다.
// page 90
const imgAttributes = reactive({
  src: "./src/assets/logo.svg",
  alt: "Vue 기본 log 입니다.",
  width: 350,
});
// const txtColor = ref("yellow");
// const bgColor = ref("red");
const styleAttributes = reactive({
  color: "yellow",
  backgroundColor: "pink",
});
// setInterval(() => {
//   boolean.value = Math.round(Math.random() * 10) > 1 ? true : false;
// }, 1000);

const msg = ref("Hello, World");
const isTxtColorRed = ref(true);
const isBgColorBlue = ref(false);

const classStyles = reactive({
  txtColorRed: true,
  bgColorBlue: true,
  txtSize24: true,
});

// Data 속성
let isRedTrue = ref(false);
let isBgBlueTrue = ref(false);
let isSize24True = ref(false);
// computed는 함수이긴한데 얘도 Data속성
// computed는 읽기전용이라 안에 속성 값을 변경할수는 없는데, Data자체를 갈아치울수는 있다..
const computedStyles = computed(() => {
  // JavaScript's 0, '', null => false
  //0.0~ 0.9999... 인데 round로반올림해서 0 || 1값이나온다!
  // isRedTrue = ref(Math.round(Math.random()));
  // isBgBlueTrue = ref(Math.round(Math.random()));
  // isSize24True = ref(Math.round(Math.random()));

  // js는 [0, null, '']을 false로 치기때문에 이렇게 변환 안 하고 바로 변수에 때려넣어도잘 반영해준다. 캐스팅
  // isRedTrue = isRedTrue == 0 ? false : true;
  // isBgBlueTrue = isBgBlueTrue == 0 ? false : true;
  // isSize24True = isSize24True == 0 ? false : true;

  return {
    txtColorRed: isRedTrue.value,
    bgColorBlue: isBgBlueTrue.value,
    txtSize24: isSize24True.value,
  };
});

setInterval(() => {
  // computedStyles();
  // isTxtColorRed.value = Math.round(Math.random());
  // isBgColorBlue.value = Math.round(Math.random());

  isRedTrue.value = Math.round(Math.random());
  isBgBlueTrue.value = Math.round(Math.random());
  isSize24True.value = Math.round(Math.random());

  console.log(
    "돌아가는중입니동: red",
    isRedTrue.value,
    "blue",
    isBgBlueTrue.value,
    "size",
    isSize24True.value,
  );
}, 3000);
</script>

<template>
  <!-- 
   html에서 style로 바인딩해줄수도있다.
   => 바인딩을 '' 로 감싸고, 내부에 속성을 주기 위해 "" 를 쓴다! 근데이건 prettierrc 설정바꿔야되네 또 
   귀찮다 그냥값 읽어오자
    -->
  <p>
    <!-- <a v-bind:href="url" v-bind:style="{ color: txtColor, backgroundColor: bgColor }" -->
    <a v-bind:href="url" v-bind:style="styleAttributes">Vue.js Site</a>
  </p>
  <p><a v-bind:href="url + 'guide/introduction.html'">Vue.js Guide Page</a></p>
  <p><button v-bind:disabled="boolean">Clicked</button></p>
  <p><img alt="Vue 로고" v-bind="imgAttributes" /></p>

  <p v-bind:class="{ txtColorRed: isTxtColorRed, bgColorBlue: isBgColorBlue }">{{ msg }}</p>
  <!-- 카멜케이스가아니라 케밥케이스면 '' 를 사용하여 -기호로 인한 오류가 발생하지 않게 신경써줘야한다. -->
  <p v-bind:class="{ 'txt-color-pink': isTxtColorRed, bgColorBlue: isBgColorBlue }">{{ msg }}</p>
  <!-- 아니면 객체로만들어서 직접 객체값할당해주던가-->
  <p v-bind:class="classStyles">{{ msg }}</p>
  <!-- computed를 사용해서 클래스가 화면로딩마다 계속바뀌게 해보자-->
  <p v-bind:class="computedStyles">{{ msg }}</p>
</template>

<style scoped>
.txtColorRed {
  color: red;
}
.txt-color-pink {
  color: pink;
}
.bgColorBlue {
  background-color: blue;
}
.txtSize24 {
  font-size: 24px;
}
</style>
