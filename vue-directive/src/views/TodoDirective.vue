<template>
  <div id="myDIV" class="header">
    <h2 style="margin: 5px">My To Do List</h2>
    <input type="text" id="myInput" placeholder="Title..." v-model="title" />
    <!-- <span v-on:click="newElement()" class="addBtn">Add</span> -->
    <span v-on:click="newArray()" class="addBtn">Add</span>
  </div>

  <!-- 취소선좀어렵긴한데 함해봐라 li클릭하면 클릭이벤트들어가는거, x버튼은 class를 close로 등록하면된다 -->
  <!-- 버블링/캡처링을써서 item취소선이벤트와 X버튼 의 이벤트가 전파되는것을 차단해야한다. -->
  <ul id="myUL">
    <!-- map v-for구현 .stop으로 하위이벤트가 상위로 전파되는 버블링 차단 -->
    <!-- <li v-on:click="checkTodoList(index)" v-for="[index, text] in todoList" v-bind:key="index" v-bind:class="{ checked: text.checked }" >
      {{ text.title }}<span v-on:click.stop="rmTodoList(index)" class="close">X</span>
    </li> -->
    <li v-on:click="checkTodoList" v-for="item in todoArrayList" v-bind:key="item.index">
      {{ item.text }}<span v-on:click.stop="rmTodoArray(item.index)" class="close">X</span>
    </li>

    <!--  예시구조
    <li>Hit the gym<span class="close">X</span></li>
    <li class="checked">Pay bills</li>
    <li>Meet George</li>
    <li>Buy eggs</li>
    <li>Read a book</li>
    <li>Organize office</li> 
    -->
  </ul>
</template>

<script setup>
import { ref } from "vue";

// 변수
const title = ref("");
const index = ref(0);
const aryindex = ref(0);
// Map과 배열을써서 todoList추가하는걸해봐라.

// Array
const todoArrayData = [
  { index: 1, text: "RamG" },
  { index: 2, text: "Go ra nee" },
  { index: 3, text: "yd" },
];
const todoArrayList = ref(todoArrayData);
aryindex.value = todoArrayList.value.length + 1;

// Map으로 구현
const todoData = new Map();
todoData.set(1, { title: "Da Ram G", checked: false });
todoData.set(2, { title: "Go ra nee", checked: true });
todoData.set(3, { title: "Ramen", checked: false });

const todoList = ref(todoData);
index.value = Math.max(...todoList.value.keys()) + 1;

//map 목록에 값 추가
const newElement = () => {
  if (!title.value) {
    alert("값이 없다");
    return;
  }
  todoList.value.set(index.value, {
    title: title.value.trim(),
    checked: false,
  });
  // map의 keys 메서드를 이용하여 다음에 입력할 map의 인덱스를 찾아올 수 있다.
  index.value++;

  title.value = "";
};
// X버튼으로 map 목록에서 값 제거
const rmTodoList = (index) => {
  // console.log(`call rm index:`, index);
  todoList.value.delete(index);
};

// Map 목록의 클릭 이벤트 발생 여부를 확인
const checkTodoList = (index) => {
  // console.log("클릭이벤트가발생했습니다.", index);
  // console.log("클릭이벤트가발생했습니다.", todoList.value.get(index).checked );
  todoList.value.get(index).checked = !todoList.value.get(index).checked;
};

// const maxNo = () => {
// Map의 모든 key값이나 value값을 순서대로 가져오는 방법
// console.log(todoData.keys());
// console.log(todoData.values());
//   let max = 0;
//   for (let k of todoList.value.keys()) {
//     console.log(k);
//     if (max < k) {
//       max = k;
//     }
//   }
//   return ++max;
// }

// 아래는 array 함수, 위는 map함수
// [] push, unshift, pop, shift => splice(idx, option): 추가, 수정, 삭제 처리
const newArray = () => {
  if (!title.value) {
    alert("값이 없다");
    return;
  }
  todoArrayList.value.push({
    index: aryindex.value,
    text: title.value,
  });
  title.value = "";
};
const rmTodoArray = (index) => {
  console.log(index);
  // todoArrayList.value.pop(index)
};
</script>

<style>
body {
  margin: 0;
  min-width: 250px;
}

/* Include the padding and border in an element's total width and height */
* {
  box-sizing: border-box;
}

/* Remove margins and padding from the list */
ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  list-style-type: none;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;

  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: "";
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  background-color: #f44336;
  color: white;
}

/* Style the header */
.header {
  background-color: #f44336;
  padding: 30px 40px;
  color: white;
  text-align: center;
}

/* Clear floats after the header */
.header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
input {
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

/* Style the "Add" button */
.addBtn {
  padding: 10px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
}

.addBtn:hover {
  background-color: #bbb;
}
</style>

<!-- var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN"); 
  var txt = document.createTextNode("\u00D7"); 이게 X표시 유니코드
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
} -->
