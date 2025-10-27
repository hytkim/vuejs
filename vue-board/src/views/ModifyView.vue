<template>
  <div class="modify-view">
    <h3>게시글 수정</h3>

    <form v-if="formData.id" @submit.prevent="handleSubmit" class="post-form">
      <div>
        <label for="writer">작성자</label>
        <input type="text" id="writer" v-model="formData.writer" readonly disabled />
      </div>
      <div>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="formData.title" required />
      </div>
      <div>
        <label for="content">내용</label>
        <textarea id="content" v-model="formData.content" rows="10" required></textarea>
      </div>
      <button type="submit">수정 완료</button>
    </form>
    <p v-else>게시글 정보를 불러오는 중입니다...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "@/stores/post";

const route = useRoute(); // 현재 라우트 정보 (params.id 접근)
const router = useRouter(); // 페이지 이동 (push)
const store = usePostStore();

// [근거] 폼 입력을 위한 '로컬 복사본'
// (onMounted에서 덮어쓰기되므로 초기값은 크게 중요하지 않습니다)
const formData = ref({
  id: null,
  title: "",
  content: "",
  writer: "",
});

onMounted(async () => {
  // [근거] 새로고침 대응 (스토어가 비어있을 시)
  if (store.posts.length === 0) {
    try {
      await store.fetchPosts();
    } catch (err) {
      console.error("데이터 로딩 실패:", err);
      router.push({ name: "HomeView" });
      return;
    }
  }

  const postId = parseInt(route.params.id);

  // [근거] 1단계에서 수정한 게터(getPostById) 사용
  const originalPost = store.getPostById(postId);

  if (originalPost) {
    // [근거] 폼 데이터(formData)에 원본 객체의 값을 복사합니다.
    // (여기서 writer, write_date 등이 formData.value에 포함됩니다)
    formData.value = { ...originalPost };
  } else {
    console.error("수정할 게시글을 찾을 수 없습니다:", postId);
    router.push({ name: "HomeView" });
  }
});

// [근거] 폼 제출 핸들러
const handleSubmit = async () => {
  if (!formData.value.id) return; // ID가 없으면 실행 중지

  try {
    // ❗ [핵심 수정]
    // [근거] formData.value를 통째로 보내지 않고,
    // 백엔드 API가 요구하는 필드(id, title, content, writer)만
    // '선별'하여 새 객체(postDataToSend)로 만듭니다.
    // (이렇게 하면 onMounted에서 복사된 'write_date'가 제외됩니다.)
    const postDataToSend = {
      id: formData.value.id,
      title: formData.value.title,
      content: formData.value.content,
      writer: formData.value.writer,
    };

    // 'write_date'가 제외된 새 객체를 Pinia 액션으로 전달합니다.
    await store.putPost(postDataToSend);

    alert("게시글이 성공적으로 수정되었습니다.");

    // 수정 완료 후 홈으로 이동
    router.push({ name: "HomeView" });
  } catch (err) {
    console.error("게시글 수정 실패:", err);
    alert("게시글 수정에 실패했습니다.");
  }
};
</script>

<style scoped>
/* [근거] :scope (루트 요소)
  PostList.vue와 동일하게 화면 우측에 배치 (width, float)
*/
:scope {
  width: 60%;
  float: right;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
}

h3 {
  font-size: 26px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
}

/* [근거] .post-form (PostForm.vue와 유사한 폼 스타일)
  폼 레이아웃을 정의합니다.
*/
.post-form {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-form div {
  display: flex;
  flex-direction: column;
}

.post-form label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.post-form input[type="text"],
.post-form textarea {
  font-size: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s;
  font-family: inherit; /* 폰트 상속 */
}

.post-form input[type="text"]:focus,
.post-form textarea:focus {
  outline: none;
  border-color: #007bff;
}

/* [근거] input:disabled (읽기 전용 필드)
  작성자(writer) 필드처럼 비활성화된 input의 스타일
*/
.post-form input:disabled {
  background-color: #f4f4f4;
  color: #888;
  cursor: not-allowed;
}

.post-form button {
  font-size: 16px;
  font-weight: 700;
  color: white;
  background-color: #007bff; /* 수정 버튼 (파란색) */
  border: none;
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.post-form button:hover {
  background-color: #0056b3;
}
</style>
