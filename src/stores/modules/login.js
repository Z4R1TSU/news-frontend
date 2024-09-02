import { initFacebookSDK } from "@/http/facebook";
import { saveFacebookUserInfo } from "@/http/modules/login";
const actions = {
  // 初始化facebook
  async initFacebookSDK() {
    try {
      const res = await initFacebookSDK(1878345752664036);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  },
  //保存facebook用户信息
  async saveFacebookUserInfo(_, { userName, nickName, avatar }) {
    try {
      console.log(userName, nickName, avatar);
      const res = await saveFacebookUserInfo(userName, nickName, avatar);
      console.log(res);
      console.log(res.data);
      if (res.data) {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        location.href = "http://netweb.link";
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  },
};

const mutations = {};
const state = () => ({});
export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
