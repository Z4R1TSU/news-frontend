<template>
  <div>
    <!-- 新闻信息分类 -->
    <nav class="navbar navbar-expand-lg">
      <router-link class="navbar m-3 myTag"   to="/home2">转载空间</router-link>
      <button
        class="navbar-toggler ms-auto text-black"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar nav nav-tabs justify-content-start">
          <li class="nav-item">
            <a
              class="myTag"
              :class="{ active: selectedType === 'recommended' }"
              @click="selectType('recommended')"
            >
              {{ $t("NewType.recommended") }}
            </a>
          </li>
          <li class="nav-item" v-for="(item, key) in newTypes" :key="key">
            <a
              class="myTag"
              :class="{ active: selectedType === item.name }"
              @click="selectType(item.name)"
            >
              {{ $t("NewType." + item.name) }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- 新闻信息列表 -->
    <div class="container-fluid mb-3 scroll-container">
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
              <a class="href" :href="item.authorLink"
                ><span>{{ item.author }}</span></a
              >
              <span v-if="item.author" class="me-2"></span>
              <span>{{ formatTime(item) }}</span>
            </p>
          </div>
        </div>
        <div
          v-if="item.userId"
          class="row justify-content-start text-secondary"
        >
          <span class="col-3 col-lg-1"
            ><van-icon name="eye-o" /> {{ item.look }}</span
          ><span class="col-3 col-lg-1"
            ><van-icon name="star-o" class="me-1" />{{ item.collect }}</span
          >
        </div>
      </div>
      <!-- 加载中 -->
      <div v-if="true" ref="loader" class="row mb-2">
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
import { newType } from "@/data/Type";
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "homemainTag-Vue",
  components: {},
  setup() {
    const newTypes = newType;
    const router = useRouter();
    const store = useStore();
    const selectedType = ref("recommended");
    //const isReSelectType = ref(false);
    const observer = ref(null);
    const loader = ref(null);
    const countryCode = computed(() => store.getters["Home/country"]);
    const languageCode = computed(() => store.getters["Home/language"]);
    const newsList = computed(() => store.getters["Home/newsList"]);

    const newList = ref([
      {
        id: "123",
        imgUrl:
          "https://img0.baidu.com/it/u=1388364636,3796712962&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=60d8bbe2dddbe18e4bbd93fb2006a1aa",
        title: "散热风扇是如何制造的？工厂实拍制造全过程，这家工厂太专业了",
        content:
          "航空公司、医院、零售商以及其他各类企业纷纷停摆。航班取消、医院系统瘫痪、银行客户无法交易...而这一切都只是因为——微软宕机了。",
        articleHref: "https://www.baidu.com/",
        author: "作者名",
        authorHref: "https://www.baidu.com/",
        time: "时间",
      },
      {
        id: "123",
        imgUrl:
          "https://img0.baidu.com/it/u=3422287847,344441285&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=e263072202803c20452f36c462e2f5f6",
        title: "散热风扇是如何制造的？工厂实拍制造全过程，这家工厂太专业了",
        content:
          "航空公司、医院、零售商以及其他各类企业纷纷停摆。航班取消、医院系统瘫痪、银行客户无法交易...而这一切都只是因为——微软宕机了。",
        articleHref: "https://www.baidu.com/",
        author: "作者名",
        authorHref: "https://www.baidu.com/",
        time: "时间",
      },
      {
        id: "123",
        imgUrl:
          "https://img0.baidu.com/it/u=3422287847,344441285&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=e263072202803c20452f36c462e2f5f6",
        title: "散热风扇是如何制造的？工厂实拍制造全过程，这家工厂太专业了",
        content:
          "航空公司、医院、零售商以及其他各类企业纷纷停摆。航班取消、医院系统瘫痪、银行客户无法交易...而这一切都只是因为——微软宕机了。",
        articleHref: "https://www.baidu.com/",
        author: "作者名",
        authorHref: "https://www.baidu.com/",
        time: "时间",
      },
      {
        id: "123",
        imgUrl:
          "https://img0.baidu.com/it/u=3422287847,344441285&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=e263072202803c20452f36c462e2f5f6",
        title: "散热风扇是如何制造的？工厂实拍制造全过程，这家工厂太专业了",
        content:
          "航空公司、医院、零售商以及其他各类企业纷纷停摆。航班取消、医院系统瘫痪、银行客户无法交易...而这一切都只是因为——微软宕机了。",
        articleHref: "https://www.baidu.com/",
        author: "作者名",
        authorHref: "https://www.baidu.com/",
        time: "时间",
      },
      {
        id: "123",
        imgUrl:
          "https://img0.baidu.com/it/u=3422287847,344441285&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=e263072202803c20452f36c462e2f5f6",
        title: "散热风扇是如何制造的？工厂实拍制造全过程，这家工厂太专业了",
        content:
          "航空公司、医院、零售商以及其他各类企业纷纷停摆。航班取消、医院系统瘫痪、银行客户无法交易...而这一切都只是因为——微软宕机了。",
        articleHref: "https://www.baidu.com/",
        author: "作者名",
        authorHref: "https://www.baidu.com/",
        time: "时间",
      },
    ]);
    //选择新闻类型
    const selectType = (value) => {
      selectedType.value = value;
    };
    //后端请求
    const sendGetNewsList = (page, type) => {
      const cCode = countryCode.value;
      const lCode = languageCode.value;
      if (type == "recommended") {
        const user = sessionStorage.getItem("user");
        console.log(user);
        if (user) {
          store.dispatch("Home/getNewsByUserNewType", {
            page,
            userId: JSON.parse(user).userId,
            languageCode: lCode,
            countryCode: cCode,
          });
        } else {
          store.dispatch("Home/getNewsbyTLC", {
            page,
            newType: null,
            languageCode: lCode,
            countryCode: cCode,
          });
        }
      } else {
        store.dispatch("Home/getNewsbyTLC", {
          page,
          newType: type,
          languageCode: lCode,
          countryCode: cCode,
        });
      }
    };
    const createObserver = () => {
      const options = {
        root: null, // 使用视口作为容器
        rootMargin: "0px",
        threshold: 0.6, // 当加载组件 100% 进入视口时触发回调
      };
      observer.value = new IntersectionObserver(handleIntersect, options);
      observer.value.observe(loader.value);
    };
    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        //加载数据
        sendGetNewsList(0, selectedType.value);
      }
    };
    //规范化时间
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
    //跳转新闻页
    const toNewsDetail = (key) => {
      if (newsList.value[key].userId) {
        store.dispatch("Home/addLook", { newId: newsList.value[key].id });
      }
      store.commit("Home/setType", selectedType.value);
      router.push({ path: "/navFrame", query: { key: key } });
    };

    watch(
      () => [languageCode.value, countryCode.value, selectedType.value],
      () => {
        sendGetNewsList(1, selectedType.value);
      }
    );
    onMounted(() => {
      createObserver();
    });
    return {
      newList,
      newsList,
      selectedType,
      newTypes,
      selectType,
      formatTime,
      toNewsDetail,
      loader,
    };
  },
};
</script>

<style lang="less">
.image {
  width: 100%;
  max-height: 180px;
}
.item-text {
  height: 100%;
}
.myTag {
  display: block;
  padding: 0.5rem 0.7rem;
  color: #646567; /* Default primary color */
  text-decoration: none;
  //transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}
.href:hover,
.href:focus {
  color: rgb(18, 18, 134);
  text-decoration: underline;
}
.href {
  color: black;
  outline: none;
  text-decoration: none;
}

.myTag:hover,
.myTag:focus {
  color: rgb(63, 10, 98); /* Darker shade on hover/focus */
}
.myTag:active {
  color: black;
}
.active {
  color: rgb(1, 0, 6);
}
.scroll-container {
  overflow: auto;
  max-height: 100vh; /* For large screens, height should be 100vh */
  width: 100%; /* For small screens, width should be 100vw */
}
</style>
