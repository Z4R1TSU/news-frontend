//import { FB } from "facebook-js-sdk";
import axios from "axios";
import { ElMessage } from "element-plus";
// import { useStore } from "vuex";
import store from "@/stores/index";
export function initFacebookSDK(appId) {
  return new Promise((resolve, reject) => {
    if (window.FB) {
      //console.log("FB is already defined");
      resolve(window.FB);
      return;
    }

    window.fbAsyncInit = function () {
      // console.log("fbAsyncInit called");
      if (window.FB) {
        //console.log("FB is defined in fbAsyncInit");
        window.FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: "v13.0",
        });
        window.FB.AppEvents.logPageView();
        resolve(window.FB);
      } else {
        //console.error("FB is not defined in fbAsyncInit");
        reject(new Error("Facebook SDK not loaded correctly"));
      }
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      js.onload = () => {
        //console.log("SDK script loaded");
        if (!window.FB) {
          // console.error("FB is still not defined after SDK script loaded");
          reject(new Error("Facebook SDK script failed to load"));
        }
      };
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}

//facebook login

export const facebookLogin = () => {
  //console.log("facebook授权登录方法触发");
  window.FB.login(
    (response) => {
      if (response.authResponse) {
        // 用户成功登录
        const accessToken = response.authResponse.accessToken;
        console.log(accessToken);
        // 在这里可以进行进一步的操作，比如发送登录凭证给后端进行验证等
        axios
          .get("https://graph.facebook.com/me", {
            params: {
              fields: "id,name,email,picture",
              access_token: accessToken,
            },
          })
          .then((res) => {
            // res.data格式
            // {
            //     "id": "123456789012345", // 这是用户的唯一ID
            //     "name": "John Doe",
            //     "email": "john.doe@example.com", // 注意：这个字段可能不存在
            //     "picture": {
            //       "data": {
            //         "url": "https://platform-lookaside.fbsbx.com/.../profile.jpg",
            //         "is_silhouette": false
            //       }
            //     }
            //   }
            // console.log(res);
            console.log(res);
            console.log(res.data);
            console.log(res.data.id);
            console.log(res.data.name);
            console.log(res.data.picture.data.url);
            store.dispatch("Login/saveFacebookUserInfo", {
              userName: res.data.id,
              nickName: res.data.name,
              avatar: res.data.picture.data.url,
            });
            //发送登录请求
          });
      } else {
        // 用户取消登录
        ElMessage({
          type: "info",
          message: "Facebook登录被取消",
        });
        console.log("Facebook登录被取消");
        console.log(response);
      }
    },
    { scope: "public_profile,email" }
  );
};
