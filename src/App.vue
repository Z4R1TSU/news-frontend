<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
export default {
  name: "App",
  components: {},
  setup() {
    const store = useStore();
    const isInteracting = ref(false);
    const startTime = ref(null);
    const elapsedTime = ref(0);
    let interactionTimeout = null;
    let timer = null;

    const handleUserInteraction = () => {
      if (!isInteracting.value) {
        isInteracting.value = true;
        startTimer();
      }

      // 重置计时器
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isInteracting.value = false;
        stopTimer();
      }, 3000);
    };

    const startTimer = () => {
      startTime.value = Date.now();
      timer = setInterval(() => {
        elapsedTime.value += 1; // 每分累加（这里假设是每分钟，但间隔设置是1分钟，可能不是预期行为）
      }, 60000); // 每分钟更新一次
    };

    const stopTimer = () => {
      clearInterval(timer);
      const timeSpent = (Date.now() - startTime.value) / 60000;
      elapsedTime.value += timeSpent;
      saveElapsedTime(timeSpent);
    };

    const saveElapsedTime = (time) => {
      console.log(`User interacted with the page for ${time} minutes.`);
      // 你可以将时间保存到 Vuex、localStorage 或发送到服务器
      //添加时间
      store.commit("UserAccount/addBrowsingTime", time);
    //  console.log(Math.floor(store.getters["UserAccount/browsingTime"]));
     // console.log(store.getters["UserAccount/browsingTime"]);
    };

    const setupInteractionListeners = () => {
      const interactionEvents = [
        "scroll",
        "click",
        "keydown",
        "mousemove",
        "touchstart",
      ];
      interactionEvents.forEach((event) => {
        window.addEventListener(event, handleUserInteraction);
      });
    };

    const removeInteractionListeners = () => {
      const interactionEvents = [
        "scroll",
        "click",
        "keydown",
        "mousemove",
        "touchstart",
      ];
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleUserInteraction);
      });
    };
    const handleBeforeUnload = () => {
      saveLookTime();
    };
    const saveLookTime = () => {
      const user = sessionStorage.getItem("user");
      if (user) {
        console.log(store.getters["UserAccount/browsingTime"]);
        store.dispatch("UserAccount/saveLookTime", {
          userId: JSON.parse(user).userId,
          lookTime: Math.floor(store.getters["UserAccount/browsingTime"]),
        });
      }
    };
    onMounted(() => {
      const user = sessionStorage.getItem("user");
      if (user !== null) {
        setTimeout(() => {
          store.dispatch("UserAccount/getUserActive", {
            userId: JSON.parse(user).userId,
          });
        }, 400);
        setupInteractionListeners();
      }
      //页面关闭或重新时
      window.addEventListener("beforeunload", handleBeforeUnload);
    });

    onBeforeUnmount(() => {
      saveLookTime();
      removeInteractionListeners();
      stopTimer();
      //保存浏览时长到数据库
    });

    // 如果需要响应式地观察某些数据变化，可以使用watchEffect等

    return {};
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //color: #fcb540;
  // color: black;
  //background-color: rgb(214, 188, 235);
  /* margin-top: 60px; */
}
</style>
