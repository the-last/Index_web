## 后台开发框架比较 

### koa express 比较
koa2比较精简，提供context沟通，增强了参数传递时效性，提供灵活的中间件扩展，使用的是 async/await 的语法，更能直观的辨别数据处理过程 <br >
koa2 关键两个API **context next** <br>
### context 提供完整上下文
### next 
原型是异步的执行代码，保留当前执行环境，await会等待一些操作完成之后继续后续代码的执行，也是 next 模式剥洋葱的原理。 <br >

koa1 也提供中间件扩展，使用的是generator/yield <br >
express 采用回调函数的形式，没有提供方便的context的接口，需要很多手动处理也不提供洋葱模型扩展中间件，但是express内置了大多数的中间件 <br >

