# 跨域
**项目中常用跨域方式** <br />

#  1 JSONP-跨域
关于前端跨域操作的总结


### 验证 jsonp


**jsonp 实现原理**
- 1，客户端发一起一个get请求
- 2，使用script标签模拟发送跨域的get请求
- 3，服务端响应来自跨域的请求
- 4，客户端需要先定义一个函数，用于执行服务端返回的回调函数
- 5，请求将函数名发送给服务端的指定接口
- 6，服务端收到函数名，然后重点来了，返回给前端的是段代码，一个带参数的可执行函数。
- 例如： callbackFunction('nidayed jsonp!')；
- 7，客户端获取到这段代码就会执行函数-callbackFunction(),且参数就是后端赋的值！
 
**不足之处**
- 传递数据需要创建标签，在项目开发中建议使用CORS策略进行，注意在服务端加一些限制。
- 只能使用get请求
**前端代码：**
``` 
function callbackfunction (callbackdata) {
    console.log(callbackdata, '跨域访问的返回值');
}
var url = "http://localhost:3001/hello/callbackfunction";   
var script = document.createElement('script');
script.setAttribute('src', url);
document.getElementsByTagName('head')[0].appendChild(script);
```

如果是jquery发送的ajax，后台res响应可以jsonp方法，res.jsonp(data) 的形式。<br>
如果是axios的做异步请求，使用axios-jsonp插件，使用方式和 res.jsonp(data)形式相似。<br>
详见npm在线文档。
 
 **后端代码：**
 使用**express4.0**实现的单个接口为例。
 ```
 app.get('/hello', function (req,res,next) {
  let callback = req.query.callback
  let obj = {
    att: 'finish',
    ayy: 'nifish'
  }
  let str = JSON.stringify(obj);
  res.send(callback + `(${str})`);
});

 ```

# 2 window.name 跨域

### window.name 特性

- 1，window.name 在 iframe标签中可以长期不变的保持，
- 2，同一域名下可以调用，父级iframe不能访问子级iframe窗口。
- 3，url改变window.name 保持不变
- 4，window.name 存储值的大小为 2Mb
- 5，存储的类型有限制：<br>
  **可接受的类型**：String, Array, Number, Boolean, Null, Undefined；
  但返回值会自动转为字符串类型，建议传递使用JSON 序列化方法。 <br>
  **不可接受的类型**：Object；传递对象，会返回'[Object Object]'。

window.name 具有的以上特定，已表明它具备跨域请求的条件。

#### window.name 跨域实现

- 后端代码  cross.html  后端辅助页面

```  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div>目标域的页面！</div>
</body>
<script>
    (function () {
        let crossResponse = {arr: [1,33,32]};
        crossResponse = JSON.stringify(crossResponse);
        window.name = '' + crossResponse
    })()
</script>
</html>

<!--

目标服务器
需要给页面增加name值，返会有name值的页面

-->
app.get('/crossDomain', function (req, res) {
  res.sendFile(__dirname + '/src/cross.html');
})

```

- 前端代码 本地服务
**iframe.contentWindow.name**
```
<body>
  <div class="block">
    <h2>当前页面将通过 window.name 的方式进行跨域请求</h2>
    <button id="startAccess">开始跨域请求</button>
  </div>
</body>
<script>
  window.onload = function () {
    var btn = document.querySelector('#startAccess');
    var aimUrl = 'http://localhost:3001/crossDomain';
    btn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = aimUrl;
      var element = document.getElementsByClassName('block')[0];
      element.appendChild(iframe);
      iframe.addEventListener('load', function () {
        iframe.src = './backup.html';
        console.log(iframe.contentWindow.name);
        element.removeChild(iframe);
      })
    }, false)
  }
</script>
```

# 3 CORS 跨域

#### CORS原理

__CORS全称：cross origin resource sharing__ </br>
`理解成中文就是跨域的资源共享，共享跨域的资源。当
需要请求其他域名下的资源，就需要CORS策略`

__问题：__ 在浏览器和服务器之间，当浏览器根据域名访问到网站资源，</br>
如果随后访问的内容不是媒体类型不能用标签获取，并且不在这个域名下，例如api接口</br>
这个时候就需要跨域访问接口，浏览器允许标签进行跨域，但不允许xmlhttprequest对象进行跨域</br>
跨域会受到浏览器的安全策略限制。</br>
因为所有通过浏览器建立的网络连接，都是有浏览器内核创建的http/https请求。</br>

