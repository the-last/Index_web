
函数柯里化  函数重入的用法  结合函数.bind 的相关使用。

# 函数柯里化
- 函数柯里化概念和优点
- 函数柯里化实现的方式
- bind() 函数和柯里化的关系

## 函数柯里化概念和优点

- 概念
函数

-优点

## 柯里化方法的实现方式

```

var origin = function (x,y) {
    return x + y;
} 

// origin(10, 20)

var curry = function (x) {
    return function (y) {
        return x + y
    }
}

// curry(10)(20);

var person = function (name) {
    return function (attr) {
        console.log('我需要'+name+attr+'的信息');
    }
}

var xiaogao = person('主席');
xiaogao('年龄'); // 我需要 主席 年龄 的信息
xiaogao('身高'); // 我需要 主席 身高 的信息

```
- 以上代码表示函数的重入，参数传递的延迟，保持了之前的一部分信息或计算结果。
- 方便在在接口的封装时参数的重入传递，函数调用和编写更高效。

## bind() 函数和柯里化的关系
- bind返回一个新的改变了执行环境this和参数的函数，未执行。
- bind函数输入js内置方法，函数可以调用，每个函数都可以。
- bind不破坏原始函数接受的参数个数和类型。
- bind可以扩展变量，新的函数的变量长度等于实际输入的参数个数。
- bind对于用bind生产的函数也适用，但是不会改变原始函数的传参形式，但是会基于新的函数环境。

```
var t = function (a,b,c,d,e) {
    console.log(a,b,c,d,e);
    console.log(arguments.length);
    console.log(Array.from(arguments)[arguments.length-1]);
}

直接取到的参数永远只有前5个参数，一致性。
不在原始函数参数中标明的可以通过arguments获取，可获取。

```
- 关于bind 函数柯里化的应用

```
function person (x) {
    this.name = 'xiaowang';
    this.info = function () {
        return this.name + x;
    }
}

var newInfo = {
    name: 'xiaoli'
}

var info = new (person.bind(newInfo, 250));

console.log(info.name);    //xiaoli
console.log(info.info());  //xiaoli 250 

<!-- 重定义info函数的this -->

var other = info.info.bind({name: 'config'}, 123);
other() // config 123;

```
## 无限调用的实现
```
function loop (num1) {
    this.loop.x = num1;
    function cb (other) {
        if (!other) return this.loop.x;
        this.loop.x = this.loop.x * other;
        return cb;
    }
    return cb;
}