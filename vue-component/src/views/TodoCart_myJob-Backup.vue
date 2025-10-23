<template>
  <h2>🛒 장바구니</h2>

  <div style="margin-bottom: 1rem">
    <label>상품코드: <input type="text" v-model="code" /></label><br />
    <label>상품명: <input type="text" v-model="name" /></label><br />
    <label>가격: <input type="number" v-model="price" /></label><br />
    <label>수량: <input type="number" v-model="qty" /></label><br />
    <button @click="addItem">상품 추가</button>
  </div>

  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr style="background-color: #eee">
        <th>상품코드</th>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>합계</th>
        <th>삭제</th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr>
        <td>P001</td>
        <td>무선마우스</td>
        <td>15000원</td>
        <td>
          <input type="number" min="1" style="width: 60px" />
        </td>
        <td>15000원</td>
        <td><button>❌</button></td>
      </tr> -->
      <tr v-for="[pcode, item] in cartList" v-bind:key="pcode">
        <td>{{ pcode }}</td>
        <td>{{ item.pName }}</td>
        <td>{{ item.price }}원</td>
        <td>
          <input
            type="number"
            min="1"
            v-on:change="setItemPrice(pcode, item)"
            v-model="item.cnt"
            style="width: 60px"
          />
        </td>
        <td>{{ item.cnt * item.price }}원</td>
        <td><button @click="RemoveCartList(pcode)">❌</button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th colspan="4" style="text-align: right">총합계:</th>
        <th colspan="2">{{ sum }}원</th>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
const code = ref("P003");
const name = ref("무선마우스");
const price = ref(20000);
const qty = ref(1);

// 상품 정보를 담을 객체 생성
const map = new Map();
map.set("P001", { pId: "P001", pName: "무선마우스", price: 15000, cnt: 1 });
map.set("P002", { pId: "P002", pName: "무선키보드", price: 25000, cnt: 1 });
//그냥 담기만 하면반응형이 안되니까 변수 ref를쓰는것처럼 객체변수는 reactive를써준다.
const cartList = reactive(map);

// 상품정보와관련된 항목들이 전부 표에있기때문에
// cartList가 변경되어야 computed가 실행되고 vue가 화면갱신을하기때문에
const sum = computed(() => {
  let amt = 0;
  for (let item of cartList.values()) {
    amt += item.price * item.cnt;
  }
  return amt;
});

// setItemPrice에서 reactive Map 객체자체를 바꾸는식으로 진행을한다.
const setItemPrice = (key, item) => {
  cartList.set(key, { ...item });
};
const RemoveCartList = (pcode) => {
  cartList.delete(pcode);
};

const addItem = () => {
  if (!code.value || !name.value || !price.value || !qty.value) {
    alert("입력필요");
    return;
  }
  cartList.set(code.value, {
    pid: code.value,
    pName: name.value,
    price: price.value,
    cnt: qty.value,
  });
  code.value = "";
  name.value = "";
  price.value = 0;
  qty.value = 1;
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
input[type="text"],
input[type="number"] {
  margin: 3px 0;
}
button {
  margin-top: 5px;
}
</style>
