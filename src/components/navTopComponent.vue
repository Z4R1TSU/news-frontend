<template>
  <div>
    <!-- //顶部菜单栏 -->
    <nav class="text-white fixed-top" style="background-color: #152d60">
      <div class="container d-flex flex-wrap">
        <!-- 左侧logo -->
        <ul class="nav me-auto">
          <!-- logo -->
          <li class="nav-item" @click="toHome()">
            <a
              class="nav-link link-secondary px-2 active text-white"
              aria-current="page"
            >
              <img
                style="width: 5rem; height: 4rem"
                src="../assets/images/logo.png"
            /></a>
          </li>
          <!-- 首页 -->
          <!-- <li class="nav-item m-auto" >
            <van-icon name="wap-home-o" size="1.5rem" />
          </li> -->
          <!-- 标签 -->
          <li class="nav-item m-auto">
            <button
              class="btn px-2 text-white d-lg-none d-md-none"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample2"
              role="button"
              aria-controls="offcanvasExample"
            >
              <van-icon name="label-o" size="1.5rem" />
            </button>
          </li>
        </ul>
        <!-- 右侧菜单 -->
        <ul class="nav my-auto">
          <!-- 国家选择框 -->
          <li class="me">
            <div class="dropdown">
              <button
                class="btn dropdown-toggle text-white"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  :src="'/countryImg/' + selectedCountryImage"
                  alt="flag"
                  v-if="selectedCountryImage"
                  class="dropdown-img tu-img"
                />
                <!-- <span v-if="!isSelectedCountry"> </span> -->
              </button>
              <ul
                class="dropdown-menu dropdown-menu-scroll"
                aria-labelledby="dropdownMenuButton"
              >
                <li
                  v-for="(option, index) in CountriesList"
                  :key="index"
                  @click="selectCountry(option)"
                  class="dropdown-item"
                >
                  <img
                    :src="'/countryImg/' + option.img"
                    alt="flag"
                    class="dropdown-img tu-img"
                  />
                  .{{ option.countryCode }}
                </li>
              </ul>
            </div>
          </li>
          <!-- 语言选择框 -->
          <li class="me">
            <div class="dropdown">
              <button
                class="btn dropdown-toggle text-white"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="countryImg/language.png"
                  alt="Selected Image2"
                  class="tu-img dropdown-img"
                />
                <!-- v-if="!isSelectedLanguage" -->
                <!-- <span v-if="isSelectedLanguage">{{
                  selectedLanguageText
                }}</span> -->
              </button>
              <ul
                class="dropdown-menu dropdown-menu-scroll"
                aria-labelledby="dropdownMenuButton"
              >
                <li
                  v-for="(option, index) in LanguageList"
                  :key="index"
                  @click="selectLanguage(option)"
                  class="dropdown-item"
                >
                  {{ option.languageName }}
                </li>
              </ul>
            </div>
          </li>
          <!-- 登录按钮 -->
          <li class="nav-item" v-show="!islogin">
            <button
              class="btn px-2 text-white"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              登录
            </button>
          </li>
          <!-- 个人页按钮 -->
          <li v-show="islogin" class="nav-item my-auto">
            <div class="dropdown my-auto">
              <a
                class="d-block link-secondary text-white text-decoration-none dropdown-toggle"
                id="dropdownUser2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  :src="userPicture"
                  alt="m"
                  width="30"
                  height="30"
                  class="rounded-circle"
                />
              </a>
              <ul
                class="dropdown-menu text-small shadow"
                aria-labelledby="dropdownUser2"
              >
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/myInfo"
                    :class="$route.path === '/myInfo' ? 'active' : ''"
                    >我的资料</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/myAccount"
                    :class="$route.path === '/myAccount' ? 'active' : ''"
                    >我的账户</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/myLink"
                    :class="$route.path === '/myLink' ? 'active' : ''"
                    >我的发布</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/myLabel"
                    :class="$route.path === '/myLabel' ? 'active' : ''"
                    >我的收藏</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/myHistoryCord"
                    :class="$route.path === '/myHistoryCord' ? 'active' : ''"
                    >我的新闻分类</router-link
                  >
                </li>
                <!-- <li>
                  <router-link class="dropdown-item" to="#">设置</router-link>
                </li> -->
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <div class="dropdown-item" @click="signOut()">退出</div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- 小屏幕左侧标签栏 -->
      <div class="container" style="width: 100vh">
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample2"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body container">
            <ul class="nav d-flex flex-column justify-content-center">
              <li class="nav-item mb-1">
                <van-icon name="label-o" size="1.5rem" />
              </li>
              <div v-if="!islogin" style="margin-top: 30vh">
                <p>请先登录！</p>
              </div>
              <li
                v-for="(item, key) in collectList"
                :key="key"
                @click="toNewsDetail(key)"
              >
                <p class="ellispsis-line" style="width: 350px">
                  {{ item.title
                  }}<span class="text-secondary ms-2">{{ item.link }}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 右侧第三方登录栏 -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">登录</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="loginhome">
            <div class="logo">
              <img src="../assets/images/logo.png" alt="" />
              <h4>一个真正的导航网站</h4>
            </div>
            <div>
              <hr />
              <div>第三方授权登录</div>
            </div>
            <div class="logis">
              <img
                src="../assets/images/Facebook.svg"
                alt=""
                class="face"
                @click="clickfacebookLogin"
              />

              <img
                src="../assets/images/xcom.svg"
                alt=""
                class="xcom"
                @click="twitter"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { facebookLogin } from "@/http/facebook";
