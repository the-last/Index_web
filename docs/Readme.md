# Hello world
# history-api
window自带url history模式，应用探索

## History概念

## 1，简介
- 出现在**Html4**规范中，完善在**Html5**规范中，现在浏览器的支持已经很好。
- 特点：可以在不刷新页面的情况下修改URL。
- 修改历史会被保存。
- 修改URL会有对应的回调函数。
- 历史记录维护在当前页面的一个队列中。

## 2，接口详解
- length 记录历史列表中的历史记录数，默认都是1开始的。
- go() 参数为number整型，负数是后退超过长度绝对值范围时不作出响应</br>
  参数为0时会刷新页面，但不属于强制刷新，类似location.reload.<br>
  可以接受不按照下标跳转，例如直接使用url，history.go('333.html?query');//跳到最近的333.html?query页面
- back() 后退一步，不带参数。
- forward() 前进一步，不带参数。

## 3，新增API方法
### 3.1 pushState(data, title, [url])
  往历史记录的顶部添加一条url记录；</br>
  data作为本条记录的说明，会在window.onpopstate事件触发是作为参数</br>
  传递；title是页面的说明，可以传null，**url添加基于hostname**，建议保留</br>
  原始路径在尾部添加，并保持**query风格**以免404.

### 3.2 replaceState(data, title, [url])
  参数和**pushState**一致，修改当前的历史记录。

### 3.3 state 
  存储当前历史记录的data数据，不同浏览器读写权限不同。

### 3.4 window.onpopstate 
  在调用历史记录的URL改变时，会触发onpopstate方法</br>
  当调用 back() go() forward()时</br>
  data是这个函数的参数。</br>

## 功能介绍
### 场景
  页面发送异步请求之后，数据有更新但是不需要有刷新，如果还要让用户<br>
  知道发生了什么情况，可以用history的模式修改url代替。
  
## 结合Ajax使用

- 思路: Ajax异步请求成功，数据更新之后，修改URL地址。
```
const axios = require('axios');

var urlConfig = {
    url: 'www.baidu.com',
    params: 'query=123',
    data: '相关说明信息'
}

var editUrl = function (config) {
    let urlParams = location.href.split('?')[1]
    let params = '?' + config.params
    if (pushState in window.history 
       && urlParams !== params) {
        // 跟新数据后开始修改 url
        history.pushState(config.data, null, params)
    }
}

var xhr = function (config) {
  axios.post(config.url).then(res => {
      if (res.status === 200) {
          //一些回到成功后的操作, 然后修改url
          editUrl(config)
      }
  }).catch(err => {
      throw new Error(err);
  })
}

xhr(urlConfig);   // 开始Ajax请求

```


