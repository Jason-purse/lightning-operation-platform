# 安装
## Redux Toolkit
Redux Toolkit 包含了Redux 核心,以及其他关键的包 - 感觉是对于构建Redux 应用必不可少的包(例如 Redux Thunk 以及 Reselect)

我们可以模块打包器或者在Node应用中使用npm 包..
```shell
# NPM
npm install @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```
此外它存在umd 构建打包,能够从 [unpkg dist 目录](https://unpkg.com/@reduxjs/toolkit/dist/)中加载umd对应的构建文件,umd 构建让redux toolkit能够
通过`window.RTK全局变量可用)

## Redux core
可以安装最新稳定版本
```shell
# NPM
npm install redux

# Yarn
yarn add redux
```
如果你不是,可以通过 [unpkg](https://unpkg.com/redux/) 中访问这些文件,并下载他们或者将包管理器指向它们 ..

大多数情况下,人们消费Redux 仅仅作为 [CommonJs](http://www.commonjs.org/)模块的集合,这些模块可以在当你在Webpack / Browserify或者Node环境中
导入`redux` 的时候可以获取想要的模块 ..如果你喜欢生活在边缘[Edge]并使用[Rollup](https://rollupjs.org/) 打包工具，我们也支持。

如果你没有使用模块打包器,同样Ok,redux npm包包含了预编译的生成以及开发的UMD
