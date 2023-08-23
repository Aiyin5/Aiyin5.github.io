---
icon: page
date: 2023-08-21
category:
- 项目
tag:
- AI Project Intro
---

# 半年中我用AI做些什么
在2023年的年初，我、五一和Ego一起参加了SeeDao的工作坊，为seedao打造一个基于Seedao数据的新人引导机器人，并拿到了二等奖。
至此我们走上了AI应用的开发和学习的道路。下面是我和我的团队在这半年里面一起完成的关于AI应用相关的内容。
关于大模型的一些基本概念可以看这个链接： [关于AI技术的分享](关于AI技术的分享)

## 文字推理及生成

文字推理类的大模型是以GPT为代表的一类通过问题(prompt)推导答案(answer)的大语言模型。
对于Gpt这一类的大语言模型的理解可以通过Ted Chiang发表的一篇文章理解：[**ChatGPT Is a Blurry JPEG of the Web**](https://www.newyorker.com/tech/annals-of-technology/chatgpt-is-a-blurry-jpeg-of-the-web)
可将 ChatGPT 等大语言模型视为网上所有文本的压缩数据。就像一张模糊的JPEG，是对图片的有损压缩。
GPT对文本内容的补全和JPEG数据恢复成图像，都是在已有数据基础上，根据概率，对缺失数据进行填充。

#### 当前比较主流的文字推理大模型

| 名称          | 网站                                        | 上下文大小          | 特点                                   |
| ----------- | ----------------------------------------- | -------------- | ------------------------------------ |
| GPT(3.5&4)  | https://beta.openai.com/                  | 4K-32K         | 非开源，GPT-4的能力在数学、代码方面暂时是最强的           |
| LLAMA1&2)   | https://github.com/facebookresearch/llama | /              | meta开源的，最近最火的，易于微调                   |
| Claude(1&2) | https://claude.ai/                        | 100K(约65000单词) | 可以接收PDF/txt附件，实现超长文本的翻译，总结，以及代码翻译    |
| 通义千问        | https://tongyi.aliyun.com/                | 4k             | 可以说是国内性能比较好的大模型，在阿里灵积模型开放api，v1版本开源。 |
| ChatGlm-6b  | https://maas.aminer.cn/                   | 16k-32k        | 国内最早开源的一批家用显卡可以部署和微调的模型              |

具体的综合对比可以参考[**大语言模型的综述**](https://zhuanlan.zhihu.com/p/619083290)

### 基于知识库的企业问答机器人ASKIO
Askio是我这半年里面最主要的项目，其本质是一个基于本地知识库的问答机器人。
整个项目的核心有两个，一个是如何将非结构化数据转换为结构化数据， 第二个是如何实现高效和高质量的检索并与LLM交互。
功能介绍及演示视频：https://www.bilibili.com/video/BV1Zz4y1g77J
Askio的国内官网：https://www.askio.xyz
Askio的产品介绍图如下:
![Askio的产品介绍.png](/assets/photo/Askio的产品介绍.png)



## 图像生成及推理
图像生成领域的大模型和软件在业界中还是比较少的，出名的有MJ（midjourney）和SD(stable diffusion)
Midjourney在参考CLIP及Diffusion开源模型的基础上，构建自己的垂类SaaS产品。
MJ更像是众多sd模型的混合版本，根据提示词实现了模型风格，模型类型的自动选择。
在图像生成的领域，我没有进行模型的微调和模型底层开发相关的经验，仅有使用SD的一些应用经验。
简单的描述一下图像生成大模型的实现原理，以下是基于SD1.0和SD1.5版本的，近期SDXL的出现，其实现原理更复杂和精细。

![sd原理.png](/assets/photo/sd原理.png)

其本质跟语言类的推理大模型是一样，是一个端到端的推理模型，只是输入的编码器和输出的解码器不一样。
简单易懂的 Diffusion Model 解释：https://www.youtube.com/watch?v=1CIpzeNxIhU
很棒的Stable Diffusion解释：https://jalammar.github.io/illustrated-stable-diffusion/
同样很棒的SD解释：https://medium.com/@steinsfu/stable-diffusion-clearly-explained-ed008044e07e

### 一些有趣的图像/视频模型推荐



### 基于SD的AI视频制作
Maro(马克)和我在最近的几个月里面，一直在研究AI视频制作，采用了很多方法和尝试。
在AI视频生成和制作中，最难和最复杂的和正常拍视频是一样的，是想法和脚本构思，其次是AI如何配合这些想法和剧情脚本，包括后期如何让AI视频不闪之类的。

### AI视频的展示
这是马克制作的第一个公开的AI视频 当一个铃铛说...点我：https://www.bilibili.com/video/BV1d94y1i7PA/
这是一个连续剧，下一集即将完成，同时剧情和技术也有了很大的提升。

### 基于SadTalk的图片生成数字人


## 语音生成及推理

## 语音相关的大模型

### 基于VIST/BARK的语音克隆

## 混合应用

### AI语音交互抖音小程序

### 数字人相关  基于Unit的数字人构建

### 于ASKIO的数字人 （五一）
