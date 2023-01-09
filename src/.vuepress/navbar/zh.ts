import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "简历", icon: "discover", link: "/zh/demo/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/zh/posts/",
    children: [
      {
        text: "算法相关",
        icon: "edit",
        prefix: "算法相关",
        children: [
          { text: "图论整理", icon: "edit", link: "/1" },
          { text: "并查集", icon: "edit", link: "/2" },
          { text: "并查集", icon: "edit", link: "/3" },
          { text: "并查集", icon: "edit", link: "/4" },
        ],
      },
      {
        text: "后端相关",
        icon: "edit",
        prefix: "后端相关",
        children: [
          { text: "java基础", icon: "edit", link: "/1" },
          { text: "数据库", icon: "edit", link: "/2" },
          { text: "redis", icon: "edit", link: "/3" },
          { text: "开发框架", icon: "edit", link: "/4" },
          { text: "知识链接", icon: "edit", link: "/5" },
        ],
      },
      {
        text: "关于艾因",
        icon: "edit",
        prefix: "关于艾因",
        children: [
          { text: "java基础", icon: "edit", link: "/1" },
          { text: "数据库", icon: "edit", link: "/2" },
          { text: "redis", icon: "edit", link: "/3" },
          { text: "开发框架", icon: "edit", link: "/4" },
          { text: "知识链接", icon: "edit", link: "/5" },
        ],
      },
      {
        text: "个人体验",
        icon: "edit",
        prefix: "experience/",
        children: [
          {
            text: "艾因的菜单",
            icon: "edit",
            link: "1",
          },
          {
            text: "忧郁相关",
            icon: "edit",
            link: "2",
          },
          {
            text: "",
            icon: "edit",
            link: "2",
          },
        ],
      },
      {
        text: "项目相关",
        icon: "edit",
        prefix: "项目相关/",
        children: [
          {
            text: "风控决策引擎相关",
            icon: "edit",
            link: "1",
          },
          {
            text: "FreeBe相关",
            icon: "edit",
            link: "3",
          },
          {
            text: "个人主页及博客",
            icon: "edit",
            link: "personIndex",
          },
        ],
      },
    ],
  },
  { text: "关于", icon: "discover", link: "/about/About" },
]);
