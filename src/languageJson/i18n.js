import { createI18n } from "vue-i18n";
// import zh_CN from "./locales/zh_CN.json";
// import en from "./locales/en.json";
// import ja from "./locales/ja.json";
// const messages = {
//   zh_CN,
//   en,
//   ja,
// };

// 导入各语言的翻译文件
import zh_CN from "./locales/zh_CN.json";  // 简体中文
import zh_TW from "./locales/zh_TW.json";  // 繁体中文
import en from "./locales/en.json";        // 英语
import ar from "./locales/ar.json";        // 阿拉伯语
import bn from "./locales/bn.json";        // 孟加拉语
import de from "./locales/de.json";        // 德语
import es from "./locales/es.json";        // 西班牙语
import fr from "./locales/fr.json";        // 法语
import hi from "./locales/hi.json";        // 印地语
import id from "./locales/id.json";        // 印度尼西亚语
import it from "./locales/it.json";        // 意大利语
import ja from "./locales/ja.json";        // 日语
import ko from "./locales/ko.json";        // 韩语
import nl from "./locales/nl.json";        // 荷兰语
import pt from "./locales/pt.json";        // 葡萄牙语
import ru from "./locales/ru.json";        // 俄语
import th from "./locales/th.json";        // 泰语
import tr from "./locales/tr.json";        // 土耳其语
import vi from "./locales/vi.json";        // 越南语

// 创建消息对象，包含所有语言的翻译
const messages = {
  zh_CN,  // 简体中文
  zh_TW,  // 繁体中文
  en,     // 英语
  ar,     // 阿拉伯语
  bn,     // 孟加拉语
  de,     // 德语
  es,     // 西班牙语
  fr,     // 法语
  hi,     // 印地语
  id,     // 印度尼西亚语
  it,     // 意大利语
  ja,     // 日语
  ko,     // 韩语
  nl,     // 荷兰语
  pt,     // 葡萄牙语
  ru,     // 俄语
  th,     // 泰语
  tr,     // 土耳其语
  vi,     // 越南语
};

const i18n = createI18n({
  locale: "zh_CN", // 默认语言
  fallbackLocale: "zh_CN", // 回退语言
  messages,
  globalInjection: true, //全局生效$t
});

export default i18n;
