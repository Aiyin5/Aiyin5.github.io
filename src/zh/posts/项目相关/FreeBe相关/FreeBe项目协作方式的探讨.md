---
icon: page
date: 2023-02-15
category:
  - 项目
tag:
  - freebe
  - CICD
star: 3
sticky: true
---


# FreeBe开发和测试协作的方式探讨
前两天Zoe跟我聊了一下，关于FreeBe项目开发上的一些现状，由于前端和后端都是由一位或者两位作者在更新和维护，项目更新和维护的进度很难把控，
同时群里有很多技术方面的小伙伴也想参与到项目的开发和维护中，所以就当前基于github托管模式，提一些便于团队协作的建议。

具体的实现可以通过会议讨论去定义，以下内容可以作为参考

## 多分支及权限设置
<iframe class="ifra" id="embed_dom" name="embed_dom" frameborder="0" src="https://www.processon.com/embed/63eca25c440e433d3d68af58"></iframe>
根据当前团队的规模和协作方式，建议按照上图的git flow进行开发迭代，具体如下：

+ 把master分支作为最终的上线分支，分支权限：只有产品负责人具有修改权限，其他人只读。
+ 把release分支作为测试分支，分支权限：产品负责人具有merge权限，其他人只读。
+ 把develop分支作为开发分支，分支权限：产品负责人和主要开发者具体merge权限，其他人只读。
+ 设置开发者自己的分支，分支权限: 开发者具有全部权限。

具体的流程是：
+ 各位开发者在自己的分支进行代码开发，当需要更新代码到develp分支时，提pull request
+ 产品负责人和主要开发者review代码后进行代码合并，同时可以通过开发环境进行开发侧的测试
+ 每当项目到一定阶段，产品负责人进行develop到release分支的代码合并，这时候测试将参与进来进行测试
+ 测试小伙伴在测试环境进行测试并反馈bug，根据bug类型和功能将有开发进行修复，然后更新develop分支和release分支
+ 当产品需要上线时，产品负责人将合并release 分支到master分支，进行产品发布

## 开发环境、测试环境和产品环境的设置
+ 通过github action/gitlab action的配置文件进行开发环境、测试环境以及产品环境的区分
+ 产品负责人在创建分支时，根据不同的分支配置好对应的CI配置文件，在项目Security上配置需要用到的环境密钥，开发小伙伴只需要负责修改功能代码即可。
具体的实现请参考[关于FreeBe的项目的CICD方案](https://aiyin5.github.io/zh/posts/%E9%A1%B9%E7%9B%AE%E7%9B%B8%E5%85%B3/FreeBe%E7%9B%B8%E5%85%B3/FreeBe_CICD.html)
+ 开发完成开发后，可以通过develop分支对应的开发测试环境进行自测。
+ 当develop分支合并到release分支后，自动邮件通知测试小伙伴进行测试（通过github action/gitlab action的notifications实现）。
+ 产品环境在非更新状态，保持对外一直可用

## 测试及自动化测试
测试及自动化测试相关的内容还在跟Nancy进行探讨，预计下一周(2023-2-23左右)会有进展。


<style>
.ifra{
  display:block;
  margin-left:0px;
  margin-top:10px;
  width:100%; 
  height:450px;
}
</style>
