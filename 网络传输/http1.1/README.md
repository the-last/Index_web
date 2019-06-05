## http1.1
### 强缓存
- catch-control
    - no-cache 客户端不缓存，在更新缓存前会和服务端资源对比
    - no-store 不缓存，每次从服务端取最新的资源
    - maxAge 有效期 

### 协商缓存
服务端响应 返回 Etag  <br />
客户端请求 发送 If-None-Match  <br />
服务端会响应 判断资源有么有变化；如果变化则更新Etag 返回200，否则返回304从缓存获取。  <br />