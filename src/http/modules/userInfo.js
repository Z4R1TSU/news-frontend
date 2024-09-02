import http from "../http";

//获取用户个人资料
export function getUserInfo(userId) {
  return http({
    url: "/users/getUserInfo",
    method: "get",
    params: {
      userId,
    },
  });
}
export function updateUserInfo(id, nickName, myLink) {
  return http({
    url: "/users/updateUserInfo",
    method: "post",
    data: {
      id,
      nickName,
      myLink
    },
  });
}
