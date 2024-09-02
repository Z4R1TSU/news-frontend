import http from "../http";

//获取用户收藏
export function getUserCollectList(page, userId) {
  return http({
    url: "/users/getCollectList",
    method: "get",
    params: {
      page,
      userId,
    },
  });
}
//获取搜索用户收藏
export function selectUserCollectList(page, userId, keyWord) {
  return http({
    url: "/users/selectCollectList",
    method: "get",
    params: {
      page,
      userId,
      keyWord,
    },
  });
}
//用户添加收藏
export function addUserCollect(userId, newId, title, link) {
  return http({
    url: "/users/addCollect",
    method: "post",
    data: {
      userId,
      newId,
      title,
      link,
    },
  });
}
//用户取消收藏
export function deleteUserCollect(id) {
  return http({
    url: "/users/deleteCollect",
    method: "delete",
    params: {
      id,
    },
  });
}
//用户是否收藏
export function isCollect(userId, link) {
  return http({
    url: "/users/isCollect",
    method: "get",
    params: {
      userId,
      link,
    },
  });
}
