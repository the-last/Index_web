## koa2 洋葱模式 代码解析
语法 <br>
基于 async/await 参见：[异步请求](https://github.com/the-last/Index_web/blob/master/ES6/async/index.js "异步等待")

## 代码实现模拟

```
const Koa = require('../lib/application');
const app = new Koa();
 
app.use(async (ctx, next) => {
  console.log('1');
  await next();
  console.log('2');
});
 
app.use(async (ctx, next) => {
  console.log('3');
  await next();
  console.log('4');
})

app.listen(8001);

// 打印结果
1 3 4 2 
从外到内，再从内到外

```

## 主要实现文件有 4个
#### 1 application.js — 定义了类，这个类定义了koa实例的方法和属性
#### 2 context.js     — 定义了proto对象，并对proto中的属性进行代理。中间件中使用的ctx对象，其实就是继承自proto
#### 3 request.js     — 定义了对象，该对象基于原生的req拓展了一些属性和方法
#### 4 response.js    - 定义了对象，该对象基于原生的res拓展了一些属性和方法