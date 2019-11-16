## 节流&防抖

### 函数节流-教材版本
来自 《JavaScript高级程序设计》
```
浏览器中某些计算和处理要比其他的昂贵很多。
例如，DOM操作比非DOM操作需要更多的内存和CPU。
连续尝试过多的DOM操作可能会导致浏览器挂起，有时候甚至会崩溃。
尤其是在监听 onresize 事件时更容易发生，高频的触发事件会让浏览器崩溃。
所以，您可以使用 定时器实现对函数的节流。
```

函数节流的基本思想是，**某些代码不可以在没有间断的情况连续重复执行**。 <br>
第一次调用函数创建一个定时器，在指定的时间间隔之后运行代码。<br>
第二次在调用这个函数清除前一个定时器，在设置另一个定时器。<br>
目的是只是在执行函数的请求停止了一段时间后才执行。<br>
推荐写法： <br >
```
function throttle(method, context) {
    clearTimeout(method.timeId);
    method.timeId = setTimeout(function() {
        method.call(context)
    }, 100);
}
```


### 1 防抖

有些场景事件触发的频率过高（mousemove onkeydown onkeyup onscroll） <br />
回调函数执行的频率过高也会有卡顿现象。 可以一段时间过后进行触发去除无用操作。<br />
**防抖原理：**<br>
一定在事件触发 n 秒后才执行，如果在一个事件触发的 n 秒内又触发了这个事件，以新的事件的时间为准，n 秒后才执行，等触发事件 n 秒内不再触发事件才执行。<br>


#### 第一版
```
function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
// 以闭包的形式返回一个函数，内部解决了this指向的问题，event对象传递的问题。
```

#### 第二版
首次触发事件执行，之后再开始执行防抖逻辑。
```
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        
        if(timeout) clearTimeout(timeout);
        // 是否需要在第一次触发事件的时候就执行
        if (immediate) {
             var callNow = !timeout;
             timeout = setTimeout(function() {
                 timeout = null; 
             }, wait);
             if (callNow) {
                 func.apply(context, args)
             }
        } else {
             timeout = setTimeout(function() {
                 func.apply(context, args);    
             }, wait);
        }
    }
}
```
#### 第三版
获取函数返回值
```
function debounce(func, wait, immediate) {
    var timeout, result;
    return function () {
        var context = this, args = arguments;
        if (timeout)  clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function() {
                result = func.apply(context, args)
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                result = func.apply(context, args)
            }, wait);
        }
        return result;
    }
}

```

#### 第四版
取消防抖，添加静态方法 **cancel**
```
function debounce(func, wait, immediate) {
    var timeout, result;
    function debounced () {
        var context = this, args = arguments;
        if (timeout)  clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function() {
                result = func.apply(context, args)
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                result = func.apply(context, args)
            }, wait);
        }
        return result;
    }
    debounced.cancel = function(){
        cleatTimeout(timeout);
        timeout = null;
    }
    return debounced;
}

```
防抖函数的演化进程：**this event 绑定的问题 --> 立即触发问题 --> 返回值问题 --> 取消防抖问题** <br>

### 3 节流
如果持续触发事件，每隔一段时间只执行一次函数。<br />
根据首次触发，或者最后一次触发有不同的写法。 <br>

#### 第一版
使用时间戳触发
```

```

