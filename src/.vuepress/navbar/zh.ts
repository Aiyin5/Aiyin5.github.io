import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "艾因的世界", icon: "discover",prefix: "/zh/posts/关于艾因",
    children: [
      { text: "关于艾因", icon: "edit", link: "/关于艾因" },
      { text: "生活体验", icon: "edit",
        prefix: "生活体验",
        children: [
          { text: "上海", icon: "edit", link: "/上海" },
          { text: "杭州", icon: "edit", link: "/杭州" },
          { text: "安吉", icon: "edit", link: "/安吉" },
          { text: "大理", icon: "edit", link: "/大理" },
        ] },
      {
        text: "关于厨师",
        icon: "edit",
        prefix: "关于厨师",
        children: [
          {
            text: "艾因家的菜",
            icon: "edit",
            link: "艾因家的菜",
          },
          {
            text: "艾因家的甜品",
            icon: "edit",
            link: "艾因家的甜品",
          },
          {
            text: "艾因家的特色",
            icon: "edit",
            link: "艾因家的特色",
          },
        ],
      },
      { text: "视野", icon: "edit",
        prefix: "视野",
        children: [
          {
            text: "tobeContinue",
            icon: "edit",
            link: "1",
          },
        ],},
    ] },
  {
    text: "项目",
    icon: "edit",
    prefix: "/zh/posts/项目相关/",
    children: [
      {
        text: "风控决策引擎相关",
        icon: "edit",
        link: "风控决策引擎",
      },
      {
        text: "FreeBe相关",
        icon: "edit",
        link: "FreeBe相关",
      },
      {
        text: "个人主页及博客",
        icon: "edit",
        link: "个人主页及博客",
      },
    ],
  },
  {
    text: "技术",
    icon: "edit",
    prefix: "/zh/posts/关于技术",
    children: [
      {
        text: "算法",
        icon: "edit",
        prefix: "/算法",
        children: [
          { text: "图论整理", icon: "edit", link: "/图论整理" },
          { text: "二分搜索边界判断", icon: "edit", link: "/二分搜索边界判断" },
          { text: "并查集", icon: "edit", link: "/并查集" },
        ],
      },
      {
        text: "后端",
        icon: "edit",
        prefix: "/后端",
        children: [
          { text: "java基础", icon: "edit", link: "/java基础" },
          { text: "数据库", icon: "edit", link: "/数据库" },
          { text: "redis", icon: "edit", link: "/redis" },
          { text: "开发框架", icon: "edit", link: "/开发框架" },
          { text: "知识链接", icon: "edit", link: "/知识链接" },
        ],
      },
    ],
  },
  { text: "文章翻译", icon: "edit",
    prefix: "/zh/posts/文章翻译",
    children: [
      { text: "K8s模式", icon: "edit", link: "/K8s模式/K8s模式设计" },
    ],
  },
  { text: "关于", icon: "discover", link: "/about/About" },
]);
