## 1 post 与 get 方法区别
### GET请求特点
- get 请求参数显示在URL中，也因此可以给特定的查询添加页面标签，不适合存储敏感信息可能被缓存在客户端浏览器 <br>
- URL长度有限，将数据分配给服务器环境变量，约为2000字符 <br >
- 不合适传输复杂的数据结构，不方便服务器解析参数 <br >
- 可以缓存 <br>
- 主要用于获取信息 <br>

### POST请求特点
- 客户端输入的信息在URL和服务器日志中不可见 <br >
- 可以传递大量的数据在正文主体中，支持文本数据或者二进制数据，约为8M <br>
- 因为不在URL中，所以无法给特点查询添加书签 <br>
- 无法缓存 <br >
- 主要用于更新数据 <br >

## 2 content-type 有几种分别是什么作用
HTTP协议是以ascll码传输，是在tcp/ip之上的应用层规范。<br >
HTTP请求有 3个 主体，请求行、请求头、消息主体. <br >
```
<method> <request-URL> <version>
<headers>
<entity-body>
```
以上是规定的格式但是没有规定编码方式、。。 <br>
Content-type 作用告诉服务器传输消息的编码格式是什么<br>


*客户端告诉服务器客户端发送的数据类型*
#### 1) application/x-www-form-urlencoded
这种类型是form表单的默认格式，如果不设置 enctype，默认是就是这个格式提交数据. <br >
```
Content-Type: application/x-www-form-urlencoded;charset=utf-8
```
提交的参数按照url转码，？号开始，key/value组队，& 连接 <br >

#### 2) multipart/form-data
上传文件时可以使用的格式，form表单汇总 enctype设置为 multipart/form-data. <br >
常见的form-data请求如下：消息主体最后以 --boundary-- 结束 <br >
```
POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png

PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--

```
- 注： 现阶段标准，表单中enctype类型只支持两种： application/x-www-form-urlencoded multipart/form-data text/plain(很少) <br >
#### 3) application/json
目前在网络数据传输中用的最多也是最好用的信息类型  <br >
传输的信息主体是序列化后的json字符串，所以可以处理比键值对更方便的处理复杂的数据结构。 <br >
而且 特别适合RESTFUL格式的接口  <br > <br >

消息主体中application/json的格式如下： <br >
```
POST http://www.example.com HTTP/1.1 
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```
#### 4) text/xml
作为http协议传输的远程调用规范
```
POST [http://www.example.com](http://www.example.com) HTTP/1.1 
Content-Type: text/xml 
<!--?xml version="1.0"?--> 
<methodcall> 
    <methodname>examples.getStateName</methodname> 
    <params> 
        <param> 
            <value><i4>41</i4></value> 
    </params> 
</methodcall> 
```