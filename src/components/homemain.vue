<template>
  <div class="container-fluid pb-3">
    <div class="row">
      <div class="col-12 col-lg-3 border rounded-2 bg-transparent-50">
        <Left></Left>
        <br />
      </div>
      <div class="col-12 col-lg-9 border rounded-2 bg-transparent-50">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
//import Right from "./homemainRight.vue";
import Left from "./homemainLeft.vue";
export default {
  name: "homemain-Vue",
  components: {
   //Right,
    Left,
  },
  setup() {
    const tags = ref();
    const { t } = useI18n();
    const selectTag = (id) => {
      console.log(id);
    };

    const valuesArray = (obj) => {
      return Object.values(obj).map((value, index) => ({
        id: index,
        name: value,
      }));
    };
    const loadTags = () => {
      tags.value = t("type");
      console.log(tags.value);
    };

    onMounted(() => {
      loadTags();
    });
    return { tags, valuesArray, selectTag };
  },
};
</script>

<style lang="less">
.main {
  width: 80%;
}
.bg-transparent-60 {
  background-color: rgba(244, 194, 15, 0.956); /* 红色背景透明度为50% */
}
.type {
  overflow-y: auto; /* 启用滚动 */
  white-space: nowrap; /* 防止内容换行 */
}
.type .nav-item {
  display: inline-block; /* 将每个导航项设为内联块级元素 */
}

// .bg-transparent-50 {
//   background-color: rgba(73, 88, 148, 0.878); /* 红色背景透明度为50% */
// }
</style>
