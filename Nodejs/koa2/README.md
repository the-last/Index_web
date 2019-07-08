## koa2 
nodejs 后台是一种高并发多IO弱cpu的后台服务
简洁的中间件，灵活的路由、log、session、进程管理等 <br />
async/await 保证异步执行程序 <br />
promise 保证异步的执行

## koa2 中间件
### 1 中间件逻辑顺序
 use middleware **类似过滤器，在服务器和应用程序之间处理请求和响应。** 
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

### 2 koa为什么会使用这种中间件模式呢 ？
- koa 可以解决什么问题
举个栗子，如果想获取请求穿过中间件的时间，需要执行一次回调callback。 <br />
例如在 **express** 中,response-time的源码，通过监听header被写回 write out 的时候后触发回调函数计算时间。 <br />
使用callback的方式在下一个中间件执行完成之后触发callback，并把计算的结果返回给上一次调用的中间件，这样会执行很多回调，<br />
写很多callback，影响代码阅读，写起来费劲。

- koa 的解决方式是什么样的
它很好的解决了这个callback执行很多回调的问题。解决**复杂应用****中，级联回调而设计的级联代码，**并没有把控制权完全交给下一个中间件。<br />
next() 函数可以保留当前执行环境的能力，在调用next时，koa会把执行环境转移到下一个中间件。<br />
类似递归的调用函数，一路过去next也会执行很多操作，比如重新修改context属性等，到最后一次next往回执行中间件，<br />
这样就可以很好的规避掉callback的陷阱，这也是被定义为剥洋葱的原因。
**总的来说，就是级联回调保持当前执行环境（其实就是 async、await的封装）**

### 3 koa-常用的一些中间件

#### 3.1 koa-bodyparser
类似 express body-parser，koa有 koa-bodyparser <br />
可以在代码中直接使用 ctx.request.body 进行获取POST请求参数，很方便。<br />
```
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
 
const app = new Koa();
 
app.use(bodyParser());
 
app.use(async (ctx, next) => {
    if (ctx.path === "/" && ctx.method === "POST") {
        // 使用中间件后 ctx.request.body 属性自动加上了 post 请求的数据
        console.log(ctx.request.body);
    }
});

app.listen(3000);
```

#### 3.2 koa-router
一般接口路由的写法。 <br />
```
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

// 读文件
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
// 批量处理接口
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
```

koa-router写法上引入es6的**async/await**更直观。<br />

可限制请求方式(methods)，比如 **allowedMethods** <br />
allowedMethods 对允许请求的方式添加了限制 如果设置为GET，使用POST访问相同路径会报错。<br />
[allowedMethods详解参考](https://github.com/ZijianHe/koa-router/tree/master#module_koa-router--Router+allowedMethods "方法主要说明")
```
app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}));
```

#### 3.3 koa-better-body
相比 bodyparser 会有更好的 参数解析能力，可以提供upload文件上传功能，文件参数自动添加到了 fields 上。 <br >
koa-better-body 的主要功能就是将表单上传的文件存入本地指定的文件夹下。 <br >
```
const Koa = require("koa");
const betterBody = require("koa-better-body");
const convert = require("koa-convert");
 
// 可以将 koa1.x 版本的中间件转换成 koa2.x 版本使用
app.use(convert(betterBody({
    uploadDir: path.resolve(__dirname, "upload")
})));

```

#### 3.4 koa-views
服务端渲染页面的中间件，
```
// 加载模板
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use( async ( ctx ) => {
    let title = 'hello koa2'
    await ctx.render('index', {
        title
    })
})



```

#### 3.5 koa-static

