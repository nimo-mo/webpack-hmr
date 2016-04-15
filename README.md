# react pretty router with gulp & webpack

##开发环境
###在开始之前请安装node.js, gulp, gulp-cli

下载nodejs [https://nodejs.org/en/](https://nodejs.org/en/) (for windows & OSX)

以下方法仅适用于OSX(全局安装npm模块时无需sudo,推荐)

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update

export PATH="/usr/local/bin:$PATH"

brew install node

npm install gulp gulp-cli -g


##进入项目根目录安装依赖
`cd path/to/demo`

`npm install`


##开启实时编译
`gulp watch`


##启动服务
`cd path/to/demo` (open a new terminal window or tab)

`npm start`

[http://localhost:4096/](http://localhost:4096/)

##打包构建
`gulp build`

