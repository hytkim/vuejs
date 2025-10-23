<template>
  <div>
    <button v-on:click="onClickFnc">click</button>
    <p>result: {{ randValue }}</p>
  </div>
  <!-- 입력과 출력을 동시에 진행하는 양방향 바인딩 모델, input에 입력한 값이 실시간으로 msg데이터에 반영되고 
   변경된 msg데이터는 html에 즉시 갱신된다(영어만, 한글은 1박자 느리던데 이거 어케 갱신함?) -->
  <!-- V-MODEL 쌍방향 DATA바인딩은  INPUT.. 여기서 끝이 아니다! 셀렉, 쳌밬, 레이디오 -->
  <p><input type="text" v-model="msg" /></p>
  <p v-bind:class="computedStyles">{{ msg }}</p>
</template>

<script setup>
//, reactive
import { ref, computed } from "vue";

// Data Attribute.
const randValue = ref("Befor Started");
const msg = ref("Hello, world");
let isRedFlag = ref(true);
let isBlueFlag = ref(true);
const computedStyles = computed(() => {
  return { txtColorRed: isRedFlag.value, bgColorBlue: isBlueFlag.value };
});

const onClickFnc = () => {
  let r = Math.round(Math.random() * 100);
  randValue.value = r;

  isRedFlag.value = r > 50 ? true : false;
  isBlueFlag.value = r < 50 ? true : false;
};
</script>

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
