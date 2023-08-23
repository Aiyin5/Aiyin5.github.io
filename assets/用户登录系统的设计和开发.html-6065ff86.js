const t=JSON.parse('{"key":"v-c75b0a2e","path":"/zh/posts/%E9%A1%B9%E7%9B%AE%E7%9B%B8%E5%85%B3/DiscordBot/%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E7%B3%BB%E7%BB%9F%E7%9A%84%E8%AE%BE%E8%AE%A1%E5%92%8C%E5%BC%80%E5%8F%91.html","title":"用户登录模块的设计及开发","lang":"zh-CN","frontmatter":{"icon":"page","date":"2023-03-13T00:00:00.000Z","category":["项目"],"tag":["DiscordBot System"],"description":"用户登录模块的设计及开发 基本功能描述 登录模块包含三个主要功能，用户登录、用户注册、用户信息展示和修改 其他辅助的功能有保存用户登录状态，根据用户信息（角色）展示不同主页 用户角色当前有三种： 没有绑定机器人的用户，登录后展示联系管理员申请机器人。 拥有机器人且是机器人创建者（拥有）的角色，登录后为机器人后台管理界面加上成员管理栏（可以添加删除团队成员） 由于机器人且是机器人的管理的角色，登录后仅展示机器人的管理界面 用户登录和注册的流程 用户登录的流程","head":[["meta",{"property":"og:url","content":"https://aiyin5.github.io/zh/posts/%E9%A1%B9%E7%9B%AE%E7%9B%B8%E5%85%B3/DiscordBot/%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E7%B3%BB%E7%BB%9F%E7%9A%84%E8%AE%BE%E8%AE%A1%E5%92%8C%E5%BC%80%E5%8F%91.html"}],["meta",{"property":"og:site_name","content":"艾因的博客"}],["meta",{"property":"og:title","content":"用户登录模块的设计及开发"}],["meta",{"property":"og:description","content":"用户登录模块的设计及开发 基本功能描述 登录模块包含三个主要功能，用户登录、用户注册、用户信息展示和修改 其他辅助的功能有保存用户登录状态，根据用户信息（角色）展示不同主页 用户角色当前有三种： 没有绑定机器人的用户，登录后展示联系管理员申请机器人。 拥有机器人且是机器人创建者（拥有）的角色，登录后为机器人后台管理界面加上成员管理栏（可以添加删除团队成员） 由于机器人且是机器人的管理的角色，登录后仅展示机器人的管理界面 用户登录和注册的流程 用户登录的流程"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-08-23T06:58:17.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"DiscordBot System"}],["meta",{"property":"article:published_time","content":"2023-03-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-23T06:58:17.000Z"}]]},"headers":[{"level":2,"title":"基本功能描述","slug":"基本功能描述","link":"#基本功能描述","children":[{"level":3,"title":"用户登录和注册的流程","slug":"用户登录和注册的流程","link":"#用户登录和注册的流程","children":[]}]},{"level":2,"title":"后端api文档","slug":"后端api文档","link":"#后端api文档","children":[]},{"level":2,"title":"数据库的设计","slug":"数据库的设计","link":"#数据库的设计","children":[]}],"git":{"createdTime":1692773897000,"updatedTime":1692773897000,"contributors":[{"name":"aiyin","email":"372020407@qq.com","commits":1}]},"readingTime":{"minutes":0.97,"words":292},"filePathRelative":"zh/posts/项目相关/DiscordBot/用户登录系统的设计和开发.md","localizedDate":"2023年3月13日","excerpt":"<h1> 用户登录模块的设计及开发</h1>\\n<h2> 基本功能描述</h2>\\n<p>登录模块包含三个主要功能，用户登录、用户注册、用户信息展示和修改\\n其他辅助的功能有保存用户登录状态，根据用户信息（角色）展示不同主页\\n用户角色当前有三种：</p>\\n<ul>\\n<li>没有绑定机器人的用户，登录后展示联系管理员申请机器人。</li>\\n<li>拥有机器人且是机器人创建者（拥有）的角色，登录后为机器人后台管理界面加上成员管理栏（可以添加删除团队成员）</li>\\n<li>由于机器人且是机器人的管理的角色，登录后仅展示机器人的管理界面</li>\\n</ul>\\n<h3> 用户登录和注册的流程</h3>\\n<p>用户登录的流程</p>","autoDesc":true}');export{t as data};
