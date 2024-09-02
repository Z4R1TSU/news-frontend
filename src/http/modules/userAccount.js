import http from "../http";

//获取用户活动信息
export function getUserActive(userId) {
  return http({
    url: "/user/getUserActive",
    method: "get",
    params: {
      userId,
    },
  });
}
//获取用户兑换信息
export function getUserExchangeList(page, userId) {
  return http({
    url: "/user/getUserExchangeList",
    method: "get",
    params: {
      page,
      userId,
    },
  });
}
//获取兑换比例
export function getExchangeRatio() {
  return http({
    url: "/user/getExchangeRatio",
    method: "get",
  });
}
//用户填写邀请码
export function addInvite(userId, inviterId) {
  return http({
    url: "/user/addInvite",
    method: "post",
    params: {
      userId,
      inviterId,
    },
  });
}
//保存用户兑换记录
export function addExchange(
  userId,
  changeType,
  changeValue,
  changeEcny,
  address
) {
  return http({
    url: "/user/addExchange",
    method: "post",
    data: {
      userId,
      changeType,
      changeValue,
      changeEcny,
      address,
    },
  });
}
//保存用户浏览时长
export function saveLookTime(userId, lookTime) {
  return http({
    url: "/user/saveLookTime",
    method: "post",
    params: {
      userId,
      lookTime,
    },
  });
}
