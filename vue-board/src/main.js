import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia()); //stores의 공통객체를쓸수있다.
app.use(router);

app.mount("#app");
