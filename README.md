# niffler-client

> niffler client, a vue.js project

## Theme color \#1D365D

<div style="background-color: #1D365D; width: 250px; color: white; text-align:center;">主题颜色<br>#1D365D</div>

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



## 版本说明

> 尽量按照以下版本安装，否则可能会出错

- node.js v8.9.0
- npm 6.9.0
- vue@2.6.10
- vue-router@3.0.6
- element-ui@2.8.2



## 运行

```bash
#第一次运行
# install dependencies
npm install

# 安装element-ui
npm install element-ui

# 安装sass依赖包
npm install sass-loader --save-dev
npm install node-sass --sava-dev

#配置boostrap-vue
npm i vue bootstrap-vue bootstrap

# serve with hot reload at localhost:8080
#第一次安装上述依赖包后，以后运行只需下面命令
npm run dev
```





## 2019.5.15

> by wuzht

- 2019.5.25 更改了登录界面 by chain

### Done

实现了简单的登录界面和主页面原型，待修改

### TODO

* 改善代码
* 登录认证
* 注册账号
* 完善主页面（任务发布、查看等）