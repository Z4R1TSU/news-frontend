import { createStore } from "vuex";
import Home from "./modules/home";
import Home2 from "./modules/home2";
import Login from "./modules/login";
import Websites from "./modules/websites";
import SearchWebsites from "./modules/searchWebsites";
import TopWebsites from "./modules/topWebsites";
import UserLink from "./modules/userLink";
import UserCollect from "./modules/userCollect";
import UserNewType from "./modules/userNewType";
import UserInfo from "./modules/userInfo";
import UserAccount from "./modules/userAccount";

const store = createStore({
  modules: {
    Home,
    Login,
    Websites,
    SearchWebsites,
    TopWebsites,
    UserLink,
    UserCollect,
    UserNewType,
    UserInfo,
    UserAccount,
    Home2,
  },
});

export default store;
