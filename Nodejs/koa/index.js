const color = require('colors/safe');
const Koa = require('koa');
const Router= require('koa-router');
// 配置接口处理路由
const router = new Router();
// 路由前缀
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