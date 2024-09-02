import { getSearchWebsitesByC } from "@/http/modules/websitesRequest.js";

// Actions
const actions = {
  // 获取搜索网站信息通过国家代码
  async getSearchWebsitesByC({ commit }, { countryCode }) {
    try {
      const res = await getSearchWebsitesByC(countryCode);
      console.log(res);
      commit("setSearchWebsitesListFirst", res.data);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

// Mutations
const mutations = {
  setSearchWebsitesListFirst(state, list) {
    state.SearchWebsitesList = list;
  },
  setSearchWebsitesList(state, list) {
    state.SearchWebsitesList.push(...list);
  },
};

// Getters
const getters = {
  // 获取搜索网站列表
  searchWebsitesList(state) {
    return state.SearchWebsitesList;
  },
};

// State
const state = () => ({
  SearchWebsitesList: [],
});

// Export
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
