# niffler-client

> niffler client, a vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## 运行

```bash
# 第一次运行
# install dependencies
npm install

# 安装element-ui
npm install element-ui

# 安装sass依赖包
npm install sass-loader --save-dev
npm install node-sass --sava-dev

# 配置boostrap-vue
npm i vue bootstrap-vue bootstrap

# 配置axios
npm install axios --save

# 配置二维码生成：vue-qr
npm install vue-qr --save

# serve with hot reload at localhost:8080
# 第一次安装上述依赖包后，以后运行只需下面命令
npm run dev
```


## 部署上线
```bash
# 打包生成 dist 文件夹
npm run build

# 安装 epel （为 CentOS、Scientific Linux 提供高质量软件开发包）
yum -y install epel-release
# 安装 Nginx
yum install nginx

# 将 dist 文件夹复制到 /var/www/niffler/
# 配置 Nginx
vi /etc/nginx/nginx.conf
...
        root         /var/www/niffler/dist;
...
        location / {
            root /var/www/niffler/dist;
            index index.html;
        }
...

# 重启 Nginx
nginx -c /etc/nginx/nginx.conf
```


## Theme color \#1D365D

<div style="background-color: #1D365D; width: 250px; color: white; text-align:center;">Theme color<br>#1D365D</div>

