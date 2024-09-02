import { getWebsitesByTC } from "@/http/modules/websitesRequest.js";

// Actions
const actions = {
  //获取最新网站信息通过 国家
  async getLastWebsitesByC({ commit }, {websiteType, countryCode }) {
    try {
      const res = await getWebsitesByTC(websiteType,countryCode);
      commit("setTopWebsitesListFirst", res.data);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

// Mutations
const mutations = {
  setTopWebsitesListFirst(state, list) {
    state.topWebsitesList = list;
    console.log(state.topWebsitesList);
  },
  setTopWebsitesList(state, list) {
    state.topWebsitesList.push(...list);
  },
};
// Getters
const getters = {
  //推荐网站列表
  topWebsitesList(state) {
    //console.log(state.topWebsitesList);
    return state.topWebsitesList;
  },
};
// State
const state = () => ({
  topWebsitesList: [],
});

// Export
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
