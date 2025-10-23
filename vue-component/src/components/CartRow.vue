<script setup>
import { defineProps, ref, watch } from "vue";
const { item, pcode } = defineProps({
  item: { type: Object, required: true },
  pcode: String,
});
const emit = defineEmits(["update-qty", "remove"]);
const localQty = ref(1);

const removeItem = (code) => {
  emit("remove", code);
};
const applyTotalPrice = () => {
  emit("update-qty", pcode, { ...item, qty: localQty });
};
// 빠르고 정확한 감시를 위해 item.qty의 주소값을 감시하기위해
// return값이  item.qty인 함수를 감시한다.
// 그런데 기존에 qty변경감시하는거랑 item.qty감시랑차이가있나 그것도 객체의속성이잖아
watch(
  () => item.qty,
  (newQty) => (localQty.value = newQty),
  { immediate: true }, // watch라는속성, 최초page가 로딩될때 바뀐값이아니라서 값이 바뀌고나서야 감시를하는데, 이게있으면 초기화했을때도 추적을한다.
);
</script>
<template>
  <tr>
    <td>{{ item.code }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.price.toLocaleString() }}원</td>
    <td>
      <input
        type="number"
        @change="applyTotalPrice(pcode, item)"
        v-model.number="localQty"
        min="1"
        style="width: 60px"
      />
    </td>
    <td>{{ (item.price * item.qty).toLocaleString() }}원</td>
    <td><button v-on:click="removeItem(item.code)">❌</button></td>
  </tr>
</template>
