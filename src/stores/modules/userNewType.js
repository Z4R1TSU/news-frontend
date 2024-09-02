import { getUserNewType, addUserNewType } from "@/http/modules/userNewType";

// Actions
const actions = {
  //获取用户喜欢新闻类型
  async getUserNewType({ commit }, { userId }) {
    try {
      const res = await getUserNewType(userId);
      commit("setNewTypeList", res.data);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
  //保存用户喜欢新闻类型
  async addUserNewType(_, { userId, newTypes }) {
    try {
      const res = await addUserNewType(userId, newTypes);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

// Mutations
const mutations = {
  setNewTypeList(state, list) {
    state.NewTypeList = list;
  },
};
// Getters
const getters = {
  // 获取新闻列表
  newTypeList(state) {
    return state.NewTypeList;
  },
};
// State
const state = () => ({
  NewTypeList: [],
});

// Export
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
