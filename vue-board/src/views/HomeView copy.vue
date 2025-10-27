<script setup>
import { onMounted, ref, provide } from "vue";
import axios from "axios";
// 다른 뷰의 하위요소로 들어갈 뷰 컴포넌트들은 components 디렉토리에 만드는게 국룰이다.
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

// 데이터 상태 관리
const posts = ref([]);
// 이벤트 훅(특정 라이프사이클의 지점에서 호출되는 이벤트
onMounted(async () => {
  // 초기 데이터 로딩
  const result = await axios.get("http://localhost:3000/boards");
  console.log(result);
  posts.value = result.data;
});

// 함수
const addPost = async (newPost) => {
  const result = await axios.post("http://localhost:3000/board", { params: newPost });
  posts.value.push({ ...newPost, id: result.data.id });
};
provide("addPost", addPost);
// const deletePost = async (id) => {
//   await axios.post(`http://localhost:3000/board/${id}`);
//   posts.value = posts.value.filter((post) => post.id !== id);
// };

// provide("deletePost", deletePost);
</script>

<template>
  <div>
    <h3>게시판</h3>
    <PostForm />
    <PostList v-bind:posts="posts" />
  </div>
</template>
