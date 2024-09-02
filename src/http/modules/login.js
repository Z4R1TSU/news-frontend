import http from "../http";

//获取新闻信息通过 类型 国家 语言
export function twitterLogin() {
  return http({
    url: "/login/getTwitterLoginUrl",
    method: "get",
  });
}
export function saveFacebookUserInfo(userName, nickName, avatar) {
  return http({
    url: "/login/facebook",
    method: "post",
    data: {
      userName,
      nickName,
      avatar,
    },
  });
}
