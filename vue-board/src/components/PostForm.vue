<template>
  <h3>글작성</h3>
  <form v-on:submit.prevent="addPostHandler">
    <div>
      <label for="title">제목</label>
      <input type="text" id="title" name="title" v-model="title" required />
    </div>
    <div>
      <label for="content">내용:</label>
      <textarea type="text" id="content" name="content" v-model="content" required> </textarea>
    </div>
    <div>
      <label for="writer">작성자</label>
      <input type="text" id="writer" name="writer" v-model="writer" required />
    </div>
    <button type="submit">작성</button>
  </form>
</template>

<script setup>
import { ref, inject } from "vue";
//상위 컴포넌트에서 provide로 정의한 함수를 inject로 받아올것.
const addPost = inject("addPost");

//Data
const title = ref("");
const content = ref("");
const writer = ref("");

//폼 제출 이벤트 핸들러
const addPostHandler = () => {
  // 예외 처리
  if (!title.value || !content.value || !writer.value) {
    alert("모든 필드를 작성해주세요.");
    return;
  }

  // 입력값으로 상위컴포넌트에 전송할 데이터 생성
  const newPost = {
    title: title.value,
    content: content.value,
    writer: writer.value,
  };

  //상위컴포넌트로 전송
  addPost(newPost);

  //폼 초기화
  title.value = "";
  content.value = "";
  writer.value = "";
};
</script>

<style scoped>
/* 폼 컨테이너: :scope는 이 컴포넌트의 루트 요소(div)를 선택합니다.
   float와 width를 사용해 왼쪽 열을 만듭니다.
*/
:scope {
  width: 38%; /* 왼쪽 영역 너비 */
  float: left;
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 */

  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
  height: 100%; /* 임시 높이 설정, 내용에 따라 조절될 수 있음 */
}

h3 {
  font-size: 26px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form > div {
  display: flex;
  flex-direction: column;
}

form > div > label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  font-family: inherit;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

input[type="text"]:focus,
textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
  outline: none;
}

textarea {
  min-height: 180px;
  resize: vertical;
}

button[type="submit"] {
  padding: 14px 20px;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 10px;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
