## 自定义 webpack 配置文件

### 1 参考元素： 
module    DevServer    proxy    plugins    entry    output     <br />
### 附件元素： 
contentBase    服务端babel-转换  <br />

### 2 插件使用
#### 2.1 简化
new webpack.optimize.OccurenceOrderPlugin(); <br />

因为webpack打包原理：模块 块id ，它会根据id的使用频率和分布来得出最短id，将最短id分配给频率高的模块。<br />
new webpack.optimize.UglifyJsPlugin(); 用于压缩代码的插件。 <br />

#### 2.2 去重
new webpack.optimize.DedupePlugin(); 如果你的项目用到很多依赖库，库文件里一定有很多代码是重复的 <br />
webpack会对这些文件进行去重，保证不会有重复的代码，并且会封装成一个函数，请求是调用，不会影响语义。<br />

#### 2.3，chunks 优化
```
new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15});
//限制块的总数 new webpack.optimize.MinChunkSizePlugin({minChunkSize:10000}); 
//限制一块的最小容量 如果编码遇到很多分割点(ajax)，这样就有很多细小的http请求，这样会占用http资源，通过以上两个插件可以合并管理这些模块。
```

#### 2.4 单页
app拆分成很多chunk，chunk被路由加载，模块仅仅包含路由和一些库文件。这么做用户通过导航浏览效果很好<br />
初始化页面还有两个请求，一个请求路由，一个加载当前内容。<br />

#### 2.5 多页
多页：当编译一个多页面的app时，想着页面之间共享代码，只要和多个入口文件一起编译就好 <br />
 在插件中添加一个共用插件new CommonsChunkPlugin("commons.chunk.js"); <br />
 入口文件中重复的js文件会统一放在这个commons.chunk.js里。 例如：<br />
```
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        p1:"./page1",
        p2:"./page2",
        p3:"./page3",
        ap1: "./admin/page1",
        ap2: "./admin/page2",
    }
    output: {
        filename:"[name].js"
    }
    plugins: [
        new CommonsChunkPlugin("admin-commons.js",["ap1", "ap2"]),
        new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
    ]
};
```
可以初始化很多个块chunk，也可以堆叠块 <br />

### 3 loader用法
[css-loader官方配置](https://webpack.js.org/loaders/css-loader/#root)
**举例css-loader** 使用用法，webpack新版 3.0及以上 <br >
在rules 内可以添加loader，每个loader有自己的输入和输出 输入一版为css、less、sass文件，输出一版为js文件 <br >
webpack 主要功能是把 样式文件转换成webpack可以识别的 js文件， <br >
css-loader的主要功能就是把css转为js，可以自动添加前缀，自动分块自动打包模块化样式， <br >
less-loader sass-loader会把预处理类型的文件先处理成css文件， <br >
在module中可以添加 use ，use中loader的顺序是处理预发布文件的顺序，从右往左一次递进，最后输出是js文件 <br >
为了将打包后的样式做区分，可以给class名添加**hash**值做版本区分，添加**localIdentName**参数可以实现。 <br >
```
{
    loader: "css-loader",
    options: {
        modules: true,
        localIdentName: "[local]___[hash:base64:5]",
        importLoaders: 1,
    }
}
```

### 其他
#### 3, 遇到的坑
#### 3.1 npm 不能用
npm config set prefix 这个npm指令如果执行不成功 npm 就会停止工作 解决办法 找到系统盘下的用户 找到用户下的 npmrc 文件<br />
 删除这个文件 保留 nodejs/npm 下的 npmrc文件<br />

不知道是不是已经设置代理这个prefix 可以使用 npm config get prefix 的做法<br />
```
npm config set prefix node_global
```

#### 3.2 配置解析扩展不能为空
webpack打包提示

configuration.resolve.extensions[0] should not be empty 在配置文件中，export.module 的resolve方法里有空的条件 例如 ''
解决办法 '' 改为 '*'

#### 3.3 特殊的URL-loader
webpack解析 图片和 字体 文件，，必须使用 url-loader


## 采坑

- webpack 4.34版本 hash值格式 **md5:contenthash:hex:8** ，webpack 3.11版本 **contenthash:7**
