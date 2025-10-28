<!-- src/App.vue -->

<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
// [근거] storeToRefs를 사용해 isLoggedIn 게터를 반응형으로 가져옵니다.
const { isLoggedIn } = storeToRefs(authStore);

// [근거] 로그아웃 버튼과 연결할 함수
const handleLogout = () => {
  authStore.logout();
  alert("로그아웃 되었습니다.");
  router.push({ name: "HomeView" }); // 로그아웃 후 홈으로 이동
};
</script>

<template>
  <!-- [근거] 모든 페이지에 공통으로 표시될 네비게이션 헤더 -->
  <header class="navbar">
    <nav>
      <RouterLink to="/" class="nav-link">Home</RouterLink>

      <!-- [근거] v-if/v-else: 로그인 상태에 따라 다른 링크를 표시 -->
      <div v-if="isLoggedIn" class="nav-links-right">
        <!-- (향후 '글쓰기' 버튼을 이곳으로 옮길 수 있습니다) -->
        <button @click="handleLogout" class="nav-link-button">로그아웃</button>
      </div>
      <div v-else class="nav-links-right">
        <RouterLink
          :to="{ name: 'LoginView', query: { redirect: $route.fullPath } }"
          class="nav-link"
        >
          로그인
        </RouterLink>
        <RouterLink
          :to="{ path: '/register', query: { redirect: $route.fullPath } }"
          class="nav-link"
        >
          회원가입
        </RouterLink>
      </div>
    </nav>
  </header>

  <!-- [근거] <main> 태그로 컨텐츠 영역을 감쌉니다. -->
  <main>
    <!-- [근거] 이곳이 HomeView 또는 LoginView로 교체됩니다. -->
    <RouterView />
  </main>
</template>

<style scoped>
/* [근거] 공통 네비게이션 바 스타일 */
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 2rem;
}

nav {
  display: flex;
  justify-content: space-between; /* 양 끝 정렬 */
  align-items: center;
  height: 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-link {
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #f4f4f4;
}

.nav-links-right {
  display: flex;
  gap: 0.5rem; /* 링크 사이 간격 */
}

/* [근거] 로그아웃 버튼 스타일 */
.nav-link-button {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 1em;
  font-weight: 600;
  color: #2c3e50;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.nav-link-button:hover {
  background-color: #f4f4f4;
}

/* [근거] 메인 컨텐츠 영역 스타일 */
main {
  padding-top: 20px; /* 네비게이션 바 높이만큼 떨어트리기 */
  max-width: 1200px;
  margin: 0 auto;
}
</style>
