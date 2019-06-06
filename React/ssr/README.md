## React 服务端渲染

提升seo被搜索引擎收录的概率、 <br />
提升网站首页渲染加载速度、

### SSR  
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

