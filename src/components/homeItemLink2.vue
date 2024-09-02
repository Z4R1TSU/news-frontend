<template>
  <nav class="container-fluid navbar mb-2">
    <div class="container rounded-3 bg-transparent-50 border">
      <ul class="horizontal-scroll container justify-content-center my-2">
        <!-- 添加多个导航项以演示水平滚动 -->
        <li class="nav-item me-3" v-for="(item, key) in topWebsList" :key="key">
          <a :href="item.link" class="nav-link">
            <img class="item-img" :src="item.imgUrl" />
            <!-- <div calss="item-name" style="font-size: 0.8rem">
              <span>{{ item.name }}</span>
            </div> -->
          </a>
        </li>
        <!-- <li class="nav-item me-3">
          <a class="nav-link">
            <van-icon name="add-o" size="1rem" />
          </a>
        </li> -->
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "home2-Vue",
  components: {},
  methods: {},
  setup() {
    const store = useStore();
    const topWebsList = computed(
      () => store.getters["TopWebsites/topWebsitesList"]
    );
    const countryCode = computed(() => store.getters["Home/country"]);
    const itemlinkList = ref([
      {
        id: "123",
        img: "https://img2.baidu.com/it/u=3335976388,3387344120&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=0a94f55197fa64c230a3275924c04305",
        name: "百度",
        link: "https://x.com/Beverlyrsri/status/1806580622011342961?s=19",
      },
      {
        id: "123",
        img: "https://img2.baidu.com/it/u=3335976388,3387344120&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=0a94f55197fa64c230a3275924c04305",
        name: "百度",
        link: "https://www.baidu.com/",
      },
      {
        id: "123",
        img: "https://img2.baidu.com/it/u=3335976388,3387344120&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=0a94f55197fa64c230a3275924c04305",
        name: "百度",
        link: "https://www.baidu.com/",
      },
      {
        id: "123",
        img: "https://img2.baidu.com/it/u=3335976388,3387344120&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=0a94f55197fa64c230a3275924c04305",
        name: "百度",
        link: "https://www.baidu.com/",
      },
      {
        id: "123",
        img: "https://img2.baidu.com/it/u=3335976388,3387344120&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=0a94f55197fa64c230a3275924c04305",
        name: "百度",
        link: "https://www.baidu.com/",
      },
      {
        id: "123",
        img: "https://img2.baidu.com/it/u=3335976388,3387344120&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=0a94f55197fa64c230a3275924c04305",
        name: "百度",
        link: "https://www.baidu.com/",
      },
      {
        id: "123",
        img: "https://img2.baidu.com/it/u=3335976388,3387344120&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1721754000&t=0a94f55197fa64c230a3275924c04305",
        name: "百度",
        link: "https://www.baidu.com/",
      },
    ]);
    const sendGetTopWebsites = () => {
      const cCode = countryCode.value;
      store.dispatch("TopWebsites/getLastWebsitesByC", {
        websiteType: null,
        countryCode: cCode,
      });
    };
    watch(
      () => [countryCode.value],
      () => {
        sendGetTopWebsites();
      }
    );
    onMounted(() => {
      sendGetTopWebsites();
    });
    return { itemlinkList, topWebsList };
  },
};
</script>

<style lang="less">
.item-img {
  width: 3rem;
  height: 3rem;
}
.horizontal-scroll {
  overflow-y: auto; /* 启用滚动 */
  white-space: nowrap; /* 防止内容换行 */
}
.horizontal-scroll .nav-item {
  display: inline-block; /* 将每个导航项设为内联块级元素 */
}
.bg-transparent-80 {
  background-color: rgb(231, 217, 156); /* 红色背景透明度为50% */
}
</style>
