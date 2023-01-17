import{_ as s,V as d,W as a,X as e,Y as i,$ as r,a0 as l,D as c}from"./framework-b9ac5585.js";const t={},u=e("h1",{id:"关于freebe的项目的cicd方案",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#关于freebe的项目的cicd方案","aria-hidden":"true"},"#"),i(" 关于FreeBe的项目的CICD方案")],-1),o=e("p",null,"为了方便开发、测试和运维，这边建议采用两套服务器搭建开发环境和测试环境，采用GitHub作为代码托管，SonarCloud进行代码质量控制，DockerHub作为镜像托管，Git Action作为流水线控制，腾讯云作为服务器。 具体的流程如下面的流程图",-1),v=e("iframe",{id:"embed_dom",name:"embed_dom",frameborder:"0",style:{display:"block","margin-left":"10px","margin-top":"10px",width:"800px",height:"400px"},src:"https://www.processon.com/embed/63bff214261f1c5cc7947101"},null,-1),b=l(`<h2 id="自动化部署流程" tabindex="-1"><a class="header-anchor" href="#自动化部署流程" aria-hidden="true">#</a> 自动化部署流程</h2><h3 id="开发环境的自动化部署" tabindex="-1"><a class="header-anchor" href="#开发环境的自动化部署" aria-hidden="true">#</a> 开发环境的自动化部署</h3><ul><li>开发人员进行本地开发，将代码push到GitHub的dev分支</li><li>GitAction监听到push后执行自动化部署脚本</li><li>编译代码并导出目标文件</li><li>git Action登录dockerHub进行docker镜像构建</li><li>git Action登录腾讯云服务器进行docker镜像拉取及部署</li></ul><h3 id="测试环境的自动化部署" tabindex="-1"><a class="header-anchor" href="#测试环境的自动化部署" aria-hidden="true">#</a> 测试环境的自动化部署</h3><p>和开发环境基本一致，只有dev分支合并到Master分支时进行自动化部署。</p><h2 id="测试流程" tabindex="-1"><a class="header-anchor" href="#测试流程" aria-hidden="true">#</a> 测试流程</h2><p>待定</p><h2 id="自动化qa" tabindex="-1"><a class="header-anchor" href="#自动化qa" aria-hidden="true">#</a> 自动化QA</h2><p>待定</p><h2 id="具体实现相关内容" tabindex="-1"><a class="header-anchor" href="#具体实现相关内容" aria-hidden="true">#</a> 具体实现相关内容</h2><p>以freebe的前端代码自动化部署为例。 在项目目录.github/workflows下添加git action流程文件ci.yaml 其中DOCKER_USERNAME、DOCKER_PASSWORD可以在github项目的setting下Secrets创建对应的密钥。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name: GitHub Actions Build and Deploy Demo
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
          username: \${{ secrets.DOCKER_USERNAME }}    	//dockerHub的用户名
          password: \${{ secrets.DOCKER_PASSWORD }}    	//dockerHub的密码

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@98669ae865ea3cffbcbaa878cf57c20bbf1c6c38
        with:
          images: xxx/freebe        			      //dockerHub中的仓库名称

      - name: Build and push Docker image   		//创建docker镜像
        uses: docker/build-push-action@ad44023a93711e3deb337508980b4b5e9bcdc5dc
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
      - name: ssh docker login   				//登录腾讯云及部署镜像
        uses: appleboy/ssh-action@master
        with:
          host: \${{ secrets.TENCENT_CLOUD_IP }}
          username: \${{ secrets.TENCENT_CLOUD_NAME }}
          password: \${{ secrets.TENCENT_CLOUD_PASSWORD }}
          script: cd ~ &amp;&amp; sh deploy.sh \${{ secrets.DOCKER_USERNAME }} \${{ secrets.DOCKER_PASSWORD }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的部署镜像脚本depoy.sh需要放置在腾讯云中，参考内容如下： 其中xxx/freebe 为对应的dockerHub仓库镜像</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo -e &quot;---------docker Login--------&quot;
docker login --username=$1  --password=$2
echo -e &quot;---------docker Stop--------&quot;
docker stop freebe
echo -e &quot;---------docker Rm--------&quot;
docker rm freebe
docker rmi xxx/freebe:dev
echo -e &quot;---------docker Pull--------&quot;
docker pull xxx/freebe:dev
echo -e &quot;---------docker Create and Start--------&quot;
docker run --rm -d -p 80:80 --name freebe xxx/freebe:dev    
echo -e &quot;---------deploy Success--------&quot;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目的根目录下需要添加DockerFile，参考内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM nginx
COPY ./out /usr/share/nginx/html
EXPOSE 80
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),m={href:"https://github.com/Aiyin5/freebe-web-test",target:"_blank",rel:"noopener noreferrer"},h=e("strong",null,"自动化部署案例",-1);function p(x,f){const n=c("ExternalLinkIcon");return d(),a("div",null,[u,o,v,b,e("p",null,[i("一个自动化部署的案例请参考:"),e("a",m,[h,r(n)])])])}const k=s(t,[["render",p],["__file","FreeBe_CICD.html.vue"]]);export{k as default};
