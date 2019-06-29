## 原生API合并数组的方法。

- 1 *concat*   <br >
combine = a.concat(b); // a b 数组合并 <br >
combine是新数组 包含 a、b数组的值，并且有先后顺序 <br >
任意修改 a 、 b 数组中的值，如果是引用类型变量，combine中的值会变, 如果是基础类型不会，反过来修改也是可以 <br>
说明concat的方式使用上是 浅拷贝 <br >
concat 参数可以有多个数组变量
```
var a1 = [], a2 = [], a3 = [];
var combin = a1.concat(a2, a3);
```

- 2 *push.apply* <br >
Array.prototype.push.apply(a,b); // a 会是新的数组并包含b，b不变； 对b的修改也会影响a，属于拷贝关系。 <br >
参数只能有两个，在第二个参数之后的数组不会被合并！ <br >

- 3 扩展方式  <br >
combine = [...a, ...b]; // 以数据扩展的方式，合并数组官方推荐的数据合并方法 <br >

- 4 Reduce / push  && reduceRight / unshift
```
var combine = b.reduce((pre, cur) => {
    pre.push(cur);
    return pre;
}, a);
```