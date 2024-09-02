import { getUserInfo, updateUserInfo } from "@/http/modules/userInfo";
import { ElMessage } from "element-plus";
// Actions
const actions = {
  //获取用户资料
  async getUserInfo({ commit }, { userId }) {
    try {
      const res = await getUserInfo(userId);
      commit("setUserInfo", res.data);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
  async updateUserInfo(_, { id, nickName, myLink }) {
    try {
      console.log(id, nickName, myLink);
      const res = await updateUserInfo(id, nickName, myLink);
      if (res.data) {
        ElMessage.success("修改成功");
      }
    } catch (e) {
      console.error(e);
    }
  },
};

// Mutations
const mutations = {
  setUserInfo(state, UserInfo) {
    state.UserInfo = UserInfo;
  },
};
// Getters
const getters = {
  userInfo(state) {
    return state.UserInfo;
  },
};
// State
const state = () => ({
  UserInfo: {},
});

// Export
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
