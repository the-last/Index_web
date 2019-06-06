

// 读 文件流
var fs = require('fs');
var reactdomserver = require('react-dom/server');
html_ = reactdomserver.renderToStaticMarkup(`<div>测试 react组件转html文件流 </div>`);

// 创建写的数据流
var data = `<!doctype html><html>${html_}</html>`

var write = fs.createWriteStream('output.html');
write.write(data, 'UTF-8');

write.end();
write.on('finish', function () {
    console.log('写 完成');
});
write.on('error', function (err) {
    console.log(err.stack);
});