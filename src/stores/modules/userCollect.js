import {
  getUserCollectList,
  selectUserCollectList,
  addUserCollect,
  deleteUserCollect,
  isCollect,
} from "@/http/modules/userCollect";

// Actions
const actions = {
  //获取用户收藏
  async getUserCollectList({ commit }, { page, userId }) {
    try {
      const res = await getUserCollectList(page, userId);
      if (page == 1) {
        commit("setCollectListFirst", res.data.records);
      } else {
        commit("setCollectList", res.data.records);
      }
      commit("setPages", res.data.pages);
      commit("setCurrentPage", res.data.current);
      console.log(res.data);
      commit("setKeyWord", null);
    } catch (e) {
      console.error(e);
    }
  },
  //获取搜索用户收藏
  async selectUserCollectList({ commit }, { page, userId, keyWord }) {
    try {
      const res = await selectUserCollectList(page, userId, keyWord);
      if (page == 1) {
        commit("setCollectListFirst", res.data.records);
      } else {
        commit("setCollectList", res.data.records);
      }
      commit("setPages", res.data.pages);
      commit("setCurrentPage", res.data.current);
      console.log(res.data);
      commit("setKeyWord", keyWord);
    } catch (e) {
      console.error(e);
    }
  },
  //用户收藏
  async addUserCollect({ commit }, { userId, newId, title, link }) {
    try {
      const res = await addUserCollect(userId, newId, title, link);
      console.log(res.data);
      commit("setIsCollect", res.data);
    } catch (e) {
      console.error(e);
    }
  },
  //用户取消收藏
  async deleteUserCollect({ commit }, { id }) {
    try {
      const res = await deleteUserCollect(id);
      console.log(id);
      commit("setIsCollect", res.data);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
  //用户是否收藏
  async isCollect({ commit }, { userId, link }) {
    try {
      const res = await isCollect(userId, link);
      commit("setIsCollect", res.data);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

// Mutations
const mutations = {
  setCollectListFirst(state, list) {
    state.CollectList = list;
  },
  setCollectList(state, list) {
    state.CollectList.push(...list);
  },
  setPages(state, list) {
    state.Pages = list;
  },
  setCurrentPage(state, page) {
    state.CurrentPage = page;
  },
  setKeyWord(state, keyWord) {
    state.KeyWord = keyWord;
  },
  setIsCollect(state, isCollect) {
    state.isCollect = isCollect;
  },
};
// Getters
const getters = {
  // 获取新闻列表
  collectList(state) {
    return state.CollectList;
  },
  // 获取当前页
  currentPage(state) {
    return state.CurrentPage;
  },
  // 获取总页数
  totalPages(state) {
    return state.Pages;
  },
  keyWord(state) {
    return state.KeyWord;
  },
  isCollect(state) {
    return state.isCollect;
  },
};
// State
const state = () => ({
  CollectList: [],
  Pages: null,
  CurrentPage: null,
  KeyWord: "",
  //非零则是id
  isCollect: null,
});

// Export
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
