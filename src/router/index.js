import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home.vue";
import NavFooter from "@/views/navfooter.vue";
import My from "@/views/my.vue";
import MyInfo from "@/components/myInfo.vue";
import MyAccount from "@/components/myAccount.vue";
import MyLink from "@/components/mylink.vue";
import MyLabel from "@/components/myCollect.vue";
import MyHistoryCord from "@/components/myNewType.vue";
import NavFrame from "@/views/navframe-home.vue";
import NavframeMylink from "@/views/navframe-mylink.vue";
import HomemainRight from "@/components/homemainRight.vue";
import HomemainRightUser from "@/components/homemainRightUser.vue";
import NavframeMyCollect from "@/views/navframe-myCollect.vue";
import demo5 from "@/components/demo/demo5.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "home",
    component: NavFooter,
    children: [
      {
        path: "/home",
        component: Home,
        redirect: "/home1",
        children: [
          {
            path: "/home1",
            component: HomemainRight,
          },
          {
            path: "/home2",
            component: HomemainRightUser,
          },
        ],
      },
      {
        path: "/my",
        redirect: "/myInfo",
        component: My,
        children: [
          {
            path: "/myInfo",
            component: MyInfo,
          },
          {
            path: "/myAccount",
            component: MyAccount,
          },

          {
            path: "/myLink",
            component: MyLink,
          },
          {
            path: "/myLabel",
            component: MyLabel,
          },
          {
            path: "/myHistoryCord",
            component: MyHistoryCord,
          },
        ],
      },
    ],
  },
  {
    path: "/navFrame",
    component: NavFrame,
  },
  {
    path: "/navframeMylink",
    component: NavframeMylink,
  },
  {
    path: "/navframeMyCollect",
    component: NavframeMyCollect,
  },
  {
    path: "/select",
    component: demo5,
  },
];

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
