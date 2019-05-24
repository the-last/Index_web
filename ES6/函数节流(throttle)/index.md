## 函数节流
### 1 为什么会有函数的节流 ？

有些场景事件触发的频率过高，并且很多时候并不需要响应每次的事件触发。 <br />
回调函数执行的频率过高也会有性能问题。 可以去一段时间过后进行触发去除无用操作，或者在触发事件末尾响应。<br />
```
window.onscroll = function scrollFn(){
    console.log(1);
}
```

### 2 节流的基本实现

节流的本质是设置一个定时器，在指定时间间隔内执行回调函数，并清理上一次定时器。 <br />
《js高级程序设计》有如下的写法:
```
function throttle (method, context) {
    clearTimeout(method.tId);
    method.tId=setTimeout(function(){
        method.call(context)
    }, 300);
}
window.onscroll = function () {
    throttle(function(){console.log(1)})
}
```
还有一种写法:
```
function throttle(method, delay){
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            method.apply(context,args);
        }, delay);
    }
}
// 以闭包的形式返回一个函数，定时器变量也在函数内部
```
### 3 节流的不足
节流很像控制水管流量，一定时间内的流量，但是整体执行的次数还是不变，如果操作不停，在响应定时器之后的函数还是会不停的执行。<br />
只是在行为上延缓了函数执行。更好的做法是执行次数也应该减少<br />

### 4 减少节流情况的响应次数

