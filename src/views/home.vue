<template>
  <div class="container-lg">
    <!-- 左侧固定导航栏 -->
    <!-- <div
      class="sidebar d-none d-lg-block d-md-block mt-5 text-white"
      style="background: #152d60"
    >
      <ul class="nav flex-column justify-content-center">
        <li class="nav-item mb-2">
          <van-icon name="label-o" size="1.5rem" />
        </li>
        <li class="nav-item mb-2">
          <van-icon name="add-o" size="1rem" />
        </li>
      </ul>
    </div> -->
    <Leftmark></Leftmark>
    <header class="py-3 mb-1 border-bottom">
      <div class="container d-flex flex-wrap justify-content-center">
        <form class="col-12 mb-0 d-flex" style="height: 2.5rem">
          <div class="dropdown me-2 text-white">
            <button
              class="btn btn-sm dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="selectedImg"
                alt="Selected Image"
                class="search-img dropdown-img"
              />
              <!-- {{ selectedText || "引擎" }} -->
            </button>
            <ul
              class="dropdown-menu dropdown-menu-scroll"
              aria-labelledby="dropdownMenuButton"
            >
              <li
                v-for="option in SearchWebsitesList"
                :key="option.id"
                @click="selectSearch(option)"
                class="dropdown-item"
              >
                <img
                  :src="option.imgUrl"
                  alt="image"
                  class="dropdown-img tu-img"
                />
                {{ option.name }}
              </li>
            </ul>
          </div>
          <input
            type="search"
            class="search search-sm me-2 my-auto"
            placeholder="搜索"
            v-model="searchQuery"
            aria-label="Search"
            @keypress.enter="handleSearch()"
          />
          <button class="btn" type="button" @click="handleSearch()">
            <van-icon name="search" size="1.5rem" />
          </button>
        </form>
      </div>
    </header>
    <Link></Link>
    <HomeMain></HomeMain>
  </div>
</template>

<script>
import Link from "@/components/homeItemLink2.vue";
import HomeMain from "@/components/homemain.vue";
import Leftmark from "@/components/leftmark.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "home-vue",
  components: {
    Link,
    HomeMain,
    Leftmark,
  },
  setup() {
    const store = useStore();
    const defaultSelect = ref("/img/search.png"); //默认搜索图片
    const selectedImg = ref();
    const value = ref();
    const searchQuery = ref(""); //搜索框的输入值
    const selectedSearch = ref(null); //已选择搜索引擎
    const SearchWebsitesList = computed(
      () => store.getters["SearchWebsites/searchWebsitesList"]
    );
    //国家
    const countryCode = computed(() => store.getters["Home/country"]);

    //选择引擎
    const selectSearch = (option) => {
      //判断是否为空
      if (option == null) {
        selectedImg.value = defaultSelect.value;
        return;
      }
      selectedSearch.value = option;
      if (option.imgUrl == null) {
        selectedImg.value = defaultSelect.value; //默认图片
      } else {
        selectedImg.value = option.imgUrl;
      }
      let rgb;
      if (option.topicColor) {
        rgb = hexToRgb(option.topicColor);
      } else {
        rgb = hexToRgb("#007bff");
      }
      //主题颜色
      // const rgb = hexToRgb("#495057");
      //css变量修改搜索框颜色
      document.documentElement.style.setProperty("--focus-color-rgb", rgb);
    };
    //将十六进制颜色转成rgb格式
    const hexToRgb = (hex) => {
      // 将十六进制颜色转换为 RGB
      let r = 0,
        g = 0,
        b = 0;
      // 3 位颜色值
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      }
      // 6 位颜色值
      else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
      }
      return `${r},${g},${b}`;
    };
    //点击搜索时
    const handleSearch = () => {
      console.log(searchQuery.value);
      const href = selectedSearch.value.searchLink + searchQuery.value;
      //const href = "https://www.baidu.com/s?wd=" + searchQuery.value;
      window.open(href, "_blank");
    };
    const sendGetSearchWebsites = () => {
      const cCode = countryCode.value;
      console.log(cCode);
      store.dispatch("SearchWebsites/getSearchWebsitesByC", {
        countryCode: cCode,
      });
    };
    watch(
      () => [countryCode.value],
      () => {
        sendGetSearchWebsites();
      }
    );
    watch(SearchWebsitesList, (newValue) => {
      if (newValue.length !== 0) {
        selectSearch(newValue[0]);
      } else {
        selectSearch(null);
      }
    });
    onMounted(() => {
      sendGetSearchWebsites();
    });
    return {
      selectedSearch,
      selectedImg,
      searchQuery,
      value,
      SearchWebsitesList,
      selectSearch,
      handleSearch,
      defaultSelect,
    };
  },
};
</script>

<style lang="less">
:root {
  --focus-color: #007bff; /* 默认聚焦颜色 */
  --focus-color-rgb: 0, 123, 255; /* 默认聚焦颜色的 RGB 值 */
}
.search-img {
  width: 3rem;
  height: 2rem;
}
/* 自定义搜索框聚焦样式 */
.search {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.search:focus {
  color: #495057;
  background-color: #fff;
  /* border-color: #007bff; */
  outline: 0;
  /* box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25); */
  box-shadow: 0 0 0 0.2rem rgba(var(--focus-color-rgb), 0.25);
}
</style>
