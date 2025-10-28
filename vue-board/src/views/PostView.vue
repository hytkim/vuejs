<template>
  <div v-if="post" class="post-detail">
    <h3>{{ post.title }}</h3>
    <div class="meta">
      <span>작성자: {{ post.writer }}</span>
      <span>작성일: {{ post.write_date }}</span>
    </div>
    <div class="content">
      {{ post.content }}
    </div>

    <div class="button-group">
      <RouterLink :to="{ name: 'HomeView' }" class="btn-list"> 목록 </RouterLink>
      <RouterLink
        v-if="isLoggedIn && (user.name === post.writer || user.isAdmin)"
        :to="{ name: 'ModifyView', params: { id: post.id } }"
        class="btn-modify"
      >
        수정
      </RouterLink>
      <button
        v-if="isLoggedIn && (user.name === post.writer || user.isAdmin)"
        @click="deletePostHandler"
        class="btn-delete"
      >
        삭제
      </button>
    </div>
  </div>
  <div v-else>
    <p>게시글을 불러오는 중...</p>
  </div>
  <div class="reply-section">
    <h4>댓글</h4>
    <form v-if="isLoggedIn" @submit.prevent="handleReplySubmit" class="reply-form">
      <textarea v-model="newReplyContent" rows="3" placeholder="댓글을 입력하세요..."></textarea>
      <button type="submit">등록</button>
    </form>
    <div v-else class="reply-login-prompt">
      댓글을 작성하려면
      <RouterLink :to="{ name: 'LoginView', query: { redirect: $route.fullPath } }">
        로그인
      </RouterLink>
      이 필요합니다.
    </div>
    <ul v-if="replies.length > 0" class="reply-list">
      <li v-for="reply in replies" :key="reply.id">
        <div v-if="editingReplyId === reply.id" class="reply-edit-form">
          <textarea v-model="editingContent" rows="3"></textarea>
          <div class="reply-edit-buttons">
            <button @click="handleReplyUpdate" class="btn-edit-save">완료</button>
            <button @click="cancelEdit" class="btn-edit-cancel">취소</button>
          </div>
        </div>
        <div v-else>
          <div class="reply-header">
            <strong>{{ reply.writer }}</strong>
            <span class="reply-date">
              {{ new Date(reply.write_date).toLocaleString() }}
            </span>
          </div>
          <p class="reply-content">{{ reply.content }}</p>
          <div
            class="reply-footer"
            v-if="isLoggedIn && (user.name === reply.writer || user.isAdmin)"
          >
            <button @click="startEdit(reply)" class="btn-reply-edit">수정</button>
            <button @click="handleReplyDelete(reply.id)" class="btn-reply-delete">삭제</button>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>아직 댓글이 없습니다.</p>
  </div>
</template>

<script setup>
// import { computed, inject, onMounted, ref } from "vue";
// import { onBeforeMount } from "vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "../stores/post";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";

// Auth Store : 근데 왜이렇게쓰는건지모르겠음 import pinia는 왜 하는거임?
const authStore = useAuthStore();
const { isLoggedIn, user } = storeToRefs(authStore);

// --- Post Store ---
const route = useRoute(); // 라우트객체 생성
const router = useRouter(); // 라우터 객체 생성
// Store사용
const postStore = usePostStore();
// ❗ 1. 'replies'와 액션(fetchReplies, addReply)을 가져옵니다.
const { replies } = storeToRefs(postStore);
const { fetchReplies, addReply, getPostById, fetchPosts, updateReply, deleteReply } = postStore;

// --- Local State ---
const post = ref(null);
const newReplyContent = ref("");
// ❗ 2. [신규] 댓글 수정 상태를 관리할 ref
const editingReplyId = ref(null); // 현재 수정 중인 댓글의 ID
const editingContent = ref(""); // 수정 중인 댓글의 새 내용

// --- Hooks ---
onMounted(async () => {
  const postId = route.params.id;
  // (새로고침 대비)
  if (postStore.posts.length === 0) {
    await fetchPosts();
  }
  // 스토어에서 현재 게시글 찾기
  post.value = getPostById(postId);

  // ❗ 3. [추가] 게시글 로드 후, 댓글도 함께 불러옵니다.
  if (post.value) {
    await fetchReplies(postId);
  }
});
// 게시글 삭제 inject 이벤트 핸들러
const deletePostHandler = async () => {
  const postId = route.params.id;
  await postStore.deletePost(postId);
  // 목록으로 이동
  router.push({ name: "HomeView" });
};