import { twitterLogin } from "@/http/modules/login";
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { countryList } from "@/data/countryList";
import { languageList } from "@/data/languageList";
import { useRouter } from "vue-router";
export default {
  name: "home1-Vue",
  components: {},
  setup() {
    const { locale } = useI18n();
    const router = useRouter();
    const islogin = ref(false);
    const userPicture = ref("https://github.com/mdo.png");
    const userInfo = computed(() => store.getters["UserInfo/userInfo"]);
    const isSelectedCountry = ref(false);
    const selectedCountryImage = ref("world1.png");
    const selectedLanguageText = ref("");
    const isSelectedLanguage = ref(false);
    const CountriesList = countryList;
    const LanguageList = languageList;
    const collectList = computed(
      () => store.getters["UserCollect/collectList"]
    );
    const init = () => {
      let user = sessionStorage.getItem("user");
      console.log(user);
      if (user !== null) {
        islogin.value = true;
        let userId = JSON.parse(user).userId;
        store.dispatch("UserCollect/getUserCollectList", {
          page: 1,
          userId: userId,
        });
        store.dispatch("UserInfo/getUserInfo", {
          userId: userId,
        });
      } else {
        islogin.value = false;
      }
    };
    const toNewsDetail = (key) => {
      store.commit("UserCollect/setKeyWord", null);
      if (collectList.value[key].newId) {
        store.dispatch("Home/addLook", { newId: collectList.value[key].newId });
      }
      router.push({ path: "/navframeMyCollect", query: { key: key } });
    };
    const store = useStore();
    const signOut = () => {
      islogin.value = false;
      sessionStorage.removeItem("user");
      router.push({ path: "/" });
    };
    const toHome = () => {
      router.push({ path: "/" });
    };
    //登录推特
    const twitter = async () => {
      console.log("twitter登录触发了");
      const res = await twitterLogin();
      console.log(res);
      console.log(res.data);
      if (res.data) {
        window.location.href = res.data.authUrl;
      } else {
        console.log(res);
      }
    };
    //登录facebook
    const clickfacebookLogin = () => {
      setTimeout(() => {
        facebookLogin();
      }, 50);
    };
    //选择国家
    const selectCountry = (option) => {
      isSelectedCountry.value = true;
      selectedCountryImage.value = option.img;
      // console.log(selectedCountryImage.value);
      sessionStorage.setItem("Country", JSON.stringify(option));
      store.commit("Home/setCountry", option.countryCode);
      // console.log(sessionStorage.getItem("Country"));
    };
    //选择语言
    const selectLanguage = (option) => {
      locale.value = option.languageCode;
      selectedLanguageText.value = option.languageName;
      isSelectedLanguage.value = true;
      sessionStorage.setItem("Language", JSON.stringify(option));
      store.commit("Home/setLanguage", option.languageCode);
    };
    watch(
      () => [userInfo.value],
      () => {
        if (userInfo.value !== null) {
          userPicture.value = userInfo.value.avatar;
        } else {
          userPicture.value = "https://github.com/mdo.png";
        }
      }
    );
    // 映射 actions
    const initFacebookSDK = () => {
      store.dispatch("Login/initFacebookSDK");
    };
    //获取session会话，国家代码跟语言代码
    const getCountryCodeAndLanguageCode = () => {
      const Country = JSON.parse(sessionStorage.getItem("Country"));
      const Language = JSON.parse(sessionStorage.getItem("Language"));
      console.log(Country);
      console.log(Language);

      if (Language !== null) {
        isSelectedLanguage.value = true;
        locale.value = Language.languageCode;
        store.commit("Home/setLanguage", Language.languageCode);
      }
      //else {
      //   //Language为空就默认中文
      //   locale.value = "zh_CN";
      //   store.commit("Home/setLanguage", "zh_CN");
      //   // store.dispatch("Type/getNewTypes", { languageCode: "zh_CN" });
      //   // store.dispatch("Type/getWebsiteTypes", { languageCode: "zh_CN" });
      // }
      if (Country !== null) {
        console.log(123);
        isSelectedCountry.value = true;
        selectedCountryImage.value = Country.img;
        store.commit("Home/setCountry", Country.countryCode);
      } else {
        console.log(234);
      }
    };
    // 在组件挂载后
    onMounted(() => {
      //初始化facebook
      //sessionStorage.removeItem("Country");
      //sessionStorage.removeItem("Language");
      getCountryCodeAndLanguageCode();
      init();
      initFacebookSDK();
      //const countryCodes = countryList.map((country) => country.countryCode);
      // countryList.map((country) => {
      //   console.log(country.countryCode);
      // });
    });
    return {
      islogin,
      selectedCountryImage,
      isSelectedCountry,
      isSelectedLanguage,
      selectedLanguageText,
      selectCountry,
      selectLanguage,
      signOut,
      CountriesList,
      LanguageList,
      clickfacebookLogin,
      toHome,
      toNewsDetail,
      collectList,
      twitter,
      userPicture,
    };
  },
};
</script>

<style lang="less">
.logis {
  img {
    width: 4rem;
    height: 4rem;
    margin: 1rem;
  }
}
.tu-img {
  width: 2rem;
  height: 1.5rem;
}
.ellispsis-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border: 1px solid #ccc; */
  font-size: 1rem;
  margin: 2px;
}
.dropdown-menu-scroll {
  max-width: 10px;
  max-height: 200px;
  /* 你可以根据需要调整这个高度 */
  overflow-y: auto;
}
</style>
