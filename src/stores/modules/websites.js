import { getWebsitesByTC } from "@/http/modules/websitesRequest";
// Actions
const actions = {
  //获取网站信息通过类型 国家
  async getWebsitesByTC({ commit }, { websiteType, countryCode }) {
    try {
      const res = await getWebsitesByTC(websiteType, countryCode);
      commit("setWebsitesListFirst", res.data);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

// Mutations
const mutations = {
  setWebsitesListFirst(state, list) {
    state.WebsitesList = list;
  },
};
// Getters
const getters = {
  // 获取网站列表
  websitesList(state) {
    return state.WebsitesList;
  },
};
// State
const state = () => ({
  WebsitesList: [],
});

// Export
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
