
### 第1讲
- 招聘一般都会写上，vue-cli create-react-app 类似的经验，其实都是对 webpack的更高层的封装。

- 当往 前端架构师 的方向发展的时候，一定要对工程化的概念，对前端工程化有一个深刻的掌握。

- 工程化早起的发展，是没有工程化的概念、cjs(开始有一些module)、gulp、fis(百度)、webpack(最好用最受欢迎的前端打包工具)

- 为什么我们需要前端进行工程化这样的事情？ <br >
webpack能够帮助前端做的事情，很多
- entry/output
- dev-server
- 自动加载html
- 打包
- 抽离css样式
- es新语法支持
- 本地开发的联调、跨域、source-map
- vue
- react
- webpack优化、代码的压缩、模块化
- 懒加载
- 自带的优化
- tree-shaking
- 预计算
- 什么是工程化，所谓的工程化就是从 开发代码 - 到 - 上线代码的之间的一系列东西叫工程化
- 1，希望可以用到最新的语法
- 2，希望上线后的代码性能足够好

### 第2讲

- 开始讲解webpack 源码，打包的原理
- 浏览器端是不能实现模块化的，只能使用script标签不停的引入，文件module拆分之后的打包还需要webpack的进一步支持
- 重点看打包之后的内容，解析加载路径引入方式变化，文件相互的依赖关系，在webpack打包后的文件的依赖的关系
- 路径和执行函数以 key: value 的形式存在，路径是key value是函数，函数内使用 __webpack_require__ 代替了require或import
- 1， 读取 webpack.config.js
- 2， 解析文件依赖
- 3， 替换 require 为 __webpack_require__ 核心逻辑是 installedModules 
- 4， 本地使用对象{} 存储所有的文件，通过使用 __webpack_require__ 获取文件内容，执行函数
@todo 还有 loader plugin 等插件

### 第3讲

- 手写一个webpack工具，叫kkb，
- 在webpackxxx中添加 kkb.config.js

- 怎么在webpackxxx项目中用 kkb-pack， 需要 在 kkb-pack 项目的package.json中添加bin，bin是在安装的时候就会注册一个本地的命令
- 声明好bin之后，就可以本地安装一下，本地安装需要执行 npm link，
- 执行 npm link 会把bin的命令安装到本地的全局.


### 第4讲
手写miniwebpack

1. webpack 做了那几件事
    1. 文件依赖解析
    2. 文件内容替换
        1. loader文件转换
        2. require('xx.css')
        3. require('xx.less')
        4. require('xx.png')
    3. tapable，webpack的插件就是 tapable的对象，作为webpack范式编程事件流的基类，并把这些插件联合起来。类似订阅-发布的实现
    4. compile 有很多钩子，每个钩子可以做一些额外的事情，就是一个写plugin，编译的时候生成新的文件，修改文件等



- vue都会用，懂不懂组件化，懂不懂组件的设计，组件间通信，vuex使用，vuex原理是什么，Vue-router是什么，Vue-router原理是什么，vuessr如何实现 vue组件自动化测试

- 手写一个koa







