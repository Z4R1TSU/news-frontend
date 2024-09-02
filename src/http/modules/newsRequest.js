import http from "../http";

//获取新闻信息通过 类型 国家 语言
export function getNewsbyTLC(newType, languageCode, countryCode, isUser) {
  return http({
    url: "/news/list",
    method: "get",
    params: {
      newType,
      languageCode,
      countryCode,
      isUser,
    },
  });
}
//获取新闻信息通过 用户喜欢的类型 国家 语言
export function getNewsByUserNewType(
  userId,
  languageCode,
  countryCode,
  isUser
) {
  return http({
    url: "/news/listByUserNewsType",
    method: "get",
    params: {
      userId,
      languageCode,
      countryCode,
      isUser,
    },
  });
}
//新闻添加浏览
export function addLook(newId) {
  return http({
    url: "/news/addLook",
    method: "get",
    params: {
      newId,
    },
  });
}
