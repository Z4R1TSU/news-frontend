import {
  getUserNews,
  selectUserNewsKeyWord,
  addUserNew,
  deleteUserNew,
} from "@/http/modules/userLink";

// Actions
const actions = {
  //获取用户发布新闻
  async getUserNews({ commit }, { page, userId }) {
    try {
      const res = await getUserNews(page, userId);
      if (page == 1) {
        commit("setNewsListFirst", res.data.records);
      } else {
        commit("setNewsList", res.data.records);
      }
      commit("setPages", res.data.pages);
      commit("setCurrentPage", res.data.current);
      console.log(res.data);
      commit("setKeyWord", null);
    } catch (e) {
      console.error(e);
    }
  },
  //获取搜索用户发布新闻
  async selectUserNewsKeyWord({ commit }, { page, userId, keyWord }) {
    try {
      const res = await selectUserNewsKeyWord(page, userId, keyWord);
      if (page == 1) {
        commit("setNewsListFirst", res.data.records);
      } else {
        commit("setNewsList", res.data.records);
      }
      commit("setPages", res.data.pages);
      commit("setCurrentPage", res.data.current);
      commit("setKeyWord", keyWord);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },

  //添加新闻
  async addUserNew(
    _,
    { userId, title, imgUrl, link, countryCode, languageCode, typeName }
  ) {
    try {
      const res = await addUserNew(
        userId,
        title,
        imgUrl,
        link,
        countryCode,
        languageCode,
        typeName
      );
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
  //删除新闻
  async deleteUserNew(_, { id }) {
    try {
      const res = await deleteUserNew(id);
      console.log(id);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  },
};

// Mutations
const mutations = {
  setNewsListFirst(state, list) {
    state.NewsList = list;
  },
  setNewsList(state, list) {
    state.NewsList.push(...list);
  },
  setPages(state, list) {
    state.Pages = list;
  },
  setCurrentPage(state, page) {
    state.CurrentPage = page;
  },
  setKeyWord(state, keyWord) {
    state.KeyWor = keyWord;
  },
};
// Getters
const getters = {
  // 获取新闻列表
  newsList(state) {
    return state.NewsList;
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
};
// State
const state = () => ({
  NewsList: [],
  Pages: null,
  CurrentPage: null,
  KeyWord: "",
});

// Export
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