__解决办法：__ 需要浏览器和服务器之间进行配合，浏览器向服务器询问，这个接口要跨域来访问你，是否同意？</br>
如果服务器说这个域名过来的跨域请求我同意，你可以让它建立请求。</br>
这时候，浏览器开始进行跨域访问，建立正常的ajax异步通信。</br>
随后就会遇到 withCredentials 关于客户端验证信息的问题，是否需要身份识别，是否要携带cookie等，这个和正常的ajax配置一样，不用担心。</br>

这个过程的实现需要服务器进行访问的配置，浏览器会对服务器的这些配置进行分析，客户端并不能感觉到这个略复杂的协商过程。</br>
客户端的浏览器对CORS策略的支持有一定版本的要求，目前主流浏览器基本都支持，IE10以下版本的IE不支持。</br>

#### CORS的兼容性

![cors](./src/cors兼容性.PNG)

#### CORS的实现

##### 1，CORS请求是有两种请求形式：
包括： 简单请求 ， 非简单请求

##### 2，两种方式的实现

- 1，简单请求
满足一下条件：
__请求方式是__ 只支持三种：head post get
__请求头信息__ 最多包括：
```
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type: application/x-www-form-urlencoded, multipart/form-data, text/plain
```

- 2，非简单请求
###### 非简单请求头信息
```
GET /cors HTTP/1.1
Origin: http://api.baidu.com
Host: api.alibaba.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
Access-Control-Allow-Origin: http://api.baidu.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8

```

###### 预检

CORS请求的预检请求 </br>
在进行正式的http请求之前，进行的预检 </br>
检查当前的跨域的origin是否在允许的名单里，需要哪些请求相关的信息等 </br>
可以在发送ajax的请求中设置请求头 </br>
```
var url = 'https://api.baidu.com';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();

'X-Custom-Header' 告诉服务器浏览器发送的是跨域预检请求

服务器会给出响应，如果服务器设置的是同意这个origin，回复200跨域可以继续

浏览器会收到这样的回复：
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Nginx
Access-Control-Allow-Origin: https://api.baidu.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

- 3，服务端设置，Access-Controld 的几个关键字段

###### Access-Control-Allow-Origin
必填字段，表示可以接受跨域请求的地址，可以指定 *，表示接受所有域名过来的请求，也可以设置指定域名。</br>
需要使用记录跨域站点的cookie使用cookie访问跨域的站点时，需要在站点服务器制定允许的具体的域名。
###### Access-Control-Allow-Credentials
可选字段，类型为Boolean，表示是否允许浏览器发送cookie，默认不发送，和同源的cookie设置和使用一样 </br>
对应ajax请求对象中的 withCredentials. </br>
同意浏览器发送cookie的另一个条件：
```
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```
如果浏览器发出的请求没有设置这个字段，就算服务器上设置allow，也不会发送cookie。
###### Access-Control-Expose-Headers
可选字段，用于添加response header 字段，默认的情况通过 getResponseHeader() 方法获取到</br>
Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这6个字段信息 </br>
Expose-Headers 可以在服务器响应里添加更多字段值，返回给浏览器。
###### Access-Control-Request-Method
必填字段，表明服务器支持的跨域请求方式
###### Access-Control-Allow-Methods
必填字段，表明服务器支持的所有跨域请求的方法，为了避免多次"预检"请求。
###### Access-Control-Max-Age
可选字段，表明本次预检请求的有效期，单位为秒。

#### [CORS官网](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS "MDN官方解释")

# 4 form表单
#### form表单事实上无法完成跨域，需要将表单转换成formData，使用ajax完成跨域
[form表单序列化本质上是用的ajax完成跨域请求](https://www.jianshu.com/p/63d5f0f38708 "form表单序列化")
#### form表单可以完成不同源的请求，单无法获取到返回结果，因为这可能违背浏览器同源限制的规定 ！ <br />

#### [同源限制的本质是，浏览器不同意不同域名直接进行通信，不能有信息的交换](https://www.jianshu.com/p/28ff30668259 "同源策略")；但不影响 script iframe link img 访问外部资源


