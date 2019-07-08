获取 log的方式 有两种中间件比较常用 log4js 、 morgan


# 两种常用的 log 日志插件 （ log4js， morgan ）

## morgan 
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


## log4js 

这个插件有些特别，配置文件更全面，划分成了一级和二级配置。 <br />
- 配置属性
    - appender
        - category
        - type
        - filename
        - maxLogSize
        - backups
        - alwaysIncludePattern
        - pattern
    - categories
        - error
        - response
        - default
    - replaceConsole
    - levels

理解起来想各种函数的调用的集合，现在开始认识一下它。 <br />
看上去会得到更明确的log记录 <br />
- 1, 定义配置
```
let config = {
    "appenders":{          
        error: {
            "category":"errorLogger",             //logger名称
            "type": "dateFile",                   //日志类型
            "filename": errorLogPath,             //日志输出位置
            "alwaysIncludePattern":true,          //是否总是有后缀名
            "pattern": "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
            "path": errorPath  
        },
        response: {
            "category":"resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern":true,
            "pattern": "-yyyy-MM-dd-hh.log",
            "path": responsePath,
        }
    },
    "categories" : { 
        error: { appenders: ['error'], level: 'error' },
        response: { appenders: ['response'], level: 'info' },
        default: { appenders: ['response'], level: 'info' },
    }
}
```
**appenders** 是操作日志的一级配置，配置输出源，相当于一个日志处理机构。

- 2, 加载配置，输出不同类型的日志文件
维度： 日志类型(错误、响应日志)，用户

```
let log4js = require('log4js');
let logConfig = config;

//加载配置文件
log4js.configure(logConfig);

let logUtil = {};

let errorLogger = log4js.getLogger('error'); //categories的元素
let resLogger = log4js.getLogger('response');

//封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};

//封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};

```
