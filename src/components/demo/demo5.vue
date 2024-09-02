<template>
  <div>
    <label for="language-select">选择语言：</label>
    <select
      id="language-select"
      v-model="selectedLanguage"
      @change="changeLanguage"
    >
      <option
        v-for="(item, key) in languageList"
        :key="key"
        :value="item.languageCode"
      >
        {{ item.languageName }}
      </option>
      <!-- 添加更多语言选项 -->
    </select>
    <label for="country-select">选择国家：</label>
    <select
      id="country-select"
      v-model="selectedCountry"
      @change="changeCountry"
    >
      <option
        v-for="(item, key) in countryList"
        :key="key"
        :value="item.countryCode"
      >
        {{ item.countryName }}
      </option>
      <!-- 添加更多国家选项 -->
    </select>

    <!-- <label for="newType-select">选择新闻类型：</label>
    <select
      id="newType-select"
      v-model="selectedNewType"
      @change="changeNewType"
    >
      <option value="en">English</option>
    </select> -->
    <p>languageCode： {{ selectedLanguage }}</p>
    <p>countryCode ：{{ selectedCountry }}</p>
    <p>newType： {{}}</p>
  </div>
</template>
<script>
import { countryList } from "@/data/countryList";
import { languageList } from "@/data/languageList2";
export default {
  name: "demo5-Vue",
  data() {
    return {
      countryList,
      languageList,
      selectedLanguage: null,
      selectedCountry: null,
    };
  },
  methods: {
    changeLanguage() {
      // 在此处处理语言更改逻辑
      // console.log(`语言切换到: ${this.selectedLanguage}`);
      // this.$i18n.locale = this.selectedLanguage; // 如果你使用 vue-i18n
    },
    changeCountry() {
      // 在此处处理语言更改逻辑
      // console.log(`语言切换到: ${this.selectedLanguage}`);
      // this.$i18n.locale = this.selectedLanguage; // 如果你使用 vue-i18n
    },
  },
};
</script>

<style></style>
