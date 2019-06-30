# 对象的拷贝 循环引用
在js编程的过程中常常会遇到处理对象，数组这样的数据结构，js为了方便管理变量，声明了6中基本类型，和其他引用类型 <br >
基本类型的值在深拷贝和浅拷贝时，都会开辟新的栈存储值，新的拷贝对象值的修改不会影响之前对象。 <br >
*拷贝对象主要有两种方式*
- 深拷贝 <br >
- 浅拷贝 <br >
## 1 为什么会有深拷贝和浅拷贝的区别 ？
因为js的类型分为*基本类型*和*引用类型*，基本类型是保存栈内存中，及时高效的变量 <br >
引用类型是保存在堆内存中，当要把一个对象拷贝一份时，实际上是将这个引用类型在栈内存中的引用地址复制了一份，一个指针 <br >
两个变量实际上是指向同一个地址，所以我们在改变拷贝对象的时候原来对象中的引用类型也会改变。<br >
**所以，深拷贝和浅拷贝只发生在引用类型中**

## 2 这两种方式的主要区别 ？
### 2.1 层级
浅拷贝，只会将对象属性依次复制第一层属性，不会递归复制 <br >
深拷贝，复制目标对象内的所有属性 <br >

### 2.2 是否开辟新的栈
浅拷贝，如果是基本类型会复制，如果是引用类型会复制地址  <br >
深拷贝，如果是基本类型会复制，如果是引用类型会开辟新的栈地址，储存新的属性 <br >

## 3 实现浅拷贝的几种方法
### 3.1 数组
- concat()       // 多个参数 <br >
- push.apply()   // 单个参数 <br >
- slice.apply()  // 单个参数 <br >
- from()         // 处理 arguments，set 等 <br > 
- new Set        // 基本类型可以去重，然后from转数组 <br >
**还有map reduce for-in等等** 

### 3.2 对象
obj3 和 obj1 的值会在assign之后都变为合并后的新对象，obj2不变。 <br>
assign 语义 将后面的对象应用到前面的对象，返回改变后的对象 <br >
assign 的第一个参数会被当成目标被合成对象，这个对象会被更新，包括新增属性和已有属性更新。 <br >
```
const obj3  = Object.assign(obj1, obj2); 
```

## 4 深拷贝
### 4.1 JSON 
JSON 可以序列号指定对象,并还原这个对象，在还原对像时会分配新的内存空间，达到了深拷贝的目的在项目开发中常用。 <br >
- $.extend <br >
- lodash.cloneDeep <br >

### 4.2 递归
**递归访问类型为对象的属性**
```
function deepCopy(obj) {
    let result = {},
        keys = Object.keys(obj),
        key,
        temp;
    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        temp = obj[key];
        if (temp && typeof temp === 'object') {
            result[key] = deepCopy(temp);
        } else {
            result[key] = temp;
        }
    }
    return result;
}
```
### 4.3 循环引用
#### 4.3.1 父级循环引用
当对象的属性，某个属性引用了对象本身，称为父级循环引用。 <br >
```
const obj1 = {
    x: 1,
    y: obj1
}  // 递归拷贝方法会爆栈
```
改进深拷贝方法。
```
function deepCopy2 (obj, parent = null) {
    let result = {},
        keys = Object.keys(obj),
        key,
        temp,
        _parent = parent;
    while(_parent) {
        if(_parent.originParent === obj) {  // 如果子对象obj是对之前父级对象的引用则直接返回
            return _parent.currentParent;
        }
        _parent = _parent.parent;
    }

    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        temp = obj[key];
        if (temp && typeof temp == 'obj') {
            result[key] = deepCopy2(temp, {
                originParent: obj,
                currentParent: result,
                parent: parent
            })
        } else {
            result[key] = temp;
        }
    }
    return result;
}
```
#### 4.3.2 同级循环引用
如果是 同级对象之间有相互引用，经过上面的改进方法深拷贝，会出现相同对象的引用返回结果不相等的情况 <br>
```
const obj = {
    a: 20,
    d: {
        age: 28,
        name: 'last'
    },
    c: {}
};
obj.c.d.e = obj.d;
consle.log(obj.c.d.e === obj.d);   // true
const objcopy = deepCopy2(obj);
consle.log(objcopy.c.d.e === objcopy.d);   // false ？？? 拷贝之后同一个引用值变动不相等了
```
需要改进父级循环引用深拷贝的方法 <br >
```
function deepCopy3 (obj) {
    let map = new WeakMap();  // 相比Map会简洁一些
    function dp(obj) {
        let result = null,
            keys = Object.keys(obj);
            key,
            temp,
            existObj = null;
        existObj = map.get(obj);
        if (existObj) {   // 对象中已存在的属性会直接返回
            return existObj;
        }
        result = {};
        map.set(obj, result);
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            temp = obj[key];
            if (temp && typeof temp === 'object') {
                result[key] = dp(temp);
            } else {
                result[key] = temp;
            }
        }
        return result;
    }
    return dp(obj);
}
```
