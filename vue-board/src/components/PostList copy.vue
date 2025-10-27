<template>
  <div class="post-list">
    <h3>게시글 목록</h3>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h4>
          <RouterLink v-bind:to="{ name: 'PostView', params: { id: post.id } }">{{
            post.title
          }}</RouterLink>
        </h4>
        <p>{{ post.content }}</p>
        <p>
          <em>작성자: {{ post.writer }}</em>
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { defineProps } from "vue";
defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* [근거] :scope 선택자 사용
  - 컴포넌트의 루트 요소(div)를 선택합니다.
  - 'float'와 'width'를 사용해 화면 우측에 배치되도록 설정합니다.
*/
:scope {
  width: 60%;
  float: right;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
}

/* [근거] h3 태그 선택자
  - 목록 전체의 제목 스타일을 정의합니다.
*/
h3 {
  font-size: 26px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
}

/* [근거] ul 태그 선택자
  - 리스트의 기본 점(bullet point)을 제거하고, flex를 이용해 카드(li) 사이의 간격을 설정합니다.
*/
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 카드(li) 사이의 간격 */
}

/* [근거] li 태그 선택자
  - '게시글 카드'의 기본 디자인입니다.
  - padding을 0으로 설정하고, 각 섹션(h4, p)이 내부 공간을 직접 정의하도록 변경했습니다.
  - overflow: hidden을 추가하여 자식 요소(작성자 p)의 배경색이 둥근 모서리를 넘어가지 않게 합니다.
*/
li {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 0; /* 내부 섹션에서 패딩을 관리하도록 변경 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  overflow: hidden; /* 둥근 모서리를 위해 추가 */
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* [근거] h4 태그 선택자 (게시글 제목)
  - 구분을 명확히 하기 위해 아래쪽 테두리(border-bottom)를 추가했습니다.
  - 카드 내부에 맞게 패딩을 조절합니다.
*/
h4 {
  font-size: 22px;
  font-weight: 700;
  color: #0056b3; /* 제목 색상을 다르게 하여 강조 */
  margin: 0;
  padding: 20px 30px 15px 30px; /* 패딩 값 수정 */
  border-bottom: 1px solid #eee; /* 제목과 본문 구분선 */
}

/* [근거] p 태그 선택자 (본문)
  - 제목(h4)과 작성자(p:last-of-type)를 제외한 모든 p 태그에 적용됩니다.
  - 본문 내용이 들어가는 영역입니다.
*/
p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin: 0;
  padding: 20px 30px; /* 본문 영역 패딩 */
}

/* [근거] li > p:last-of-type (작성자)
  - li의 자식인 p 태그 중 '마지막' p 태그(작성자)만 선택합니다.
  - 구분을 명확히 하기 위해 배경색(#f9f9f9)을 추가했습니다.
  - 위쪽 테두리(border-top)를 추가하여 본문과 시각적으로 완전히 분리했습니다.
*/
li > p:last-of-type {
  font-size: 14px;
  color: #777; /* 작성자 텍스트 색상 변경 */
  margin: 0;
  text-align: right;
  background-color: #f9f9f9; /* 작성자 영역 배경색 추가 */
  padding: 15px 30px; /* 작성자 영역 패딩 */
  border-top: 1px solid #eee; /* 본문과 작성자 구분선 */
}

/* [근거] em 태그 선택자
  - 작성자 p 태그 안의 em 태그 스타일을 기본값(기울임)이 아닌 normal로 설정합니다.
*/
em {
  font-style: normal;
  font-weight: 600; /* 작성자 강조 */
}
</style>
