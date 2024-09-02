<template>
  <div class="text-start p-4 shadow mb-2 bg-transparent-51">
    <h2>我的新闻分类</h2>
    <hr />
    <div class="row justify-content-center">
      <el-select-v2
        class="col-10"
        v-model="value"
        filterable
        :options="options"
        placeholder="Please select"
        style="width: 20rem; vertical-align: middle"
        multiple
        @change="selectChange"
      />
      <button
        class="col-1 btn mt-3 mt-lg-0 mt-md-0"
        type="button"
        style="width: 3rem"
        @click="save()"
      >
        <van-icon name="success" size="1.5rem" color="white" />
      </button>
      <button
        class="col-1 btn mt-3 mt-lg-0 mt-md-0"
        type="button"
        style="width: 3rem"
        @click="close()"
      >
        <van-icon name="cross" size="1.5rem" color="white" />
      </button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { newType } from "@/data/Type";
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//import { useRouter } from "vue-router";
export default {
  name: "myhistoryCord-Vue",
  components: {},
  setup() {
    const { t } = useI18n();
    //    const router = useRouter();
    const router = useRouter();
    const store = useStore();
    const newTypes = newType;
    const myNewType = computed(() => store.getters["UserNewType/newTypeList"]);
    // const myNewType = ref(["Video", "Sports"]);
    const value = ref();
    const selectChange = () => {
      console.log(value.value);
    };
    const save = () => {
      const user = sessionStorage.getItem("user");
      if (user !== undefined) {
        store.dispatch("UserNewType/addUserNewType", {
          userId: JSON.parse(user).userId,
          newTypes: value.value,
        });
        ElMessage({
          type: "success",
          message: "添加成功",
        });
      }
    };
    const close = () => {
      value.value = myNewType.value;
    };
    const languageCode = computed(() => store.getters["Home/language"]);
    watch(
      () => [languageCode.value],
      () => {
        options.value = Array.from({ length: newTypes.length }).map(
          (_, idx) => ({
            value: `${newTypes[idx].name}`,
            label: t("NewType." + newTypes[idx].name),
          })
        );
      }
    );
    const options = ref(
      Array.from({ length: newTypes.length }).map((_, idx) => ({
        value: `${newTypes[idx].name}`,
        label: t("NewType." + newTypes[idx].name),
      }))
    );
    const init = () => {
      const user = sessionStorage.getItem("user");
      if (user !== undefined && user !== null) {
        store.dispatch("UserNewType/getUserNewType", {
          userId: JSON.parse(user).userId,
        });
      } else {
        router.push({ path: "/home1" });
      }
      setTimeout(() => {
        value.value = myNewType.value;
      }, 500);
    };
    onMounted(() => {
      init();
    });
    return {
      value,
      newTypes,
      options,
      selectChange,
      close,
      save,
    };
  },
};
</script>

<style></style>
