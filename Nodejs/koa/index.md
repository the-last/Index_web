## koa2 
nodejs 后台是一种高并发多IO弱cpu的后台服务
简洁的中间件，灵活的路由、log、session、进程管理等 <br />
async/await 保证异步执行程序 <br />
promise 保证异步的执行

### koa2 常用中间件
- use middleware **类似过滤器，在服务器和应用程序之间处理请求和响应。** 
以简单的方式理解koa的级联调用方式，从最外层开始到最内曾逐级调用并返回。
```
let koa = require('koa');
let app = new koa();

app.use((ctx, next) => {
    console.log(1)
    next(); // next不写会报错
    console.log(5)
});

app.use((ctx, next) => {
    console.log(2)
    next();
    console.log(4)
});

app.use((ctx, next) => {
    console.log(3)
});

app.listen(3000);
// 打印结果： 1 2 3 4 5 
```

#### koa为什么会使用这种中间件模式呢 ？
- koa 可以解决什么问题
举个栗子，如果想获取请求穿过中间件的时间，需要执行一次回调callback。
例如在 **express** 中,response-time的源码，通过监听header被写回 write out 的时候后触发回调函数计算时间。
使用callback的方式在下一个中间件执行完成之后触发callback，并把计算的结果返回给上一次调用的中间件，这样会执行很多回调，写很多callback，影响代码阅读，写起来费劲。

- koa 的解决方式是什么样的
它很好的解决了这个callback执行很多回调的问题。解决**复杂应用****中，级联回调而设计的级联代码，**并没有把控制权完全交给下一个中间件。
next() 函数可以保留当前执行环境的能力，在调用next时，koa会把执行环境转移到下一个中间件。
类似递归的调用函数，一路过去next也会执行很多操作，比如重新修改context属性等，到最后一次next开始往回执行中间件，
这样就可以很好的规避掉callback的陷阱。

#### koa-常用的一些中间件

- koa-bodyparser
类似 express body-parser，koa有 koa-bodyparser
```
npm install koa --save
npm install koa-bodyparser --save

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

app.use(async ctx => {
    // 什么都没做的时候会返回空 
    ctx.requestParser = ctx.request.body;
})

// 可以在代码中直接使用 ctx.request.body 进行获取POST请求参数，很方便。
```

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