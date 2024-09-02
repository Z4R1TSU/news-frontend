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
            <a class="page-link"><van-icon name="arrow" :color="isLast" /></a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import Nav from "@/components/navTopComponent.vue";
import Leftmark from "@/components/leftmark.vue";
import { ElMessage } from "element-plus";
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "navFrame-vue",
  components: {
    Nav,
    Leftmark,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const isFirst = ref("#409EFF");
    const isLast = ref("#409EFF");
    const isCollected = computed(() => store.getters["UserCollect/isCollect"]);
    const key = ref(route.query.key);
    const newsList = computed(() => store.getters["UserCollect/collectList"]);
    const pages = computed(() => store.getters["UserCollect/totalPages"]);
    const currentPage = computed(
      () => store.getters["UserCollect/currentPage"]
    );
    const keyWord = computed(() => store.getters["UserCollect/keyWord"]);
    const user = sessionStorage.getItem("user");
    const nextOne = () => {
      if (key.value < newsList.value.length - 1) {
        key.value++;
      } else {
        if (currentPage.value >= pages.value) {
          isLast.value = "#909399";
        } else {
          if (user !== null) {
            if (keyWord.value !== null) {
              store.dispatch("UserCollect/selectUserNewsKeyWord", {
                page: currentPage.value + 1,
                userId: JSON.parse(user).userId,
                keyWord: keyWord.value,
              });
            }
          } else {
            store.dispatch("UserCollect/selectUserCollectList", {
              page: currentPage.value + 1,
              userId: JSON.parse(user).userId,
            });
          }
        }
      }
    };
    const preOne = () => {
      if (key.value >= 0) {
        key.value--;
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
          type: "info",
          message: "请登录！",
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
      () => [newsList.value],
      ([newValue]) => {
        console.log(newValue.length);
      }
    );
    watch(
      () => [key.value],
      ([newValue]) => {
        if (newValue === 0) {
          isFirst.value = "#909399";
        } else {
          isFirst.value = "#409EFF";
        }
        if (newValue < newsList.value.length) {
          isLast.value = "#409EFF";
        }
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
          if (news.value.newId) {
            store.dispatch("Home/addLook", { newId: news.value.newId });
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
    return {
      nextOne,
      preOne,
      link,
      clickCollect,
      isCollected,
      isFirst,
      isLast,
    };
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
