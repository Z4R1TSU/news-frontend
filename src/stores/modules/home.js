import {
  getNewsbyTLC,
  getNewsByUserNewType,
  addLook,
} from "@/http/modules/newsRequest.js";

// Actions
const actions = {
  //获取新闻信息通过 类型 国家 语言代码
  async getNewsbyTLC(
    { commit },
    { page, newType, languageCode, countryCode, isUser }
  ) {
    try {
      const res = await getNewsbyTLC(
        newType,
        languageCode,
        countryCode,
        isUser
      );
      if (page == 1) {
        commit("setNewsListFirst", res.data);
      } else {
        commit("setNewsList", res.data);
      }
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
  //获取新闻信息 用户喜欢的类型 国家 语言代码
  async getNewsByUserNewType(
    { commit },
    { page, userId, languageCode, countryCode, isUser }
  ) {
    try {
      const res = await getNewsByUserNewType(
        userId,
        languageCode,
        countryCode,
        isUser
      );
      if (page == 1) {
        commit("setNewsListFirst", res.data);
      } else {
        commit("setNewsList", res.data);
      }
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
  //获取新闻信息 用户喜欢的类型 国家 语言代码
  async addLook(_, { newId }) {
    try {
      const res = await addLook(newId);
      console.log(res.data);
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
  // setPages(state, list) {
  //   state.Pages = list;
  // },
  // setCurrentPage(state, page) {
  //   state.CurrentPage = page;
  // },
  setCountry(state, country) {
    state.Country = country;
    console.log(state.Country);
  },
  setLanguage(state, language) {
    state.Language = language;
    console.log(state.Language);
  },
  setType(state, type) {
    state.NewType = type;
    console.log(state.NewType);
  },
};
// Getters
const getters = {
  // 获取新闻列表
  newsList(state) {
    return state.NewsList;
  },
  // // 获取当前页
  // currentPage(state) {
  //   return state.CurrentPage;
  // },
  // // 获取总页数
  // totalPages(state) {
  //   return state.Pages;
  // },
  // 获取国家
  country(state) {
    return state.Country;
  },
  // 获取语言
  language(state) {
    return state.Language;
  },
  // 获取新闻类型 //新闻详情页
  newType(state) {
    return state.NewType;
  },
};
// State
const state = () => ({
  NewsList: [],
  // Pages: null,
  // CurrentPage: null,
  Country: null,
  Language: null,
  NewType: null,
});

// Export
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
