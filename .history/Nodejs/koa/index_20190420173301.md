## koa2 
简洁的中间件，

### koa2 常用中间件

#### koa-bodyparser
类似 express body-parser，koa有 koa-bodyparser
```
npm install koa --save
npm install koa-bodyparser --save

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

app.use(async ctx => {
    // if nothing was parsed, return empty {}
    ctx.requestParser = ctx.request.body;
})
```
可以在代码中直接使用 ctx.request.body 进行获取POST请求参数。

#### koa-router
原生 koa路由写法
```
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

function render(page) {
    return new Promise((resolve, reject) => {
        let url = `./page/${page}`;
        fs.readFile(pageUrl, 'binary', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        }); // 文件异步读取
    });
}

async function route(url) {
    let page = '404.html';
    switch (url) {
        case '/':
            page = 'index.html';
            break;
        case '/todo':
            page = 'todo.html';
            break;
        default :
            break;
    }
    let html = await render(page);
    return html;
}

app.use(async (ctx) => {
    let url = ctx.request.url(); // 解析出请求路径
    let html= await route(url);  // 按照路径返回结果
    ctx.body= html;
});

app.listen(3000, () => {
    console.log('listen on http://127.0.0.1:3000');
});
```
传统写法代码量比较可观。

koa 也有 koa-router
```
const color = require('colors/safe');
const Koa = require('koa');
const Router= require('koa-router');

const router = new Router();
// 或者添加前缀
// const router = new Router({
//    prefix: '/getversion'
// });
const app = new Koa();
app.use(router.routes()).use(router.allowedMethods());

router
.get('/', function (ctx, next) {
    ctx.body = 'main page';
})
.get('/todo', function(ctx, next) {
    ctx.body = 'todo page';
})

app.listen(3000, () => {
    console.log(color.green.bold('listen on http://127.0.0.1:3000'))
})
```
相比传统原生实现，koa-router写法上更只观。
allowedMethods 对允许请求的方式添加了限制 如果设置为get，使用POST访问相同路径会报错。