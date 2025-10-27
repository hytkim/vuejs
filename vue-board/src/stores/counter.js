import { ref, computed } from "vue";
import { defineStore } from "pinia";

// use + counter + store => useCounterStore
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0); // state
  const doubleCount = computed(() => count.value * 2); // getter
  function increment() {
    // action: 상태값 변경
    count.value++;
  }

  return { count, doubleCount, increment };
});
