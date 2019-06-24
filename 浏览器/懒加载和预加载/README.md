# 懒加载 & 预加载

## 懒加载
### 什么是懒加载？
* 也称为延迟加载
在访问图片或者背景图之类的资源时，事先访问一张1*1px的图片，可以视为站位图。<br />
当图片出现在浏览器的可视区域内时，才会让图片显示出来.

### 为什么使用懒加载 ？
* 避免很多请求并发导致页面加载延迟
比如有大量图片的网站，如果整个页面加载完毕之后展示页面，会需要很长的时间。<br />
大量的时间浪费在了 加载图片的路上...

### 懒加载的原理
浏览器上 img 标签如果没有 src 属性或者属性值为unknown，浏览器不会发出请求去下载。<br />
通过js手动给 img 添加src属性值，浏览器会执行下载操作。真的路劲可以用h5 data-特性提前保存。<br />

### 懒加载的实现步骤
- 1 不能将图片地址放到src属性，放到其它属性(data-original)中。
- 2 页面加载完成，再scrollTop判断图片是否在用户的视野内，如果在，则将data-original属性中的值取出存放到src属性中。

### 懒加载优势
页面加载速度快、可以减轻服务器的压力、提升用户体验

## 预加载
### 什么是预加载 ？
提前加载，用户需要时从内存中获取。

### 为什么使用预加载 ？
对用户来讲，预加载会响应速度更快

### 实现方式
- 1 css js 实现方式
```
background: url(http://domain.tld/image-01.png) no-repeat -9999px -9999px; 
// js修改图片位置，视口不可见 需要展示时重新修改位置。
// js设置响应时间，preloader 在window.onload 之后执行。
```

- 2 js 实现
```
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://domain.baidu.com/preload.js');
    xhr.send('');
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://domain.baidu.com/preload.css');
    let img1 = new Image();
    img1.src = 'http://domain.baidu.com/preload.png';    // preload image.
    document.querySelector('#img1').appendChild(img1);
}
// 以此方式预加载资源

// 结合 ajax 实现
```

## 预加载 pk 懒加载
#### 加载方式
懒加载： 延迟加载、按需加载。缓解服务器压力。 <br />
预加载： 提前加载、从缓存中获取资源进行渲染，提升用户体验。 <br />
但会增加服务器压力；增加前端压力。 <br />
改用神奇先进的**http 2.0**应用传输协议，多路复用，预加载的情况肯定能得以改善。
