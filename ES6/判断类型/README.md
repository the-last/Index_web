## 判断类型的方法
### 1 typeof
- undefined <br >
- function <br >
- boolean <br >
- string <br >
- number <br >
- symbol <br >
- object 除此之外都是object<br >

### 2 instanceOf
- 常规用法
```
var str = 'hello';
str instanceof String;        // false 神奇不 str是字符串不是对象的实例，因为它不是实例化
var str = new String('hello');
str instanceof String;        // true
function Foo(){}
var foo = new Foo();
foo instanceof Foo;           // true
```

- 继承关系中的用法
```
function Aoo(){} ,
function Foo(){} 
Foo.prototype = new Aoo();         // 原型继承
 
var foo = new Foo();
foo instanceof Foo                 // true 
foo instanceof Aoo                 // true
```

- 多继承关系中的用法
```
function Aoo(){this.a = 10}
function Boo(){this.b = 20}
function Foo(){this.c = 30} 
Foo.prototype = new Aoo();
Foo.prototype = new Boo();

var foo = new Foo();
console.log(foo, foo.a, foo.b, foo.c);
// Foo {c: 30} undefined 20 30
// new Boo() 覆盖 new Aoo()

// 构造函数
function Parent1(){this.b = 20}
function Parent2(){this.c = 30}
function Child(){Parent1.call(this); Parent2.call(this); this.a = 10}

var c = new Child();
console.log(c.a, c.b, c.c)
// 10 20 30
```

- 复杂用法(想不到吧？)

```
Object   instanceof Object         // true 例外
Function instanceof Function       // true 例外
Number   instanceof Number         // false 
String   instanceof String         // false 

Function instanceof Object         // true 

Foo      instanceof Function       // true 
Foo      instanceof Foo            // false
```

- 为什么还有例外情况呢 <br >
1, 语言规范是如何定义这个运算符的？<br >
2, js原型链继承机制 <br >
注： __proto__ 隐式原型， prototype 显式原型 <br >
*js代码实现 **instanceof** 方法*
```
function instance_of(L, R) {
    var O = R.prototype; 
    var L = L.__proto__;

    while (true) {
        if (L === null)
            return false; 
        if (O === L) {  // 严格等于 
            return true;
            L = L.__proto__; 
        }
    }
}
// 举例：
Foo instanceof Foo;
FooL = Foo, FooR = Foo; 

O = FooR.prototype = Foo.prototype;
L = FooL.__proto__ = Function.prototype;

O != L 
L = Function.prototype.__proto__ = Object.prototype;

O != L
L = Object.prototype.__proto__ = null;

L == null;    // return false
```
- Dojo 中多重继承
```
dojo.declare("Aoo",null,{}); 
dojo.declare("Boo",null,{}); 
dojo.declare("Foo",[Aoo,Boo],{}); 
 
var foo = new Foo(); 
console.log(foo instanceof Aoo);//true 
console.log(foo instanceof Boo);//false 
 
console.log(foo.isInstanceOf(Aoo));//true 
console.log(foo.isInstanceOf(Boo));//true
```

### 3 Object.toString
```
var = new Error();
Object.prototype.toString.call(val);            // [object Error]
Error.prototype.__proto__ === Object.prototype; // true 看到这里原型链的继承关系证明了这一切
String.prototype.__proto__ === Object.prototype // true 看到这里我晕了，String不是 string类型的父类，奇葩
```

#### Error 类型种类
- SyntaxError  <br >
- ReferenceError <br >
- TypeError <br >
- RangeError <br >
