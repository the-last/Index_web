## context（上下文） koa 框架中关键对象

### context 简介

#### context表示上下文对象。
改对象包含请求和响应两个关键的属性信息。context = request + respone  <br />
简单来说就是从请求到响应，过程中的一个描述对象。
request 包括请求的具体操作。
response 响应的相关信息

#### request 请求的操作

- request.url(ctx.url)
- request.method(ctx.method)
- request.headers(ctx.headers)

#### respone 和响应有关的信息

- response.set(ctx.set)
- response.status(ctx.status)
- response.body(ctx.body)
[Context Api概览](https://wizardforcel.gitbooks.io/koa-doc/content/4.html "api context")