import { createApp } from "vue";
import App from "./App.vue";
//vant
import Vant from "vant";
import "vant/lib/index.css";
//i18n
import i18n from "./languageJson/i18n";

//router
//store
import store from "./stores";
import router from "./router";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as icons from "@element-plus/icons-vue";

const app = createApp(App);
// 全局注册所有图标
Object.keys(icons).forEach((key) => {
  app.component(key, icons[key]);
});
// const user = { userId: 66667 };
// sessionStorage.setItem("user", JSON.stringify(user));
//sessionStorage.removeItem("user");
app.use(i18n);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(Vant);
app.mount("#app");
//createApp(App).mount("#app");
