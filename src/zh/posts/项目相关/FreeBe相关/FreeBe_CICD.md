---
icon: edit
date: 2023-01-09
category:
  - 项目
tag:
  - freebe
  - CICD
sticky: true
star: 5
---
# 关于FreeBe的项目的CICD方案
为了方便开发、测试和运维，这边建议采用两套服务器搭建开发环境和测试环境，采用GitHub作为代码托管，SonarCloud进行代码质量控制，DockerHub作为镜像托管，Git Action作为流水线控制，腾讯云作为服务器。
这样每次开发完成代码更新，测试链接就可以实时展示更新后的产品，方便demo展示和进行测试。
具体的流程如下面的流程图
<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;margin-left:10px; margin-top:10px;width:100%; height:400px;" src="https://www.processon.com/embed/63bff214261f1c5cc7947101"></iframe>

## 自动化部署流程
### 开发环境的自动化部署
+ 开发人员进行本地开发，将代码push到GitHub的dev分支
+ GitAction监听到push后执行自动化部署脚本
+ 编译代码并导出目标文件
+ git Action登录dockerHub进行docker镜像构建
+ git Action登录腾讯云服务器进行docker镜像拉取及部署

### 测试环境的自动化部署
和开发环境基本一致，只有dev分支合并到Master分支时进行自动化部署。


## 测试流程
待定

## 自动化QA
待定

## 具体实现相关内容
以freebe的前端代码自动化部署为例。
在项目目录.github/workflows下添加git action流程文件ci.yaml
其中DOCKER_USERNAME、DOCKER_PASSWORD可以在github项目的setting下Secrets创建对应的密钥。
```yaml
name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - dev
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
      - name: Install and Build   //打包
        run: |
          yarn install
          yarn export
      - name: Log in to Docker Hub  //登录dockerHub
        uses: docker/login-action@f054a8b539a109f9f41c372932f1ae047eff08c9
        with:
          username: ${{ secrets.DOCKER_USERNAME }}        //dockerHub的用户名
          password: ${{ secrets.DOCKER_PASSWORD }}        //dockerHub的密码

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@98669ae865ea3cffbcbaa878cf57c20bbf1c6c38
        with:
          images: xxx/freebe                          //dockerHub中的仓库名称

      - name: Build and push Docker image           //创建docker镜像
        uses: docker/build-push-action@ad44023a93711e3deb337508980b4b5e9bcdc5dc
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
      - name: ssh docker login                   //登录腾讯云及部署镜像
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.TENCENT_CLOUD_IP }}
          username: ${{ secrets.TENCENT_CLOUD_NAME }}
          password: ${{ secrets.TENCENT_CLOUD_PASSWORD }}
          script: cd ~ && sh deploy.sh ${{ secrets.DOCKER_USERNAME }} ${{ secrets.DOCKER_PASSWORD }}
```
其中的部署镜像脚本depoy.sh需要放置在腾讯云中，参考内容如下：
其中xxx/freebe 为对应的dockerHub仓库镜像
```sh
echo -e "---------docker Login--------"
docker login --username=$1  --password=$2
echo -e "---------docker Stop--------"
docker stop freebe
echo -e "---------docker Rm--------"
docker rm freebe
docker rmi xxx/freebe:dev
echo -e "---------docker Pull--------"
docker pull xxx/freebe:dev
echo -e "---------docker Create and Start--------"
docker run --rm -d -p 80:80 --name freebe xxx/freebe:dev    
echo -e "---------deploy Success--------"

```
项目的根目录下需要添加DockerFile，参考内容如下：
```sh
FROM nginx
COPY ./out /usr/share/nginx/html
EXPOSE 80
```

一个自动化部署的案例请参考:[**自动化部署案例**](https://github.com/Aiyin5/freebe-web-test)
