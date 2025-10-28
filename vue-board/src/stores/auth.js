// src/stores/auth.js

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  // 1. ❗ [핵심 수정]
  // 스토어가 시작될 때, sessionStorage에서 'user'를 꺼내 초기값으로 설정
  const user = ref(JSON.parse(sessionStorage.getItem("user")) || null);

  // 2. Getter (기존과 동일)
  const isLoggedIn = computed(() => user.value !== null);

  // 3. Action: 로그인
  const login = async (email, password) => {
    try {
      // const response = await axios.post("http://localhost:3000/signin", {
      const response = await axios.post("http://192.168.0.15:3000/signin", {
        emailin: email,
        passwordin: password,
      });

      if (response.data.success) {
        const safeUser = response.data.user;

        // 3-1. Pinia 상태(RAM)에 저장
        user.value = safeUser;

        // 3-2. ❗ [핵심 수정] sessionStorage(서랍)에도 저장
        sessionStorage.setItem("user", JSON.stringify(safeUser));

        return true;
      } else {
        user.value = null;
        sessionStorage.removeItem("user"); // 실패 시 삭제
        return false;
      }
    } catch (err) {
      console.error("로그인 에러:", err);
      user.value = null;
      sessionStorage.removeItem("user"); // 에러 시 삭제
      return false;
    }
  };

  // 4. Action: 로그아웃
  const logout = () => {
    // 4-1. Pinia 상태(RAM)에서 삭제
    user.value = null;

    // 4-2. ❗ [핵심 수정] sessionStorage(서랍)에서도 삭제
    sessionStorage.removeItem("user");
  };

  return { user, isLoggedIn, login, logout };
});
