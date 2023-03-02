import{_ as e,V as i,W as r,$ as a}from"./framework-e28fa486.js";const t="/assets/discord/botService.png",o="/assets/discord/frontPage.png",s={},c=a('<h1 id="discordbot项目介绍及使用方法" tabindex="-1"><a class="header-anchor" href="#discordbot项目介绍及使用方法" aria-hidden="true">#</a> DiscordBot项目介绍及使用方法</h1><p>DiscordBot项目的目标是实现一个可以定制化配置的问答机器人，同时机器人具有特定领域的交互能力。</p><p>DiscordBot项目当前由以下4个模块组成</p><ul><li>机器人后台服务(backend service)</li><li>机器人的后台管理服务（Bot interFace）</li><li>机器人的配置中心(Bot file system)</li><li>机器人模型训练及接口服务(Bot model service)</li></ul><p>这四个模块之间的交互如下</p><figure><img src="'+t+'" alt="服务交互" tabindex="0" loading="lazy"><figcaption>服务交互</figcaption></figure><h2 id="机器人后台服务-backend-service" tabindex="-1"><a class="header-anchor" href="#机器人后台服务-backend-service" aria-hidden="true">#</a> 机器人后台服务(backend service)</h2><p>机器人启动时会从机器人配置中心获取最新的前置拦截数据和命令交互数据，同时调用机器人模型接口获取最新的Ai模型。<br> 机器人后台服务主要是连接Discord网关，根据Discord App中用户的消息和交互，产生对应的回复。<br> 当前的回复方式可以参考<a href="%E6%B6%88%E6%81%AF%E6%8B%A6%E6%88%AA%E5%8F%8A%E5%9B%9E%E5%A4%8D%E7%AD%96%E7%95%A5">消息拦截及回复策略</a>。<br> 机器人后台服务同时会监听模型更新消息和前置拦截更新消息，当获得更新消息后，会重新拉取前置拦截数据和模型数据。</p><h2 id="机器人的后台管理服务-bot-interface" tabindex="-1"><a class="header-anchor" href="#机器人的后台管理服务-bot-interface" aria-hidden="true">#</a> 机器人的后台管理服务（Bot interFace）</h2><p>机器人的后台管理服务是一个面向机器人管理员的前端页面， 大概的界面如下：</p><figure><img src="'+o+'" alt="管理界面" tabindex="0" loading="lazy"><figcaption>管理界面</figcaption></figure><p>提供消息和命令更新、模型更新、机器人控制三大类功能。<br> 其中消息和命令更新，可以实现对前置拦截数据的获取、编辑及热更新到机器人后台服务。<br> 模型更新当前提供训练数据生成接口和模型更新接口，训练数据生成接口用于将一段文本转换为一组提问和回答，可以用于前置拦截或者模型训练。<br> 模型更新接口提供当前已有的模型查询，新模型训练，模型更改等操作。<br> 机器人控制功能主要提供对后台机器人服务的一些功能操作，例如重启，特殊用户限制等。\\</p><h2 id="机器人的配置中心-bot-file-system" tabindex="-1"><a class="header-anchor" href="#机器人的配置中心-bot-file-system" aria-hidden="true">#</a> 机器人的配置中心(Bot file system)</h2><p>机器人的配置中心是提供配置数据查询、数据更新等接口。</p><h2 id="机器人模型训练及接口服务-bot-model-service" tabindex="-1"><a class="header-anchor" href="#机器人模型训练及接口服务-bot-model-service" aria-hidden="true">#</a> 机器人模型训练及接口服务(Bot model service)</h2><p>机器人模型训练及接口服务主要提供模型查询，模型训练及训练数据生成的服务。</p>',16),d=[c];function n(l,h){return i(),r("div",null,d)}const _=e(s,[["render",n],["__file","DiscordBot项目介绍及使用方法.html.vue"]]);export{_ as default};
