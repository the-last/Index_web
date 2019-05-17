# 浏览器常用缓存的特性

## option-cookie
describe ： about cookie option include add/edit/delete/query <br/>

大河向东流啊，天下的情侣都分手啊~
### cookie 有哪些特性
cookie是由服务端生成发送给客户端 </br>
cookie在服务端是key/value的形式，客户端也是</br>

### 为什么会有cookie？
  因为http是一种无状态的链接，客户端随时随地都可以访问服务器，这样如果频繁访问服务就会造成带宽浪费，并且每次<br/>需要用户认证很不合理，所有用将客户端信息存放在cookie中将会提交交互效率。

### 什么是http/https 无状态与无连接

#### * 无连接
  网络系统允许一台计算机在任何时刻发送数据给任何一台其它的计算机的特性。<br/>
  例如: 客户端根据url访问服务端，就是一个无连接的实例。
#### * 无状态
  客户端与服务端交互的事务处理没有记忆能力，前后两次之间并没有联系，如果下次请求需要前面的信息，就要把前面的信息<br/>重传，这样会增加链接传输的数据量，如果不需要前面的信息则传输数据就很快。如何解决需要重传才能满足服务器对信<br/>息的要求呢？后来就有了cookie和session的机制。

> keep-alive 会话，就需要和后台服务约定用于认证客户端的有效信息，这就需要添加cookie，jquery和axios在发起ajax请求的时候，自动携带cookie信息，有服务端认证之后，返回到浏览器再由浏览器存储在本地，Http-Only有后台在response.setHeader中设置。

### cookie 包含哪些信息
#### cookie包含以下属性
  name、value、domain、expires、path、size、http、secure、samesite <br/>
  name, value 为必须参数，其他属性为可选参数，path路径默认：'/'。<br/>

| 名称 | 含义 | 作用 |
| :------ | ------: | ------:|
| name | cookie名称 | 标识、取值 |
| value | cookie值 |  |
| domain | 作用的域名 | 区分不同域的cookie |
| expires | 过期时间 | 单位为ms，设置cookie过期相当于删除 |
| path | 作用路径 | 用路径区分cookie作用范围 |
| size | 单个cookie大小 |  |
| http | httponly属性 | cookie是否可被浏览器写入 |
| secure | 安全性 | 是否向服务器发送cookie，为true时https才发送cookie |
| samesite | 站点防护csrf攻击 | 可选值strict或lax |

#### cookie唯一性

###### 1、cookie可以同名
###### 2、但是不同的domain，expires，path，http代表不同的cookie。
###### 3、名称相同其他属性不同时不会覆盖，会新增一条cookie。
###### 4、相同cookie，value不同时，会重写cookie值。

#### cookie不能直接删除
  cookie是通过设置有效期来废除的，不能直接删除。

#### cookie的http-only
  只读属性，cookie的http-only是在服务端response.sethader里设置

#### same-site 防护
```
Strict是最严格的防护，有能力阻止所有CSRF攻击。然而，它的用户友好性太差，因为它可能会将所有GET请求进行CSRF防护处理。

例如：一个用户在reddit.com点击了一个链接（GET请求），这个链接是到facebook.com的，而假如facebook.com使用了Samesite-cookies并且将值设置为了Strict，那么用户将不能登陆Facebook.com，因为在Strict情况下，浏览器不允许将cookie从A域发送到Ｂ域。

Lax

Lax(relax的缩写？)属性只会在使用危险HTTP方法发送跨域cookie的时候进行阻止，例如POST方式。

例1：一个用户在reddit.com点击了一个链接（GET请求），这个链接是到facebook.com的，而假如facebook.com使用了Samesite-cookies并且将值设置为了Lax，那么用户可以正常登录facebok.com，因为浏览器允许将cookie从A域发送到B域。

例2：一个用户在reddit.com提交了一个表单（POST请求），这个表单是提交到facebook.com的，而假如facebook.com使用了Samesite-cookies并且将值设置为了Lax，那么用户将不能正常登陆Facebook.com，因为浏览器不允许使用POST方式将cookie从A域发送到Ｂ域。

注意

根据草案中所说，Lax并没有充分防止CSRF和XSSI攻击。但我还是建议先使用Lax进行一个较好的CSRF攻击缓解措施，之后再考虑是否使用Strict。

同时，需要注意，不要将所有的cookie都设置SameSite属性，因为不同的cookie有不同的用途，如果你的网站使用有会话cookie，它可以被设置为Lax属性；其他的可以设置为Strict属性。这可能是一种合适的方式
```
### cookie 特性和使用

cookie主要属性： name value domain path expires size http <br/>
不同cookie可以有相同name<br/>
cookie的唯一性由 value domain path 共同来决定<br/>

domain的值决定cookie信息可否被二级子域共享：<br/>
例如： fanyi.baidu.com 和 map.baidu.com之间只需要一次登录就能用cookie来共享登录认证信息。<br/>
如果需要cookie在多个二级域名中共享，需要设置domain为顶级域名，不能读取其他二级域名的cookie<br/>
path的值决定在服务器上的某个路径下的应用的指定cookie，有作用范围<br/>

## 对比 LocalStorage的特性
1、浏览器的大小不统一，并且在IE8以上的IE版本才支持localStorage这个属性 <br/>

2、localStorage的值类型限定为string类型，这个在对我们日常比较常见的JSON对象类型需要一些转换 <br/>

3、localStorage在隐私模式下不可读取 <br/>

4、localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡 <br/>

5、localStorage不能被爬虫抓取 <br/>

6、不同二级域名之间、主域名之间的localStorage不能互相访问 <br/>