<template>
  <div class="text-start p-4 shadow mb-2">
    <h2>我的资料</h2>
    <hr />
    <div>
      <div class="container d-flex justify-content-center align-items-center">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
          <el-form-item>
            <template #label>
              <span class="custom-label">昵称：</span>
            </template>
            <span class="custom-label">{{ userInfo.nickName }}</span>
          </el-form-item>
          <el-form-item>
            <template #label>
              <span class="custom-label">个人链接：</span>
            </template>
            <span class="custom-label">{{ userInfo.myLink }}</span>
          </el-form-item>
          <div class="mb-3 text-center">
            <button
              type="button"
              class="btn text-white btn-outline-warning"
              @click="edit()"
            >
              修改
            </button>
          </div>
        </el-form>
      </div>
      <div
        class="container d-flex justify-content-center align-items-center mt-3"
        v-if="isedit"
      >
        <el-form :model="form" label-width="auto" style="max-width: 600px">
          <el-form-item>
            <template #label>
              <span class="custom-label">昵称：</span>
            </template>
            <el-input v-model="form.nickName" />
          </el-form-item>
          <el-form-item>
            <template #label>
              <span class="custom-label">个人链接：</span>
            </template>
            <el-input v-model="form.myLink" />
          </el-form-item>
          <div class="mb-3 text-center">
            <button
              type="button"
              class="btn me-2 me-md-1 me-sm-1 text-white btn-outline-warning"
              @click="handleSave"
            >
              保存
            </button>
            <button
              type="button"
              class="btn text-white btn-outline-warning"
              @click="cancelEdit()"
            >
              取消
            </button>
          </div>
        </el-form>
        <!-- <form>
          <div class="mb-3">
            <label for="nickname" class="form-label"> 昵称： </label>
            <input class="text-dark" type="text" v-model="form.nickName" />
          </div>
          <div class="mb-3">
            <label for="nickname" class="form-label"> 个人主页链接： </label>
            <input class="text-dark" type="text" v-model="form.myLink" />
          </div>
          <div class="mb-3 text-center">
            <button
              type="button"
              class="btn me-2 me-md-1 me-sm-1 text-white btn-outline-warning"
              @click="handleSave"
            >
              保存
            </button>
            <button
              type="button"
              class="btn text-white btn-outline-warning"
              @click="cancelEdit()"
            >
              取消
            </button>
          </div>
        </form> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  name: "myInfo-Vue",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const isedit = ref(false);
    const form = reactive({
      nickName: "",
      myLink: "",
    });
    const userInfo = computed(() => store.getters["UserInfo/userInfo"]);
    const handleSave = () => {
      if (form.nickName === "" || form.myLink === "") {
        ElMessage({
          type: "warning",
          message: "昵称或个人主页链接不能为空！",
        });
        return;
      } else {
        store.dispatch("UserInfo/updateUserInfo", {
          id: userInfo.value.id,
          nickName: form.nickName,
          myLink: form.myLink,
        });
        isedit.value = false;
        setTimeout(() => {
          init();
        }, 1003);
      }
    };
    const init = () => {
      const user = sessionStorage.getItem("user");
      console.log(user);
      if (user) {
        store.dispatch("UserInfo/getUserInfo", {
          userId: JSON.parse(user).userId,
        });
      } else {
        router.push({ path: "/home1" });
      }
      setTimeout(() => {}, 1000);
    };
    const cancelEdit = () => {
      isedit.value = false;
    };
    const edit = () => {
      form.nickName = userInfo.value.nickName;
      form.myLink = userInfo.value.myLink;
      isedit.value = true;
    };
    onMounted(() => {
      init();
      // form.nickname = userInfo.value.nickname;
      // form.myLink = userInfo.value.myLink;
    });
    return {
      userInfo,
      form,
      isedit,
      edit,
      handleSave,
      cancelEdit,
    };
  },
};
</script>

<style lang="less">
.bg-transparent-51 {
  color: white;
  background-color: rgba(61, 77, 141, 0.936); /* 红色背景透明度为50% */
}
.custom-label {
  color: white; /* 更改为你想要的字体颜色 */
  font-size: 1rem; /* 更改为你想要的字体大小 */
  /* 更改为你想要的字体粗细 */
}
</style>
