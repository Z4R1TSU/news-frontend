<template>
  <div>
    <!-- 网站导航类型 -->
    <div class="tabs-container d-flex align-items-center mt-3">
      <button class="arrow-button btn btn-sm" @click="scrollTabs(-1)">
        <van-icon name="arrow-left" />
      </button>
      <div class="tabs-wrapper flex-grow-1 overflow-hidden" ref="tabsWrapper">
        <div class="tabs d-flex" ref="tabs">
          <div
            class="tab p-2"
            v-for="(item, key) in websitesTypes"
            :key="key"
            :class="{ 'active-tab': selectedType === item.name }"
            @click="selectType(item.name)"
          >
            {{ $t("WebsitesType." + item.name) }}
          </div>
        </div>
      </div>
      <button class="arrow-button btn btn-sm" @click="scrollTabs(1)">
        <van-icon name="arrow" />
      </button>
    </div>
    <hr />
    <!-- 网站链接 -->
    <div class="container">
      <div
        class="d-flex website my-lg-4 mt-md-1 mt-sm-1"
        v-for="(item, key) in websList"
        :key="key"
      >
        <a class="link" :href="item.link">{{ item.link }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { websitesType } from "@/data/Type";
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "tabComponent-Vue",
  components: {},
  // props: {
  //   tabs: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  setup() {
    const store = useStore();
    const selectedType = ref(null);
    const websList = computed(() => store.getters["Websites/websitesList"]);
    const countryCode = computed(() => store.getters["Home/country"]);
    const websitesTypes = websitesType;
    const webList = ref([
      { link: "https://www.baidu.com" },
      { link: "https://www.baidu.com" },
      { link: "https://www.baidu.com" },
      { link: "https://www.baidu.com" },
      { link: "https://www.baidu.com" },
      { link: "https://www.baidu.com" },
      { link: "https://www.baidu.com" },
      { link: "https://www.baidu.com1231431243091834918290" },
      { link: "https://www.baidu.com" },
      { link: "https://www.baidu.com1231431243091834918290" },
    ]);
    const selectType = (value) => {
      selectedType.value = value;
      const cCode = countryCode.value;
      store.dispatch("Websites/getWebsitesByTC", {
        websiteType: value,
        countryCode: cCode,
      });
    };

    watch(
      () => [countryCode.value],
      () => {
        selectType(selectType.value);
      }
    );
    onMounted(() => {});
    return { selectedType, websitesTypes, websList, webList, selectType };
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    truncate(value, length = 20) {
      if (!value) return "";
      value = value.replace(/https:\/\/+/, "");
      // console.log(value);
      return value.length > length ? value.slice(0, length) + "..." : value;
    },
    scrollTabs(direction) {
      const tabsWrapper = this.$refs.tabsWrapper; //父容器
      const tabs = this.$refs.tabs; //子容器
      const tabWidth = tabs.children[0].offsetWidth; //子容器的宽度
      const visibleTabsCount = Math.floor(tabsWrapper.clientWidth / tabWidth); //父容器宽度/子容器宽度，一行能放几个
      const maxIndex = Math.floor(tabs.children.length / visibleTabsCount) - 1;
      this.currentIndex = Math.max(
        0,
        Math.min(maxIndex, this.currentIndex + direction)
      );
      const offset = -this.currentIndex * visibleTabsCount * tabWidth;
      tabs.style.transform = `translateX(${offset}px)`;
    },
  },
};
</script>

<style scoped>
.tabs-container {
  width: 100%;
  display: flex;
  align-items: center;
}
/* .arrow-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
} */
.website {
  text-align: left;
}
.tabs-wrapper {
  overflow: hidden;
  white-space: nowrap;
}
.active-tab {
  color: rgb(36, 0, 134);
}
.link {
  color: black;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.link:hover,
.link:focus {
  color: rgb(22, 20, 142);
  text-decoration: underline;
}
.tabs {
  display: flex;
  transition: transform 0.3s ease;
}

.tab {
  flex: 0 0 auto;
  /* background: #ddd; */
  padding: 0 0.1rem;
  border-radius: 0.1rem;
}
</style>
