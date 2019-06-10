## React 服务端渲染

提升seo被搜索引擎收录的概率、 <br />
提升网站首页渲染加载速度、

## 已知的React 服务端渲染的方法
React 提供如下**4种api** 来实现服务端渲染出虚拟dom
```
var ReactDomServer = require('react-dom/server');
var { renderToString, renderToStaticMarkup, renderToNodeStream, renderToStaticNodeStream } = ReactDomServer;

renderToString,             // 服务端、客户端 可用
renderToStaticMarkup,       // 服务端、客户端 可用

renderToNodeStream,         // 服务端 可用
renderToStaticNodeStream    // 服务端 可用

```

- renderToString <br />
将 React 元素渲染为初始 HTML 返回 **HTML 字符串**。<br />
因此可在服务端生成 HTML，在请求时返回HTML提升加载速度，允许搜索引擎爬取页面以达到 SEO 优化的目的。 <br />


- renderToStaticMarkup <br />
与renderToString相似，但是 renderToStaticMarkup 不会在React内部添加多余的dom属性，例如 **data-reactroot** . <br />
会节省一些字节，当做 html 转换器来用。

- renderToNodeStream <br />
返回HTML文件的可读流，功能等同于 renderToString . <br />
此方法可在服务器上生成HTML，并在初始请求时将标记下发，以加快页面加载速度。 <br />
在已有服务端渲染标记的节点上调用 ReactDOM.hydrate() 

- renderToStaticNodeStream <br />
方法不会在 React 内部创建的额外 DOM 属性，例如 **data-reactroot** <br />
可以当做静态页面生成器来使用； 完全等同于 renderToStaticMarkup 的输出流。 <br />
如果要输出可交互的静态页面，可以使用服务端的renderToNodeStream 前端代码使用 ReactDOM.hydrate(). <br />

## SSR执行步骤

获取build后的入口文件  -->  配置浏览器可认识的路由转换, 状态管理，引入ReactDomServer  --> <br />
配置语法转换，使得在服务端支持ES6、jsx语法然后编译  -->  将文件编译为浏览器认识的HTML文件  -->  <br />
获取HTML文件，拼接成一个完整的html页面  -->  响应客户端请求，将首页html文件返回给客户端  --> <br />
客户端收到HTML，渲染得到首页，大幅度提升了首页的渲染效率 <br />


服务端执行环境为Nodejs，不支持ES6语法，不支持import方式引入包，不支持jsx语法 <br />
