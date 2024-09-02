<template>
  <div
    class="sidebar d-none d-lg-block d-md-block mt-5 text-white"
    style="background: #152d60"
    :style="{ width: sidebarWidth + 'px' }"
  >
    <!-- <h4>Sidebar</h4> -->
    <ul class="nav flex-column justify-content-center">
      <li class="nav-item mb-2">
        <van-icon name="label-o" size="1.5rem" />
      </li>

      <li
        v-for="(item, key) in collectList"
        :key="key"
        @click="toNewsDetail(key)"
      >
        <p class="ellispsis-line" :style="{ width: sidebarWidth - 15 + 'px' }">
          {{ item.title
          }}<span class="text-secondary ms-2">{{ item.link }}</span>
        </p>
      </li>
    </ul>
    <div class="resizer" @mousedown="startResizing"></div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "leftmark-vue",
  components: {},
  setup() {
    const islogin = ref(false);
    const store = useStore();
    const router = useRouter();
    const collectList = computed(
      () => store.getters["UserCollect/collectList"]
    );
    const init = () => {
      const user = sessionStorage.getItem("user");
      console.log(user);
      if (user !== null) {
        islogin.value = true;
        store.dispatch("UserCollect/getUserCollectList", {
          page: 1,
          userId: JSON.parse(user).userId,
        });
      } else {
        islogin.value = false;
      }
    };
    const toNewsDetail = (key) => {
      store.commit("UserCollect/setKeyWord", null);
      if (collectList.value[key].newId) {
        store.dispatch("Home/addLook", { newId: collectList.value[key].newId });
      }
      router.push({ path: "/navframeMyCollect", query: { key: key } });
    };
    onMounted(() => {
      init();
    });
    return { collectList, islogin, toNewsDetail };
  },

  data() {
    return {
      sidebarWidth: 70,
      isResizing: false,
    };
  },
  methods: {
    startResizing() {
      this.isResizing = true;
      window.addEventListener("mousemove", this.resizeSidebar);
      window.addEventListener("mouseup", this.stopResizing);
    },
    resizeSidebar(event) {
      if (this.isResizing) {
        this.sidebarWidth = event.clientX;
      }
    },
    stopResizing() {
      this.isResizing = false;
      window.removeEventListener("mousemove", this.resizeSidebar);
      window.removeEventListener("mouseup", this.stopResizing);
    },
  },
};
</script>

<style>
.sidebar {
  height: 40vh; /* 使侧边栏占满整个视口高度 */
  position: fixed; /* 固定位置 */
  left: 0;
  z-index: 1030; /* 确保侧边栏在内容之上 */
  background-color: #f3f7fb;
}
.resizer {
  width: 5px;
  background-color: #ddd;
  cursor: col-resize;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
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
