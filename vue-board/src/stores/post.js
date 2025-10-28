import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useAuthStore } from "./auth"; // ❗ 1. auth 스토어 임포트

// ❗ (수정 1) 이름을 userPostStore -> usePostStore로 변경
export const usePostStore = defineStore("post", () => {
  // const url = `http://localhost`;
  const url = `http://192.168.0.15`;
  const posts = ref([]);
  const replies = ref([]); // ❗ 1. 댓글 state 추가
  // ❗ 2. (R) 댓글 조회 액션 추가
  const fetchReplies = async (boardId) => {
    try {
      const response = await axios.get(`${url}:3000/board/${boardId}/replies`);
      replies.value = response.data; // 가져온 댓글로 state 갱신
    } catch (err) {
      console.error("댓글 로딩 실패:", err);
      replies.value = []; // 실패 시 비우기
    }
  };

  // ❗ 3. (C) 댓글 작성 액션 추가
  const addReply = async (replyData) => {
    // replyData = { content, board_id, writer }
    try {
      const result = await axios.post(`${url}:3000/reply`, {
        params: replyData,
      });

      // (가정) 백엔드가 OkPacket을 반환한다고 가정,
      // 즉각적인 반응성을 위해 로컬에서 객체를 만들어 추가합니다.
      const newReply = {
        ...replyData,
        id: result.data.insertId, // DB가 생성한 새 ID
        write_date: new Date().toISOString(), // 임시 날짜
      };
      replies.value.push(newReply);
    } catch (err) {
      console.error("댓글 작성 실패:", err);
    }
  };

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
    const result = await axios.post(`${url}:3000/board`, {
      params: newPost,
    });
    // ❗ (수정 3-2) INSERT 응답은 OkPacket이므로 'insertId' (id 아님)
    posts.value.push({ ...newPost, id: result.data.insertId });
  };

  const deletePost = async (id) => {
    await axios.delete(`${url}:3000/board/${id}`);
    posts.value = posts.value.filter((post) => post.id !== id);
  };

  const fetchPosts = async () => {
    const response = await axios.get(`${url}:3000/boards`);
    posts.value = response.data;
  };
  // 수정 action 만들고 modifyView를만들어서
  const putPost = async (modifiedPost) => {
    // 1. API 명세에 맞게 'axios.put' 사용
    await axios.put(`${url}:3000/board`, {
      params: modifiedPost,
    });

    // 2. (중요) API 호출 성공 시, 로컬 'posts' 상태도 업데이트
    const index = posts.value.findIndex((p) => p.id === modifiedPost.id);
    if (index !== -1) {
      // Vue의 반응성을 위해 객체를 새로 할당하거나 Object.assign 사용
      posts.value[index] = { ...posts.value[index], ...modifiedPost };
    }
  };

  // ❗ 2. [신규] (U) 댓글 수정 액션
  const updateReply = async (replyId, newContent) => {
    try {
      // 백엔드 API (PUT /reply) 호출
      // req.body에 { id, content } 전송
      await axios.put(`${url}:3000/reply`, {
        id: replyId,
        content: newContent,
      });

      // (성공 시) 로컬 state(replies)도 갱신
      const index = replies.value.findIndex((reply) => reply.id === replyId);
      if (index !== -1) {
        replies.value[index].content = newContent;
      }
    } catch (err) {
      console.error("댓글 수정 실패:", err);
    }
  };

  // ❗ 3. [신규] (D) 댓글 삭제 액션
  const deleteReply = async (replyId) => {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) return; // 로그인 확인

    try {
      // 백엔드 API (DELETE /reply/:id) 호출
      // req.body에 { id, writer }를 'data' 속성으로 전송
      await axios.delete(`${url}:3000/reply/${replyId}`, {
        data: {
          id: replyId,
          writer: authStore.user.name,
        },
      });

      // (성공 시) 로컬 state(replies)에서도 즉시 삭제
      replies.value = replies.value.filter((reply) => reply.id !== replyId);
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  return {
    // tbl_board
    posts,
    getPostById,
    addPost,
    deletePost,
    fetchPosts,
    putPost,

    // tbl_reply
    replies,
    fetchReplies,
    addReply,
    updateReply, // ❗ 4. updateReply 노출
    deleteReply, // ❗ 5. deleteReply 노출
  };
});
