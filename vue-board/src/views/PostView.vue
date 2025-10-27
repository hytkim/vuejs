<template>
  <div>
    <h3>상세 화면</h3>
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    <p>
      <em>작성자: {{ post.writer }}</em>
    </p>
    <p>작성일시: {{ post.write_date }}</p>
    <button @click="deletePostHandler">삭제</button>
    <RouterLink to="/">목록으로</RouterLink>
  </div>
</template>

<script setup>
// import { computed, inject, onMounted, ref } from "vue";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "../stores/post";

const route = useRoute(); // 라우트객체 생성
const router = useRouter(); // 라우터 객체 생성

// Store사용
const postStore = usePostStore();
// const post = computed(() => postStore.getPostById);
const post = postStore.getPostById(route.params.id);
console.log("post is: ", post);
onBeforeMount(async () => {
  await postStore.fetchPosts();
});

// 게시글 삭제 inject 이벤트 핸들러
const deletePostHandler = async () => {
  const postId = route.params.id;
  await postStore.deletePost(postId);
  // 목록으로 이동
  router.push({ name: "HomeView" });
};
</script>
