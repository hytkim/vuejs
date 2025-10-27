<template>
  <div>
    <h3>상세 화면</h3>
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    <p>
      <em>작성자: {{ post.writer }}</em>
    </p>
    <p>작성일시: {{ writeDate }}</p>
    <button @click="deletePostHandler">삭제</button>
    <RouterLink to="/">목록으로</RouterLink>
  </div>
</template>

<script setup>
// import { computed, inject, onMounted, ref } from "vue";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const route = useRoute(); // 라우트객체 생성
const router = useRouter(); // 라우터 객체 생성
// const deletePost = inject("deletePost"); // deletePost 함수 주입
// 게시글 데이터 상태 관리
const post = ref({});
const writeDate = computed(() => {
  if (post.value.write_date) {
    return new Date(post.value.write_date).toLocaleDateString();
  }
  return "";
});

// Mounted훅에서 실행될 이벤트
onMounted(async () => {
  // 여기서  rote.params.id를 사용하여 필요한 데이터를 가져옴
  const result = await axios(`http://localhost:3000/board/${route.params.id}`);
  console.log("PostData: ", result.data);
  post.value = result.data[0];
});

// 게시글 삭제 inject 이벤트 핸들러
const deletePostHandler = async () => {
  await axios.delete(`http://localhost:3000/board/${route.params.id}`);
  // router.push("/");
  router.push({ name: "HomeView" });
};
</script>
