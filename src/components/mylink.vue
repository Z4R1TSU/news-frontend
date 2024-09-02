<template>
  <div class="text-start p-4 shadow mb-2">
    <h2>我的发布</h2>
    <hr />
    <!-- 搜索框 -->
    <div class="row container justify-content-end mb-2">
      <input
        type="search"
        class="col-7 search my-auto"
        placeholder="搜索"
        v-model="keyWord"
        aria-label="Search"
        @keypress.enter="searchNews()"
      />
      <button class="col-2 col-lg-1 btn m-0 p-0" @click="searchNews()">
        <van-icon class="m-0 p-0" name="search" size="1.5rem" color="white" />
      </button>
      <button
        class="col-2 col-lg-1 btn text-white m-0 p-0"
        data-bs-toggle="offcanvas"
        href="#addNewsOffcanvas"
        role="button"
        aria-controls="addNewsOffcanvas"
      >
        <van-icon class="m-0 p-0" name="add-o" size="1.5rem" color="white" />
      </button>
    </div>
    <!-- 添加表单 -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="addNewsOffcanvas"
      aria-labelledby="addNewsOffcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="addNewsOffcanvasLabel">发布新闻</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <el-form :model="form" label-position="right" label-width="auto">
          <el-form-item label="国家" label-position="right">
            <el-select v-model="form.countryCode" placeholder="请选择国家">
              <el-option
                v-for="(item, key) in countryList"
                :key="key"
                :label="item.countryCode"
                :value="item.countryCode"
              >
                <span>
                  <img
                    :src="'/countryImg/' + item.img"
                    style="width: 25px; height: 20px; margin-right: 5px"
                  />
                  .{{ item.countryCode }}
                </span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语言" label-position="right">
            <el-select v-model="form.languageCode" placeholder="请选择语言">
              <el-option
                v-for="(item, key) in languageList"
                :key="key"
                :label="item.languageName"
                :value="item.languageCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="新闻分类" label-position="right">
            <el-select v-model="form.newType" placeholder="请选择新闻分类">
              <el-option
                v-for="(item, key) in newType"
                :key="key"
                :label="$t('NewType.' + item.name)"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片链接" label-position="right">
            <el-input v-model="form.imgUrl" autocomplete="off" />
          </el-form-item>
          <el-form-item label="标题" label-position="right">
            <el-input v-model="form.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="发布链接" label-position="right">
            <el-input v-model="form.link" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div class="text-center mt-3">
          <el-button
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            >取消</el-button
          >
          <el-button
            type="primary"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            @click="addNews()"
          >
            确认
          </el-button>
        </div>
      </div>
    </div>

    <!-- <el-dialog
      align-center
      v-model="dialogFormVisible"
      title="发布链接"
      width="59vh"
      center
      @close="cancel()"
    >
      <el-form :model="form" label-position="right" label-width="auto">
        <el-form-item label="国家" label-position="right">
          <el-select v-model="form.countryCode" placeholder="请选择国家">
            <el-option
              v-for="(item, key) in countryList"
              :key="key"
              :label="item.countryCode"
              :value="item.countryCode"
            >
              <span>
                <img
                  :src="'/countryImg/' + item.img"
                  style="width: 25px; height: 20px; margin-right: 5px"
                />
                .{{ item.countryCode }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语言" label-position="right">
          <el-select v-model="form.languageCode" placeholder="请选择语言">
            <el-option
              v-for="(item, key) in languageList"
              :key="key"
              :label="item.languageName"
              :value="item.languageCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新闻分类" label-position="right">
          <el-select v-model="form.newType" placeholder="请选择新闻分类">
            <el-option
              v-for="(item, key) in newType"
              :key="key"
              :label="$t('NewType.' + item.name)"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片链接" label-position="right">
          <el-input v-model="form.imgUrl" autocomplete="off" />
        </el-form-item>
        <el-form-item label="标题" label-position="right">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="发布链接" label-position="right">
          <el-input v-model="form.link" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel()">Cancel</el-button>
          <el-button type="primary" @click="addNews()"> Confirm </el-button>
        </div>
      </template>
    </el-dialog> -->
    <!-- 新闻列表 -->
    <div class="container-fluid mb-3 scroll-container bg-white text-black pt-2">
      <!-- 新闻信息 -->
      <!-- <div class="container-fluid pb-3"> -->
      <div
        class="row mb-1 bg-transparent-70"
        v-for="(item, key) in newsList"
        :key="key"
      >
        <div class="col-12 col-lg-3 col-md-3 rounded-1 container mb-2 mb-lg-0">
          <img class="image" :src="item.imgUrl" />
        </div>
        <div class="col-12 col-lg-9 col-md-9 rounded-1">
          <div class="text-start item-text d-flex flex-column">
            <a class="href" @click="toNewsDetail(key)"
              ><h5>
                {{ item.title }}
              </h5></a
            >
            <p class="text-secondary">{{ item.content }}</p>
            <p class="text-secondary mt-auto">
              <span>{{ formatTime(item) }}</span>
            </p>
          </div>
        </div>
        <div
          v-if="item.userId"
          class="col-12 row justify-content-end text-secondary"
        >
          <span class="col-3 col-lg-1 col-md-1"
            ><van-icon name="eye-o" /> {{ item.look }}</span
          >
          <span class="col-7 col-lg-9 col-md-9"
            ><van-icon name="star-o" class="me-1" />{{ item.collect }}</span
          >
          <span
            class="col-2 col-lg-2 col-md-2"
            @click="deleteNews(key, item.id)"
            ><van-icon name="delete-o"
          /></span>
        </div>
      </div>
      <!-- 加载中 -->
      <div v-if="isAll" class="text-center">已全部加载</div>
      <div v-if="!isAll" ref="loader" class="row mb-2">
        <div class="col-12 col-lg-3 col-md-3 rounded-1 container mb-2">
          <h1
            class="placeholder col-12 bg-secondary"
            style="width: 100%; height: 100%"
          ></h1>
        </div>
        <div class="col-12 col-lg-9 col-md-9 rounded-1">
          <div class="text-start item-text d-flex flex-column">
            <h3 class="card-title placeholder-glow">
              <span class="placeholder col-10"></span>
            </h3>
            <p class="placeholder-glow mt-2">
              <span class="placeholder bg-secondary col-8"></span>
            </p>
            <p class="placeholder-glow mt-auto">
              <span class="placeholder col-4 me-2 bg-secondary"></span>
              <span class="placeholder col-4 bg-secondary"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { countryList } from "@/data/countryList";
import { languageList } from "@/data/languageList";
import { newType } from "@/data/Type";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref, computed, onMounted, watch } from "vue";
export default {
  name: "myLink-Vue",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const dialogFormVisible = ref(false);
    const newsList = computed(() => store.getters["UserLink/newsList"]);
    const pages = computed(() => store.getters["UserLink/totalPages"]);
    const currentPage = computed(() => store.getters["UserLink/currentPage"]);
    const observer = ref(null);
    const loader = ref(null);
    const isAll = ref(false);
    const formLabelWidth = "100px";
    const keyWord = ref("");
    const isSearch = ref(false);
    const user = sessionStorage.getItem("user");
    const form = reactive({
      countryCode: "",
      languageCode: "",
      newType: "",
      imgUrl: "",
      title: "",
      link: "",
    });
    const clearForm = () => {
      form.countryCode = "";
      form.languageCode = "";
      form.newType = "";
      form.imgUrl = "";
      form.title = "";
      form.link = "";
    };

    const confirmIsNull = () => {
      return (
        form.countryCode !== "" &&
        form.languageCode !== "" &&
        form.newType !== "" &&
        form.title !== "" &&
        form.link !== ""
      );
    };
    const addNews = () => {
      if (confirmIsNull()) {
        if (user !== null) {
          store.dispatch("UserLink/addUserNew", {
            userId: JSON.parse(user).userId,
            title: form.title,
            link: form.link,
            languageCode: form.languageCode,
            countryCode: form.countryCode,
            typeName: form.newType,
            imgUrl: form.imgUrl,
          });
          ElMessage({
            type: "success",
            message: "添加成功",
          });
          cancel();
          setTimeout(() => {
            init();
          }, 500);
        }
      } else {
        ElMessage({
          type: "info",
          message: "除了图片链接，输入值不能为空",
        });
      }
    };
    const cancel = () => {
      // const offcanvas = new bootstrap.Offcanvas(
      //   document.getElementById("offcanvasExample")
      // );
      //offcanvas.hide();
      clearForm();
      dialogFormVisible.value = false;
    };
    const deleteNews = (key, id) => {
      ElMessageBox.confirm("是否删除", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          store.dispatch("UserLink/deleteUserNew", { id: id });
          // store.commit(
          //   "UserLink/setNewsListFirst",
          //   newsList.value.splice(key, 1)
          // );
          setTimeout(() => {
            init();
          }, 300);
          console.log(id);
        })
        .catch(() => {});
    };
    //跳转我的新闻详情页
    const toNewsDetail = (key) => {
      if (isSearch.value) {
        store.commit("UserLink/setKeyWord", keyWord.value);
      } else {
        store.commit("UserLink/setKeyWord", null);
      }
      if (newsList.value[key].userId) {
        store.dispatch("Home/addLook", { newId: newsList.value[key].id });
      }
      router.push({ path: "/navframeMylink", query: { key: key } });
    };
    //点击搜索
    const searchNews = () => {
      const user = sessionStorage.getItem("user");
      if (keyWord.value !== "") {
        if (user !== undefined) {
          store.dispatch("UserLink/selectUserNewsKeyWord", {
            page: 1,
            userId: JSON.parse(user).userId,
            keyWord: keyWord.value,
          });
          isSearch.value = true;
        }
      } else {
        if (user !== undefined) {
          store.dispatch("UserLink/getUserNews", {
            page: 1,
            userId: JSON.parse(user).userId,
          });
          isSearch.value = false;
        }
      }
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
    //监听底部
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
        const user = sessionStorage.getItem("user");
        if (isSearch.value) {
          if (keyWord.value !== "") {
            if (user !== null) {
              store.dispatch("UserLink/selectUserNewsKeyWord", {
                page: currentPage.value + 1,
                userId: JSON.parse(user).userId,
                keyWord: keyWord.value,
              });
            }
          }
        } else {
          if (user !== null) {
            store.dispatch("UserLink/getUserNews", {
              page: currentPage.value + 1,
              userId: JSON.parse(user).userId,
            });
          }
        }
      }
    };
    // const newsList = ref([
    //   {
    //     author: "",
    //     authorLink: "",
    //     collect: 0,
    //     content: "",
    //     id: 74,
    //     imgUrl:
    //       "https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0806%2Fae627636j00shsnxx01l3d004mo0334g.jpg&thumbnail=660x2147483647&quality=80&type=jpg",
    //     link: "https://www.163.com/dy/article/J8UBOT180529AQIE.html",
    //     look: 0,
    //     time: "2024-08-05T21:14:38.000+00:00",
    //     title: "亚历山大：加拿大队拥有很多人才 我们会为金牌付出一切",
    //     userId: 1,
    //   },
    // ]);
    const formatTime = (item) => {
      if (item !== null) {
        const timestamp = item.time;
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
        const day = String(date.getUTCDate()).padStart(2, "0");
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        const seconds = String(date.getUTCSeconds()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
      } else {
        return;
      }
    };
    //初始化
    const init = () => {
      const user = sessionStorage.getItem("user");
      if (user !== null) {
        store.dispatch("UserLink/getUserNews", {
          page: 1,
          userId: JSON.parse(user).userId,
        });
      }
    };
    onMounted(() => {
      init();
      createObserver();
    });
    return {
      formLabelWidth,
      countryList,
      languageList,
      newType,
      form,
      newsList,
      dialogFormVisible,
      formatTime,
      isAll,
      loader,
      keyWord,
      searchNews,
      deleteNews,
      cancel,
      addNews,
      toNewsDetail,
    };
  },
};
</script>

<style>
.scroll-container {
  overflow: auto;
  max-height: 100vh; /* For large screens, height should be 100vh */
  width: 100%; /* For small screens, width should be 100vw */
}
</style>
