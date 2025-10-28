<template>
  <div class="login-view">
    <h3>로그인</h3>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">로그인</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute(); // 현재 URL 정보
const store = useAuthStore();

// [근거] v-model과 연결될 로컬 ref 변수
const email = ref("");
const password = ref("");
const errorMessage = ref(null); // 로그인 실패 메시지

// [근거] 폼 제출 핸들러
const handleSubmit = async () => {
  errorMessage.value = null; // 이전 에러 메시지 초기화

  try {
    // 2단계에서 만든 auth.js 스토어의 login 액션 호출
    const loginSuccess = await store.login(email.value, password.value);

    if (loginSuccess) {
      // [근거] 로그인 성공 시 (store.user가 채워짐)
      alert("로그인 성공!");
      // ❗ [핵심 수정] redirect 꼬리표가 있는지 확인
      const redirectPath = route.query.redirect;

      if (redirectPath) {
        // 꼬리표가 있으면 (예: /post/3), 그 주소로 이동
        router.push(redirectPath);
      } else {
        // 꼬리표가 없으면 (예: /login으로 바로 접속), 홈으로 이동
        router.push({ name: "HomeView" });
      }
    } else {
      // [근거] 로그인 실패 시 (store.login이 false 반환)
      errorMessage.value = "이메일 또는 비밀번호가 올바르지 않습니다.";
    }
  } catch (err) {
    // [근거] 네트워크 오류 등 예외 발생 시
    console.error("로그인 처리 중 오류:", err);
    errorMessage.value = "로그인 중 오류가 발생했습니다. 다시 시도해 주세요.";
  }
};
</script>

<style scoped>
/* [근거] :scope: PostList/ModifyView와 유사한 레이아웃 */
:scope {
  width: 60%;
  float: right;
  box-sizing: border-box;
  padding: 20px;
}

h3 {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 30px;
}

.login-form {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  max-width: 500px;
  margin: 0 auto; /* 폼 중앙 정렬 */
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.form-group input {
  font-size: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  color: white;
  background-color: #007bff;
  border: none;
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #d9534f; /* 빨간색 */
  font-weight: 600;
  text-align: center;
  margin-top: 15px;
}
</style>
