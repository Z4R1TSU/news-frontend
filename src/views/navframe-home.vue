<template>
  <div>
    <Nav></Nav>
    <Leftmark></Leftmark>
    <iframe class="mt-5 pt-5 ms-lg-5" :src="link"></iframe>
    <footer class="fixed-bottom">
      <div class="container">
        <ul class="pagination row p-1 m-0">
          <li class="col-4 page-item" @click="preOne()">
            <a class="page-link"
              ><van-icon name="arrow-left" :color="isFirst"
            /></a>
          </li>
          <li class="col-4 page-item" @click="clickCollect()">
            <a class="page-link"
              ><van-icon name="label-o" :class="{ collected: isCollected > 0 }"
            /></a>
          </li>
          <li class="col-4 page-item" @click="nextOne()">
            <a class="page-link"><van-icon name="arrow" /></a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import Nav from "@/components/navTopComponent.vue";
import Leftmark from "@/components/leftmark.vue";

import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
export default {
  name: "navFrame-vue",
  components: {
    Nav,
    Leftmark,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const isCollected = computed(() => store.getters["UserCollect/isCollect"]);
    const key = ref(route.query.key);
    const newsList = computed(() => store.getters["Home/newsList"]);
    const countryCode = computed(() => store.getters["Home/country"]);
    const languageCode = computed(() => store.getters["Home/language"]);
    const type = computed(() => store.getters["Home/newType"]);
    const user = sessionStorage.getItem("user");
    const isFirst = ref("#909399");
    const nextOne = () => {
      if (key.value < newsList.value.length - 1) {
        isFirst.value = "#409EFF";
        key.value++;
      } else {
        if (type.value == "recommended") {
          const user = sessionStorage.getItem("user");
          console.log(user);
          if (user) {
            store.dispatch("Home/getNewsByUserNewType", {
              page: 0,
              userId: JSON.parse(user).userId,
              languageCode: languageCode.value,
              countryCode: countryCode.value,
            });
          } else {
            store.dispatch("Home/getNewsbyTLC", {
              page: 0,
              newType: null,
              languageCode: languageCode.value,
              countryCode: countryCode.value,
            });
          }
        } else {
          store.dispatch("Home/getNewsbyTLC", {
            page: 0,
            newType: type,
            languageCode: languageCode.value,
            countryCode: countryCode.value,
          });
        }
        // store.dispatch("Home/getNewsbyTLC", {
        //   page: 0,
        //   newType: type.value,
        //   languageCode: languageCode.value,
        //   countryCode: countryCode.value,
        // });
      }
    };
    const preOne = () => {
      if (key.value > 0) {
        key.value--;
      }
      if (key.value === 0) {
        isFirst.value = "#909399";
      } else {
        isFirst.value = "#409EFF";
      }
    };
    //定义一个计算属性
    const link = computed(() => {
      if (news.value !== null) {
        return news.value.link;
      }
      return null;
    });
    const clickCollect = () => {
      if (user !== null) {
        if (isCollected.value === 0) {
          const newId = null;
          if (news.value.userId) {
            newId == news.value.id;
          }
          store.dispatch("UserCollect/addUserCollect", {
            userId: JSON.parse(user).userId,
            newId: newId,
            title: news.value.title,
            link: news.value.link,
          });
        } else {
          store.dispatch("UserCollect/deleteUserCollect", {
            id: isCollected.value,
          });
        }
      } else {
        ElMessage({
          type: "warning",
          message: "请先登录",
        });
      }
    };
    const news = computed(() => {
      if (newsList.value.length !== 0) {
        if (key.value !== null) {
          return newsList.value[key.value];
        }
      }
      return null;
    });
    watch(
      () => [languageCode.value, countryCode.value],
      () => {}
    );
    watch(
      () => [newsList.value],
      ([newValue]) => {
        console.log(newValue.length);
      }
    );
    //请求是否收藏
    const isCollect = () => {
      if (news.value !== null) {
        if (user !== null) {
          store.dispatch("UserCollect/isCollect", {
            userId: JSON.parse(user).userId,
            link: news.value.link,
          });
        }
      }
    };
    watch(
      () => [news.value],
      ([newValue]) => {
        if (news.value !== null) {
          if (news.value.userId) {
            store.dispatch("Home/addLook", { newId: news.value.id });
          }
          if (user !== null) {
            isCollect();
          } else {
            isCollected.value = 0;
          }
        } else {
          isCollected.value = 0;
        }
        console.log(newValue);
      }
    );
    onMounted(() => {
      isCollect();
    });
    return { nextOne, preOne, link, clickCollect, isCollected, isFirst };
  },
};
</script>

<style lang="less">
.collected {
  color: red;
}
iframe {
  margin: top 5rem;
  width: 100%;
  height: calc(100vh - 40px);
  border: none;
}
</style>
