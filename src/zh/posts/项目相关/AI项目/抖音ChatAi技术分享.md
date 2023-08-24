# Askio ChatAi 的技术分享

### 目的

技术测的一些技术方案分享

### 当前的技术方案

[ProcessOn Flowchart](https://www.processon.com/embed/645349aeb546c76a2f37186a)

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;margin-left:-244.5px; margin-top:-137.5px;width:489px; height:275px;" src="https://www.processon.com/embed/645349aeb546c76a2f37186a"></iframe>

### 当前的API调查

当前支持定制化语音模型的有讯飞和腾讯等厂商，但是价格都非常昂贵

腾讯云

[声音复刻_声音克隆_音色定制- 腾讯云](https://cloud.tencent.com/product/vrs)

讯飞

[发音人自训练平台_专属声音模型训练平台-讯飞开放平台](https://www.xfyun.cn/solutions/train)

讯飞的商用价格为单个语音模型1w/每年。

![4f9b3d560a8b428d93d9c2023e3d0d93](file:///C:/Users/Administrator/Pictures/Typedown/4f9b3d56-0a8b-428d-93d9-c2023e3d0d93.png?msec=1690107287050)



### 关于市面上的语音合成技术

语音合成的两种方式：TTS和VCS

TTS和VCS是两种不同的技术，分别用于语音合成和语音转换。

TTS（Text-to-Speech）是一种语音合成技术，它将文本转换为人类可以听懂的语音。使用TTS技术，计算机可以自动将文本转换为语音，而无需人类语音演讲者的参与。TTS技术可以用于语音助手、自动语音应答系统、有声读物等领域。

VCS（Voice Conversion System）是一种语音转换技术，它可以将一个人的语音转换成另一个人的语音，而不改变语音的内容和意义。VCS技术可以用于语音模仿、语音变声、语音匹配等领域。

虽然TTS和VCS都涉及到语音技术，但它们的应用场景和技术原理都有所不同。TTS主要用于将文本转换为语音，而VCS则用于语音转换和模仿。

### 当前的语音模型训练技术

当前我只研究了一下TTS相关的合成技术，没有研究VCS相关的技术，以下都是属于TTS的模型训练方式

当前主流的模型有基于Vits模型衍生出来的一系列模型和类似FastSpeech的Parallel模型，都可以在极低的训练数据下产生不错的效果

这两种模型的实现方式是非常类似的，训练过程也基本一致。

训练一个语音模型需要经历以下的步骤

准备预训练模型，也可以称为底模

准备训练的数据集，一般10-20短10秒以内的语音文件

对数据集进行降噪，并进行语音识别

最终标准的训练数据为10-20组短语音文件和对应的中文识别文字

进行训练（通常采用GPU进行），大约100个训练周期，约为10-20分钟，可以生成一个微调模型，也就是最终的语音模型。

该模型的效果取决于底模（预训练模型）+训练数据和训练时长决定，按照上面的训练方式可以实现大约70%的相似效果。
