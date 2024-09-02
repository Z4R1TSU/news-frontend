<template>
  <div class="text-start p-4 shadow mb-2">
    <h2>我的收藏</h2>
    <hr />
    <!-- 搜索栏 -->
    <div class="container-fluid row justify-content-center mb-2">
      <input
        type="search"
        class="col-9 col-lg-6 search search-sm search-md my-auto"
        placeholder="搜索"
        v-model="keyWord"
        aria-label="Search"
        @keypress.enter="searchCollect()"
      />
      <button class="col-2 col-lg-1 btn" type="button" @click="searchCollect()">
        <van-icon name="search" size="1.5rem" color="white" />
      </button>
    </div>
    <div class="container mb-3 scroll-container pt-2">
      <div
        class="row justify-content-center"
        v-for="(item, key) in collectList"
        :key="key"
      >
        <div class="col-12 ellispsis-line" @click="toNewsDetail(key)">
          <span>{{ item.title }}</span>
          <span>{{ item.link }}</span>
        </div>
      </div>
      <div v-if="isAll" class="text-center">已全部加载</div>
      <div v-if="!isAll" ref="loader" class="row mb-2">
        <div class="col-12 rounded-1">
          <div class="text-start item-text d-flex flex-column">
            <p class="placeholder-glow mt-auto">
              <span class="placeholder col-11 bg-secondary"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
export default {
  name: "myCollect-Vue",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const collectList = computed(
      () => store.getters["UserCollect/collectList"]
    );
    const pages = computed(() => store.getters["UserCollect/totalPages"]);
    const currentPage = computed(
      () => store.getters["UserCollect/currentPage"]
    );
    const keyWord = ref("");
    const isSearch = ref(false);
    const user = sessionStorage.getItem("user");
    const observer = ref(null);
    const loader = ref(null);
    const isAll = ref(false);

    const createObserver = () => {
      const options = {
        root: null, // 使用视口作为容器
        rootMargin: "0px",
        threshold: 0.6, // 当加载组件 100% 进入视口时触发回调
      };
      observer.value = new IntersectionObserver(handleIntersect, options);
      observer.value.observe(loader.value);
    };
    //事件处理
    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        //加载数据
        if (isSearch.value) {
          if (keyWord.value !== "") {
            if (user !== null) {
              store.dispatch("UserCollect/selectUserCollectList", {
                page: currentPage.value + 1,
                userId: JSON.parse(user).userId,
                keyWord: keyWord.value,
              });
            }
          }
        } else {
          if (user !== null) {
            store.dispatch("UserCollect/getUserCollectList", {
              page: currentPage.value + 1,
              userId: JSON.parse(user).userId,
            });
          }
        }
      }
    };
    const searchCollect = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (keyWord.value !== "" && keyWord.value !== null) {
        if (user !== null) {
          store.dispatch("UserCollect/selectUserCollectList", {
            page: 1,
            userId: user.userId,
            keyWord: keyWord.value,
          });
          isSearch.value = true;
        }
      } else {
        if (user !== null) {
          store.dispatch("UserCollect/getUserCollectList", {
            page: 1,
            userId: user.userId,
          });
          isSearch.value = false;
        }
      }
    };
    const toNewsDetail = (key) => {
      if (isSearch.value) {
        store.commit("UserCollect/setKeyWord", keyWord.value);
      } else {
        store.commit("UserCollect/setKeyWord", null);
      }
      if (collectList.value[key].newId) {
        store.dispatch("Home/addLook", { newId: collectList.value[key].newId });
      }
      router.push({ path: "/navframeMyCollect", query: { key: key } });
    };
    watch(
      () => [currentPage.value],
      () => {
        if (currentPage.value >= pages.value) {
          isAll.value = true;
        } else {
          isAll.value = false;
        }
      }
    );
    // const newsList = ref([
    //   {
    //     title: "今天天气很好",
    //     link: "hi开个会哇UI而热热仍然然然然然然然然然然研发大厦hyuhsdjhf",
    //   },
    //   {
    //     title: "今天天气很好",
    //     link: "hi开个会哇UI而热热仍然然",
    //   },
    //   {
    //     title: "今天天气很好",
    //     link: "hi开个会哇UI而热热仍然然然然然然然然然然研发大厦",
    //   },
    // ]);
    const init = () => {
      const user = sessionStorage.getItem("user");
      console.log(user);
      if (user !== null) {
        store.dispatch("UserCollect/getUserCollectList", {
          page: 1,
          userId: JSON.parse(user).userId,
        });
      } else {
        router.push({ path: "/home1" });
      }
    };
    onMounted(() => {
      init();
      createObserver();
    });

    return { toNewsDetail, collectList, loader, isAll, searchCollect, keyWord };
  },
};
</script>

<style>
.scroll-container {
  overflow: auto;
  max-height: 100vh; /* For large screens, height should be 100vh */
  width: 100%; /* For small screens, width should be 100vw */
}
.ellispsis-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border: 1px solid #ccc; */
  font-size: 1rem;
  margin: 2px;
}
</style>
