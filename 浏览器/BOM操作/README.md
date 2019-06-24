
## 1 有关BOM操作
documentElement 代表 html标签，代表页面的根节点 <br />
body  代表 body元素 body标签 <br />

**鼠标滚动一次的高度差不同** 
- 在 Chrome   上是 100 px  <br /> 
- 在 Firefox  上是 132 px  <br />
- 在 IE11     上是 55px    <br />

## 2 兼容不同模式下的dom
代码如下：
```
var html;

if (document.compatMode == 'BackCompat')  // 非标准模式 (ie5)
html = document.body

if (document.compatMode == 'CSS1Compat')  // 标准模式
html = document.documentElement
```

### 2.1 可视窗口大小
```
window.innerHeight                        // 标准浏览器及IE9+  
document.documentElement.clientHeight     // 标准浏览器及低版本IE
document.body.clientHeight                // 兼容低版本混杂模式
```

### 2.2 滚动的距离 也是浏览器窗口顶部到文档顶部的距离
```
window.pageYoffset                       // 标准浏览器及IE9+
document.documentElement.scrollTop       // 标准浏览器及IE低版本的标准模式
document.body.scrollTop                  // 兼容低版本混杂模式
```

### 3 文档实际高度 
```
// 取最大值
var h = document.documentElement   
var b = document.body
return  Math.max(h.scrollHeight, b.scrollHeight)  // 实际内容高度
```
