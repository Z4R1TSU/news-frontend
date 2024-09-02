import http from "../http";

//获取用户喜欢新闻类型
export function getUserNewType(userId) {
  return http({
    url: "/users/getNewType",
    method: "get",
    params: {
      userId,
    },
  });
}
//保存用户喜欢新闻类型
export function addUserNewType(userId, newTypes) {
  return http({
    url: "/users/addNewType",
    method: "post",
    data: {
      userId,
      newTypes,
    },
  });
}
