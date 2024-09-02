import http from "../http";

//获取网站信息通过类型 国家
export function getWebsitesByTC(websiteType, countryCode) {
  return http({
    url: "/websites/list",
    method: "get",
    params: {
      websiteType,
      countryCode,
    },
  });
}
export function getSearchWebsitesByC(countryCode) {
  return http({
    url: "/websites/searchWebsitesList",
    method: "get",
    params:{
      countryCode
    } ,
  });
}
