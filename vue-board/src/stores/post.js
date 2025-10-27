import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

// ❗ (수정 1) 이름을 userPostStore -> usePostStore로 변경
export const usePostStore = defineStore("post", () => {
  const posts = ref([]);

  // computed로 감싸고, 그 안에서 '인자를 받는 함수'를 반환합니다.
  const getPostById = computed(() => {
    // ❗ 이 함수가 '반환'됩니다.
    return (id) => {
      return posts.value.find((post) => post.id === parseInt(id));
    };
  });

  // ❗ (수정 3) Action 수정
  const addPost = async (newPost) => {
    // ❗ (수정 3-1) 백엔드가 { params: ... }를 기대하므로 'params' (s붙임)
    const result = await axios.post("http://localhost:3000/board", {
      params: newPost,
    });
    // ❗ (수정 3-2) INSERT 응답은 OkPacket이므로 'insertId' (id 아님)
    posts.value.push({ ...newPost, id: result.data.insertId });
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:3000/board/${id}`);
    posts.value = posts.value.filter((post) => post.id !== id);
  };

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:3000/boards");
    posts.value = response.data;
  };
  // 수정 action 만들고 modifyView를만들어서
  const putPost = async (modifiedPost) => {
    // 1. API 명세에 맞게 'axios.put' 사용
    await axios.put(`http://localhost:3000/board`, {
      params: modifiedPost,
    });

    // 2. (중요) API 호출 성공 시, 로컬 'posts' 상태도 업데이트
    const index = posts.value.findIndex((p) => p.id === modifiedPost.id);
    if (index !== -1) {
      // Vue의 반응성을 위해 객체를 새로 할당하거나 Object.assign 사용
      posts.value[index] = { ...posts.value[index], ...modifiedPost };
    }
  };

  return { posts, getPostById, addPost, deletePost, fetchPosts, putPost };
});
