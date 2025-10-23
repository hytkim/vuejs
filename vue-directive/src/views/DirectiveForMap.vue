<template>
  No: <input type="number" v-model="no" /><br />
  Name: <input type="text" v-model="name" /><br />
  phone: <input type="text" v-model="phone" /><br />
  <button v-on:click="addMap">Add</button>
  <div>
    <!-- map구조를 바탕으로 v-for를쓸때는 [key, value] 구조를따른다 -->
    <!-- 뒤늦게 ref no를 만들었는데, {{ no }}는 ref가 아니라 v-for의 no를 참조하는거 보니까 for문내부에서 처리 잘 해주는듯 -->
    <!-- Map v-for 를 쓸때[]에 들어가는 값은 set으로 할당한 값의 순서와 일치하는듯[v1, v2, v3] -->
    <p v-for="[no, name] in mapref" v-bind:key="name">
      번호: {{ no }}, 이름: {{ name.name }} / 번호: {{ name.phone }}
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// Js에서는 배열로 대부분 해결되었는데,
// Map 구조 => 키, 값 , 객체 구조=> {key: value} 키와 값으로 이루어진 구조 표현형식만 약간 다르고 key - value라는 전체적 구조는 유사하다
const map = new Map();

// 변수
const no = ref(0);
const name = ref("");
const phone = ref("010-0000-0000");

// map에 값을 할당할때 .set(key, vlaue) 메서드를 사용한다
// map.set(1, "다람쥐");
// map.set(2, "고라니");
// map.set(3, "나루토");
// 위처럼 단순한 이름만이아니라 객체로도 값을 받을 수 있다.
// map의 key값이 같으면 갱신된다
map.set(1, { name: "다람쥐", phone: "010-1111-1111" });
map.set(2, { name: "고라니", phone: "010-2222-2222" });
map.set(3, { name: "나루토", phone: "010-3333-3333" });

// map이 가진 값을 제거할때 map.delete(key)
map.delete(2);

//이걸 반응형으로 써보자
const mapref = reactive(map);

const addMap = () => {
  if (!name.value || !no.value) {
    return;
  }

  map.set(no.value, { name: name.value.trim(), phone: phone.value.trim() });
  no.value = "";
  name.value = "";
  phone.value = "010-0000-0000";
};
</script>
