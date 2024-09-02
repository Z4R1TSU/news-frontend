import http from "../http";

//获取用户发布
export function getUserNews(page, userId) {
  return http({
    url: "/users/getUserNews",
    method: "get",
    params: {
      page,
      userId,
    },
  });
}
//获取搜索用户发布
export function selectUserNewsKeyWord(page, userId, keyWord) {
  return http({
    url: "/users/selectUserNewsKeyWord",
    method: "get",
    params: {
      page,
      userId,
      keyWord,
    },
  });
}
//用户添加发布
export function addUserNew(
  userId,
  title,
  imgUrl,
  link,
  countryCode,
  languageCode,
  typeName
) {
  return http({
    url: "/users/addNew",
    method: "post",
    data: {
      userId,
      title,
      imgUrl,
      link,
      countryCode,
      languageCode,
      typeName,
    },
  });
}
//用户删除发布
export function deleteUserNew(id) {
  return http({
    url: "/users/deleteNew",
    method: "delete",
    params: {
      id,
    },
  });
}

