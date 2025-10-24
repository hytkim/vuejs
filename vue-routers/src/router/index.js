import { createRouter, createWebHistory } from "vue-router";
import AppTop from "@/views/AppTop.vue";

// import, 함수차이 => import컴포넌트는 무거우면 느리기때문에 함수로간닷
//실제 /member/memberList라우팅정보가 호출 되면 그때생성하는방식으로 간다

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //경로 이름모두
      path: "/",
      name: "AppTop",
      component: AppTop,
    },
    {
      path: "/member/memberList",
      name: "MemberList",
      component: () => import("@/views/member/MemberList.vue"),
    },
    {
      path: "/member/detail/:id",
      name: "MemberDetail",
      component: () => import("@/views/member/MemberDetail.vue"),
      //routes: router가 가지고있는 파라메터를 처리해주는 객체
      props: (routes) => {
        const idNum = Number(routes.params.id);
        return {
          id: idNum,
        };
      },
    },
    {
      path: "/member/add",
      name: "MemberAdd",
      //vite.config.js의 alias를 활용 .src/views ...
      component: () => import("@/views/member/MemberAdd.vue"),
    },
  ],
});

export default router;
