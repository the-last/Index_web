## 函数节流

### 1 为什么会有函数的防抖 ？

有些场景事件触发的频率过高，并且很多时候并不需要响应每次的事件触发。 <br />
回调函数执行的频率过高也会有性能问题。 可以去一段时间过后进行触发去除无用操作，或者在触发事件末尾响应。<br />
```
window.onscroll = function scrollFn(){
    console.log(1);
}
```

### 2 防抖的基本实现

防抖的本质是设置一个定时器，在指定时间间隔内执行回调函数，并清理上一次定时器。 <br />

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

### 3 节流
在限定的时间间隔去执行相同响应函数，并不是所有事件都在延迟后执行。 <br />
类似定期采集执行事件。 <br />
不重复执行，定期间隔后执行。

```
function th(methods, delay, expries) {
    let begin = Date.now();
    let timer = null;
    return function () {
        var context = this, args = arguments;
        var current = Date.now();
        clearTimeout(timer);
        if (current - begin > expries) {
            methods.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(() => {
                methods.apply(context, args);
            }, delay);
        }
    }
}
window.onscroll = th(callback, 200, 600); // 延迟 200ms 后执行，600ms 间隔收集一次执行事件
```

## 区别
节流是间隔一段时间响应一次 <br >
防抖是到同类事件触发结束，只响应一次
