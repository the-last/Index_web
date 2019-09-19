## 代码上不同的实现
#### 闭包 <br> 
```
function fun() {
    var name = "hello world!";
    function display() {
        alert(name);
    }
    return display;  // display就是一个闭包
}

var myfun = fun();
myfun();

```
#### 词法作用域 <br> 
```
function init() {
    var name = "hello world !";
    function display() {// display是内部函数，是闭包
        alert(name);    // 调用父级函数变量
    }
    display();
}
init();

```
**两中写法在执行效果上没有区别**
词法作用域和闭包概念有很相似的地方，需要先了解下什么是 **词法作用域** ？什么是**作用域**？


## 什么是js的作用域
每种语言都有作用域的概念，因为这样就约定了访问变量和执行函数的规范。 <br >
作用域也是一种规则，作用域就是变量与函数的可访问范围，如何查找变量，能找到变量表示在作用域访问内 <br >

作用域还可以分成：**当前作用域，局部作用域，嵌套作用域，全局作用域，还有es6块级作用域**，这些作用域就是函数执行是访问变量的地方 <br >
优先级从内到外： **当前作用域、块级作用域、局部作用域（分情况讨论，离函数最近的值优先访问），嵌套作用域、全局作用域（属于外层作用域）** <br >
这就是作用域链
```
function fn () {
    var n = 1;
    a = 10;
    return a;
}
console.log(fn()); // 10
console.log(a); // 10
console.log(n); // undefined
```

内部变量提升可能会影响外部变量
```
var n = 5;
var m = 10;
function fn() {
    console.log(n);
    console.log(m);
    if (true) {
        var n = 10;
        m = 20;
    }
}
fn(); // undefined 10;  关键字var function 才会引起变量提升
```

## 什么是词法作用域
词法作用域是作用域的一种工作模式，词法作用域就是在写代码时将变量和块作用域写在哪里来决定，也就是词法作用域是静态的作用域，写在哪里在哪里执行

以下代码有3个作用域。
```
// 一级作用域只有 fn1
function fn1(x) {
    // 二级作用域 x y fn2
    var y = x + 1;
    function fn2(z) {
        // 三级作用域 z
        console.log(x,y,z);
    }
    fn2(y * 5)
}
fn1(1);
```

## 什么是闭包
访问函数内部变量的函数称为闭包。
运行环境会保留闭包所引用是变量和执行环境，因此会占用内存空间。

闭包引起的一些误会。
#### 1 变量发生了变化

```
function outer() {
    var result = [];
    for (var i = 0; i<10; i++){
        result[i] = function () {
            console.info(i)
        }
    }
    console.log(result + '');
    // 打印是一模一样的
    // function () {
    //     console.info(i)
    // }
    // 这里是用的outer作用域内的同一个 i值，所以打印 10 个 10
}
```
// 使用闭包改造outer
```
function outer() {
    var result = [];
    for (var i = 0; i<10; i++）{
        result[i] = function (num) {
            return function() {
                console.info(num); 
            }
        }(i)
        // 每次执行都会返回一个新的函数体作用域，函数未执行，num不会发生变化。
    }
    return result
}
```
#### 2 this 执向的问题
```
var object = {
     name: ''object"，
     getName： function() {
        return function() {
             console.info(this.name)
        }
    }
}
object.getName()() // undefined 返回的函数是在window下执行
```

#### 3 内存泄漏问题
```
function  showId() {
    var el = document.getElementById("app")
    var id  = el.id
    el.onclick = function(){
      console.log(id)   // 这样会导致闭包引用外层的el
    }
    el = null    // 主动释放el元素节点
}
```

#### 4 模拟块级作用域
```
(function () {
    for(var i=0; i<10; i++){
         console.info(i)
    }
})()
console.log(i); //undefined
```
