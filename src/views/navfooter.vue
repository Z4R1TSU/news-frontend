<template>
  <div class="bg-custom-image d-flex flex-column">
    <Nav></Nav>
    <div class="container-fluid my-4 py-5 py-lg-6">
      <router-view></router-view>
    </div>
    <HomeFooter></HomeFooter>
  </div>
</template>

<script>
import Nav from "@/components/navTopComponent.vue";
import HomeFooter from "@/components/homefooter.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "home-vue",
  components: {
    Nav,
    HomeFooter,
  },
  setup() {
    const queryParams = ref();
    const route = useRoute();
    //const router = useRouter();
    onMounted(() => {
      //推特登录过来ch 设置用户状态缓存
      //sessionStorage.removeItem("user");
      queryParams.value = route.query.result;
      if (queryParams.value !== undefined) {
        // const user = decodeURIComponent(queryParams.value);
        console.log(JSON.parse(queryParams.value));
        sessionStorage.setItem("user", queryParams.value);
        //router.push({ path: "/home" });
        location.href = "http://netweb.link";
      }
    });
  },
};
</script>

<style>
.sidebar {
  height: 100vh; /* 使侧边栏占满整个视口高度 */
  position: fixed; /* 固定位置 */
  top: 2rem;
  left: 0;
  z-index: 1030; /* 确保侧边栏在内容之上 */
  background-color: #3a3a3afb;
  padding: 1rem;
  font-size: 0.5rem;
}
.bg-custom-image {
  /* background-image: url("../assets/images/bg5.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  /* background-color: rgb(232, 242, 242); */
}
</style>
