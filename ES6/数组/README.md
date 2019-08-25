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


## 数组 扁平化方法

- 1， join()  ||  toString()
```
[3,4,[55,90, [100,200,333]]].join(',')
// "3,4,55,90,100,200,333"

[3,4,[55,90, [100,200,333]]].toString()
// "3,4,55,90,100,200,333"


function flatten (arr) {
    return arr.join(',').split(',');
}
```

- 2，递归合并
```
function flatten (arr) {
  var res = [];

  arr.map(item => {

     if (Array.isArray(item)) {
        res = res.concat(flatten(item))
     } else {
        res.push(item)
     }
  });
  return res;
}
```

- 3，有数组时，进行扩展
```
function flatten(arr) {
    while(arr.some(item=>Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
```

## 实现原生 reduce

```
Array.prototype.myReduce = function (cb, initValue) {

    const array = this;

    let acc  = initValue || array[0];

    const startIndex = initValue ? 0: 1;

    for (let i = startIndex; i<array.length; i++) {
        const cur = array[i];
        acc = cb(acc, cur, i, array);
    }
    return acc;

}
```

## reduce 实现 map
- 第一种  reduce实现
```
Array.prototype.myMap = function(cb) {
    var arr = this;

    return arr.reduce((p,c,i,arr) => {
        p.push(cb(c, i));
        return p;
    }, []);
}
```

- 第二种 for循环实现

```
Array.prototype.myMap = function(cb) {
    var arr = this;
    var newArr = [];

    for (let i =0; i<arr.length; i++) {
       newArr.push(cb(arr[i], i));
    }

     return newArr;
}
```

