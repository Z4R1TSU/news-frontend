<template>
  <div class="container-fluid pb-3">
    <div
      class="row mb-2 bg-transparent-70"
      v-for="(item, key) in newList"
      :key="key"
    >
      <div class="col-12 col-lg-3 col-md-3 rounded-1 container mb-2">
        <img class="image" :src="item.imgUrl" />
      </div>
      <div class="col-12 col-lg-9 col-md-9 rounded-1">
        <div class="text-start item-text d-flex flex-column">
          <h5>
            {{ item.title }}
          </h5>
          <p class="text-secondary">{{ item.content }}</p>
          <p class="text-secondary mt-auto">
            <span class="me-5">{{ item.author }}</span>
            <span>{{ item.time }}</span>
          </p>
        </div>
      </div>
    </div>
    <div ref="loader" class="row mb-2" aria-hidden="true">
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
</template>

<script>
import { ref } from "vue";
export default {
  name: "homemainItem-Vue",
  components: {},

  setup() {
    const loader = ref(null);
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
    return {
      // newList,
      loader,
      newList,
    };
  },
};
</script>

<style>

</style>
