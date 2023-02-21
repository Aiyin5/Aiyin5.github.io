---
icon: page
date: 2023-02-21
category:
  - 项目
tag:
  - DiscordBot System
---

# DiscordBot的实现方案及技术架构
本项目实现一个自主回答和具有一定命令功能的AI机器人，用于实现seeDao在Discord社区的问题解答，以及对新人Onboarding的支持。
具体的架构图如下：
<iframe id="decid" class="ifra" frameborder="0"  src="https://www.processon.com/embed/63f448646e3252660404dd02"></iframe>

整个系统由3个模块组成，分别是
+ 用于系统配置和管理的Bot InterFace
+ 用于对接Discord客户端的Backend Server
+ 用于模型更新和训练数据格式化的Model Service

系统中的Discord Client为真实的Discord App，Discord GateWay为Discord提供给开发者对接Client的网关。

系统中的三个模块，具体具有的功能如下：

**Bot InterFace**
+ 具有转换TraningData的接口
+ 具有更新前置拦截数据的接口
+ 具有更新bot控制命令的接口

**Backend Server**
+ 具体响应Client消息的能力
+ 具有响应Bot Interface 更新数据的能力

**Model Service**
+ 具有训练模型的能力
+ 具有返回格式化训练数据的能力

[当前的训练数据](训练数据集)

<style>
.ifra{
  display:block;
  margin-left:0px;
  margin-top:10px;
  width:100%; 
  height:600px;
}
</style>