// ❗ 4. [신규] 댓글 제출 핸들러
const handleReplySubmit = async () => {
  if (!newReplyContent.value.trim()) {
    alert("댓글 내용을 입력하세요.");
    return;
  }

  const replyData = {
    content: newReplyContent.value,
    board_id: post.value.id, // 현재 게시글 ID
    writer: user.value.name, // 로그인한 사용자 이름
  };

  await addReply(replyData);
  newReplyContent.value = ""; // 폼 초기화
};
// ❗ 3. [신규] 댓글 삭제 핸들러
const handleReplyDelete = async (replyId) => {
  if (confirm("이 댓글을 정말로 삭제하시겠습니까?")) {
    await deleteReply(replyId);
  }
};

// ❗ 4. [신규] '수정 시작' 핸들러
const startEdit = (reply) => {
  editingReplyId.value = reply.id;
  editingContent.value = reply.content; // textarea 초기값 설정
};

// ❗ 5. [신규] '수정 완료' 핸들러
const handleReplyUpdate = async () => {
  if (!editingContent.value.trim()) {
    alert("수정할 내용을 입력하세요.");
    return;
  }
  await updateReply(editingReplyId.value, editingContent.value);
  // 수정 모드 종료
  editingReplyId.value = null;
  editingContent.value = "";
};

// ❗ 6. [신규] '수정 취소' 핸들러
const cancelEdit = () => {
  editingReplyId.value = null;
  editingContent.value = "";
};
</script>

<style scoped>
/* (PostView에 어울리는 스타일 예시) */
.post-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}
.meta {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 20px;
}
.meta span {
  margin-right: 15px;
}
.content {
  font-size: 1.1em;
  line-height: 1.6;
  min-height: 150px; /* 내용 영역 */
  border-top: 1px solid #eee;
  padding-top: 20px;
}
.content pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}
.button-group {
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: space-between; /* ❗ 수정: 양 끝 정렬 */
  align-items: center;
}
/* ❗ [신규] 목록 버튼 스타일 */
.btn-list {
  padding: 8px 15px;
  border: 1px solid #555;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  background-color: #f0f0f0;
  color: #333;
  transition: background-color 0.2s;
}
.btn-list:hover {
  background-color: #e0e0e0;
}
/* ❗ [신규] 조건부 버튼 래퍼 */
.conditional-buttons {
  display: flex;
  gap: 10px;
}
.btn-modify,
.btn-delete {
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
}
.btn-modify {
  background-color: #007bff;
  color: white;
}
.btn-delete {
  background-color: #d9534f;
  color: white;
}
/* [신규] 구분선 스타일 */
.divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 40px 0;
}
/* [신규] 댓글 섹션 공통 */
.reply-section h4 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
}
/* [신규] 댓글 작성 폼 */
.reply-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}
.reply-form textarea {
  font-size: 15px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
}
.reply-form button {
  align-self: flex-end; /* 버튼 오른쪽 정렬 */
  padding: 8px 20px;
  font-weight: 600;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.reply-login-prompt {
  background-color: #f9f9f9;
  border: 1px dashed #ccc;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 30px;
}
/* [신규] 댓글 목록 */
.reply-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.reply-list li {
  background-color: #fdfdfd;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px 20px;
}
.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.reply-header strong {
  font-size: 15px;
  color: #333;
}
.reply-date {
  font-size: 13px;
  color: #888;
}
.reply-content {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 10px;
}
/* ❗ [수정] 올바른 CSS 주석으로 변경 */
/* ❗ [신규] 댓글 버튼 공통 스타일 */
.reply-footer {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.btn-reply-edit,
.btn-reply-delete {
  background: none;
  border: 1px solid #aaa;
  color: #555;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-reply-delete {
  border-color: #d9534f;
  color: #d9534f;
}
.btn-reply-edit:hover {
  background-color: #eee;
}
.btn-reply-delete:hover {
  background-color: #d9534f;
  color: white;
}
/* ❗ [신규] 댓글 수정 폼 스타일 */
.reply-edit-form textarea {
  width: 100%;
  font-size: 15px;
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 6px;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 10px;
}
.reply-edit-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.btn-edit-save,
.btn-edit-cancel {
  padding: 5px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
.btn-edit-save {
  background-color: #007bff;
  color: white;
}
.btn-edit-cancel {
  background-color: #f0f0f0;
  color: #333;
}
</style>
