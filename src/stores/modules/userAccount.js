import {
  getUserActive,
  getUserExchangeList,
  getExchangeRatio,
  saveLookTime,
  addInvite,
  addExchange,
} from "@/http/modules/userAccount";
import { ElMessage } from "element-plus";

// Actions
const actions = {
  //获取用户活动信息
  async getUserActive({ commit }, { userId }) {
    try {
      const res = await getUserActive(userId);
      console.log(res.data);
      commit("setUserActive", res.data);
      commit("setBrowsingTime", res.data.lookTime);
      commit("setInvites", res.data.invitedNum);
    } catch (e) {
      console.error(e);
    }
  },
  //获取用户兑换比例
  async getExchangeRatio({ commit }) {
    try {
      const res = await getExchangeRatio();
      console.log(res.data);
      // commit("setExchangeRato", res.data);
      commit("setLookTimeValue", res.data[0].exchangeValue);
      commit("setInviteNumberValue", res.data[1].exchangeValue);
    } catch (e) {
      console.error(e);
    }
  },
  //获取用户兑换记录
  async getUserExchangeList({ commit }, { page, userId }) {
    try {
      const res = await getUserExchangeList(page, userId);
      if (page == 1) {
        commit("setExchangeListFirst", res.data.records);
      } else {
        commit("setExchangeList", res.data.records);
      }
      commit("setPages", res.data.pages);
      commit("setCurrentPage", res.data.current);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
  //保存用户浏览时长
  async saveLookTime(_, { userId, lookTime }) {
    try {
      const res = await saveLookTime(userId, lookTime);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
  //保存用户填写邀请码
  async addInvite({ commit }, { userId, inviterId }) {
    try {
      const res = await addInvite(userId, inviterId);

      if (res.data) {
        ElMessage({
          type: "info",
          message: "邀请有效",
        });
        commit("setIsInvited", true);
      } else {
        ElMessage({
          type: "info",
          message: "邀请无效",
        });
      }
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
  //保存用户兑换记录
  async addExchange(
    { commit },
    { userId, changeType, changeValue, changeEcny, address }
  ) {
    try {
      const res = await addExchange(
        userId,
        changeType,
        changeValue,
        changeEcny,
        address
      );
      console.log(res.data);
      if (res.data) {
        if (changeType == "lookTime") {
          commit("setBrowsingTime", 0);
        }
        if (changeType == "invitedNum") {
          commit("setInvites", 0);
        }
        ElMessage({
          type: "info",
          message: "兑换申请成功",
        });
      }
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

// Mutations
const mutations = {
  setExchangeListFirst(state, list) {
    state.ExchangeList = list;
  },
  setExchangeList(state, list) {
    state.ExchangeList.push(...list);
  },
  setPages(state, page) {
    state.Pages = page;
  },
  setCurrentPage(state, page) {
    state.CurrentPage = page;
  },
  setUserActive(state, userActive) {
    state.UserActive = userActive;
  },
  //比例
  setExchangeRato(state, exchangeRato) {
    state.ExchangeRato = exchangeRato;
  },
  setLookTimeValue(state, LookTimeValue) {
    state.LookTimeValue = LookTimeValue;
  },
  setInviteNumberValue(state, InviteNumberValue) {
    state.InviteNumberValue = InviteNumberValue;
  },
  //用户
  setBrowsingTime(state, browsingTime) {
    state.BrowsingTime = browsingTime;
  },
  addBrowsingTime(state, browsingTime) {
    state.BrowsingTime += browsingTime;
  },
  setInvites(state, Invites) {
    state.Invites = Invites;
  },
  //
  setIsInvited(state, isInvites) {
    state.UserActive.isInvited = isInvites;
  },
};
// Getters
const getters = {
  // 获取新闻列表
  exchangeList(state) {
    return state.ExchangeList;
  },
  // 获取当前页
  currentPage(state) {
    return state.CurrentPage;
  },
  // 获取总页数
  totalPages(state) {
    return state.Pages;
  },
  userActive(state) {
    return state.UserActive;
  },
  //比例
  exchangeRato(state) {
    return state.ExchangeRato;
  },
  lookTimeValue(state) {
    return state.LookTimeValue;
  },
  inviteNumberValue(state) {
    return state.InviteNumberValue;
  },
  //用户
  browsingTime(state) {
    return state.BrowsingTime;
  },
  invites(state) {
    return state.Invites;
  },
};
// State
const state = () => ({
  ExchangeList: [],
  Pages: null,
  CurrentPage: null,
  UserActive: {},
  ExchangeRato: [],
  BrowsingTime: 0,
  Invites: 0,
  LookTimeValue: 0,
  InviteNumberValue: 0,
});

// Export
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
