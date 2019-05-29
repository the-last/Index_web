
// 验证 jsonp

/**
 * 前端代码：
 * 
    function callbackfunction (callbackdata) {
      console.log(callbackdata, typeof callbackdata, 9999);
    }
    var url = "http://localhost:3001/hello/callbackfunction";
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
    使
 * 
    如果是jquery发送的ajax，后台res响应可以jsonp方法，res.jsonp(data) 的形式
    如果是使用axios-jsonp插件，同上。
 */

 /**
  * 后端代码：
  * 可用koa中间件，或者express回调函数的形式
  */

app.get('/hello', function(req, res, next) {
    let callback = req.query.callback
    let obj = {
            att: 'finish',
            ayy: 'nifish'
        }
        // var str = fs.readFileSync(__dirname + '/src/video/videoDemo.mp4').toString();
    let str = JSON.stringify(obj);
    res.send(callback + `(${str})`);
});