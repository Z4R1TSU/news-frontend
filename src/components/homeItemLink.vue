<template>
  <div class="container">
    <div class="list d-flex flex-wrap align-items-center justify-content-start">
      <div
        class="col-3 col-sm-4 col-md-3 col-lg-1 card-item"
        v-for="(item, key) in itemlinkList"
        :key="key"
      >
        <a :href="item.href" class="nav-link">
          <img class="img-thumbnail" :src="item.imgUrl" />
          <div calss="item-name">
            <span>{{ item.name }}</span>
          </div>
        </a>
      </div>
      <div class="col-3 col-sm-4 col-md-3 col-lg-1 card-item m-auto">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">更多&raquo;</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "home2-Vue",
  components: {},
  methods: {},
  setup() {
    const itemlinkList = ref([
      {
        id: "123",
        imgUrl: "../assets/images/baidu.webp",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
      {
        id: "123",
        imgUrl:
          "https://img1.baidu.com/it/u=3435994917,1627222156&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto?sec=1721494800&t=daedb75f77574b2fb40b4de1385d5000",
        name: "百度",
        href: "https://www.baidu.com/",
      },
    ]);
    // scrollTabs(direction) {
    //   const tabsWrapper = this.$refs.tabsWrapper; //父容器
    //   const tabs = this.$refs.tabs; //子容器
    //   const tabWidth = tabs.children[0].offsetWidth; //获取子容器的宽度
    //   const visibleTabsCount = Math.floor(tabsWrapper.clientWidth / tabWidth); //父容器宽度/子容器宽度，一行能放几个
    //   const maxIndex = this.tabs.length - visibleTabsCount;
    //   //计算标签的总数与可见标签数量的差值。maxIndex 表示可以滚动的最大索引值，以确保不会滑动超出最后一个标签。

    //   this.currentIndex = Math.max(
    //     0,
    //     Math.min(maxIndex, this.currentIndex + direction)
    //   );
    //   //direction 是滚动的方向，正数表示向右滚动，负数表示向左滚动。
    //   //使用 Math.min(maxIndex, this.currentIndex + direction) 计算新的索引，确保新的索引不会超过最大索引。
    //   //使用 Math.max(0, ...) 确保新的索引不小于 0（即不会向左滑动超过第一个标签）。

    //   const offset = -this.currentIndex * tabWidth;
    //   //计算滑动的偏移量，以便将 tabs 容器滑动到正确的位置。
    //   //使用负值，因为 translateX 需要负偏移量来向左滑动。
    //   tabs.style.transform = `translateX(${offset}px)`;
    // },
    return { itemlinkList };
  },
};
</script>

<style lang="less">
.itemlinkList {
  box-shadow: 0 0 10px 10px rgba(213, 213, 213, 0.075);
  border-radius: 5px;
}
.card-item {
  .item-image {
    max-width: 100%; /* 或者其他你需要的宽度 */
    height: auto;
    &:hover {
      box-shadow: 0 0 10px 10px rgba(98, 98, 98, 0.075);
    }
    .img {
      border-radius: 5px;
    }
  }
}
.bg-transparent-80 {
  background-color: rgba(141, 39, 11, 0.936); /* 红色背景透明度为50% */
}
</style>
