## 解析网络数据到页面渲染发生的过程 -
### 1 DNS解析
首先，需要获取到域名的对应IP，需要访问域名服务器，域名服务器访问流程大致如下： <br >
**查找浏览器缓存** ——> **查找操作系统缓存** ——> **查找路由器缓存** ——> **查找本地DNS缓存** ——> **递归查询** <br >
[dns解析流程]('./imgs/dns-parse.png')

### 2 TCP链接
TCP 建立链接三次握手，断开链接四次分手。<br >
tcp报文标志位的类型:
- A）URG：紧急指针（urgent pointer）有效。<br >
- B）ACK：确认序号有效。<br >
- C）PSH：接收方应该尽快将这个报文交给应用层。<br >
- D）RST：重置连接。<br >
- E）SYN：发起一个新连接。<br >
- F）FIN：释放一个连接。<br >

#### 握手过程： seq ack
1，Client将标志位SYN置为1，随机产生一个值seq=J，并将该数据包发送给Server，Client进入SYN_SENT状态，等待Server确认。<br >
2，Server收到数据包后由标志位SYN=1知道Client请求建立连接，Server将标志位SYN和ACK都置为1，ack=J+1，随机产生一个值seq=K，并将该数据包发送给Client以确认连接请求，Server进入SYN_RCVD状态。<br >
3，Client收到确认后，检查ack是否为J+1，syn是否为1，如果正确则将标志位ACK置为1，ack=k+1，并将该数据包发送给Server，Server检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功，
Client和Server进入ESTABLISHED状态，完成三次握手<br >

#### 分手过程：
1，Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。<br >
2，Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），Server进入CLOSE_WAIT状态。 <br >
3，Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。<br >
4，Client收到FIN后，Client进入TIME_WAIT_2状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。

#### 建立链接和分开链接次数不同的原因是：*ack确认* *fin完成* 不会同时发送.

### 3 发送http链接
客户端与服务器之前建立链接，收到服务器的返回比如index.html资源

### 4 服务器处理请求并返回http报文
客户端开始检查收到的index.html文件中可以建立http请求的标签，可以建立http链接的标签有link script img video audio iframe。 <br >
需要注意的是访问服务器资源，等待响应会阻塞浏览器页面渲染，可以使用defer和async新的属性，编排资源加载顺序。<br >

### 5 浏览器渲染页面
开始构建dom属性，渲染标签节点和挂载样式，生成前端页面。<br >
