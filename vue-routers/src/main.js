// import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router); // ./router에 정의된 라우팅정보를 활용함. 생성된 라우팅정보를 활용하여 이 페이지를 구성한다는 선언

app.mount("#app");
