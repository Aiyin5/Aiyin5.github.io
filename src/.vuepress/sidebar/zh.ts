import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "文章",
      icon: "note",
      prefix: "zh/posts/",
      children: "structure",
    },
    "艾因的简介",
    "slides",
  ],
});
