import './assets/main.css';

// 컴포넌트?
import { createApp } from 'vue';

// App.vue파일을 가져와서 컴포넌트를 생성
import App from './App.vue';

// mount #app=> 생성된 컴포넌트 App으로 만들어진 페이지를, ID가 app인 html태그에다가 mount시킨다!
createApp(App).mount('#app');
