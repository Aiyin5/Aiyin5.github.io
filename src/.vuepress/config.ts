import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "艾因的博客",
      description: "艾因的博客主页",
    }
  },
  theme,
  shouldPrefetch: false,
});
