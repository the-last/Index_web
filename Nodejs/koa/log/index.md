获取 log的方式 有两种中间件比较常用 log4js 、 morgan


## 两种常用的 log 日志插件 （ log4js， morgan ）

### morgan 
[morgan-npm](https://www.npmjs.com/package/morgan "开发api讲解")

**option配置更灵活方便可读性好**
- 1，以配置参数的形式 设置写入文件、log条目的过滤条件等。
```
const morgan = require('morgan');
const fs = require('fs'); 
const path = require('path');

var writeLog = fs.createWriteStream(path.join(path.resolve(__dirname,'../'), 'access.log'), {flags: 'a'});
var options = {
  stream: writeLog,
  skip: (req, res) => {
    return res.status < 200
  }
}
```

- 2，可自定义日志格式, 日志属性排列顺序，时间戳国际化等。
morgan会首先声明一个具名的格式化函数，这个格式化函数会作为morgan日志配置的参数。 <br />
```
morgan.format('newformat', (tokens, req, res) => {
  return [
    '[backend]:',
    tokens.status(req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    new Date(tokens.date(req, res)),
    tokens['response-time'](req, res)+'ms'
  ].join('  ')
})

module.exports = morgan('newformat', options)
```
app.use 使用morgan插件。

### log4js 