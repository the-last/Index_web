## 暂时性死区
块级作用域内,存在let声明的变量，这个变量会binding这个作用域，不再受外部作用域影响。<br />
不能在块级作用域内let之前给变量赋值
```
if (true) {
  tmp = 'abc';
  let tmp;
}

var aa = aa; // undefined
let aa = aa;   // 未初始化不可访问
const aa = aa; // 未初始化不可访问
// 在let 声明之前给变量赋值会报 在初始化之前无法访问 的错误
// Uncaught ReferenceError: Cannot access 'tmp' before initialization
```
##### ES6 明确规定，如果块作用域内存在let和const声明的变量，这个块对这些变量会形成封闭作用域。
**let、const不会变量提升**。在let、const之前不可访问！<br />
这个区域都称为 **暂时性死区(TDZ temporal dead zone)** <br />
