void 0 === undefined // true why?

#### 为什么不直接写 undefined ？
在IE5.5~8的浏览器，如下声明有效合法
```
var strangerUndefined = undefined;
undefined = 1;
console.log(typeof strangerUndefined === 'number') // true IE5.5~8
```

#### 为什么用 一元运算符 void 0 ？
因为 void 0 === undefined 恒等于。
void运算符在js中 ，不管后面是数字几，只会返回单纯的 undefined
void后面跟含有getter属性的函数，会进行调用
```
var dd = {
  a: 90,
  get view() {
    console.log(this.a);
    return this.a++;
  }
}
var cc = void dd.view // 90  void 会执行计算
cc // undefined
dd.a // 91 
```
#### 总结其他可以 undefined 的写法
```
var abc; // undefined
var abd = function () {}
var abc = abd(); // undefined
var undefined1 = {}[''];
var undefined2 = [][0];
```
