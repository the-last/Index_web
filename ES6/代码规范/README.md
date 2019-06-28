## es6 规范编写代码注意的地方、代码风格
**基于es6规范的总结**

## 1 块作用域
#### 1.1 let 取代 var   <br />
ES6 提出了两个变量 let 和 const，let 可以取代 var 两者相同，么有副作用 <br />
双大括号，在es6中表示块级的作用域，如果使用var在块内声明变量，块之外也可以访问到变量 <br />
相当于全局变量，失去了很多语义性，其实是打算声明一个块内的变量在当前块内使用 <br />
**多用let**
```
if (true) {
  console.log(x);   // 会报错，符合先声明后使用的逻辑
  let x = 'hello';  // 如果改用var，会报undefined，因为var进行了变量的提升
}
```

#### 1.2 全局常量、线程安全问题   <br />
在let const 之间规范建议先使用 const，在全局环境应该声明的是常量而不是变量 <br />
const 优势有以下几点：
##### 1 语义化比较好，看到知道是一个常量，或不需要修改的量
##### 2 运算不改变值，只新建值符合函数式编程思想
##### 3 js编译器会对 const 变量进行优化
```
// 推荐赋值方式
const [a, b, c] = [1, 2, 3];
const add = function (f,s) {
    return f + s;
}
add = 90; // Uncaught TypeError: Assignment to constant variable. 
```
 **建议所有 函数都声明为 const 类型** 

## 2 字符串
所有字符串一律使用单引号，动态字符使用反撇号，符合规范，也符合json规范 <br />

## 3 结构赋值
##### 函数的参数如果传参对象时，可如下声明，传值时使用结构赋值
```
// 传值
function getFullName({ firstName, lastName }) {}

// 返回值
function processInput(input) {
  return { left, right, top, bottom };
}
```
## 4 对象
对象一旦声明，应尽量避免对象属性发生变化，如果一定要修改对象的值或属性，**推荐使用 Object.assign**！ <br />
如果对象属性是变量，应在初始化时声明变量属性，如下
```
const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,    // 初始化时 写好变量属性
};

const ref = 'some value';
// 不好的写法
const atom = {
  ref: ref,
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};
// 比较好的写法
const atom = {
  ref,
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};
```

## 5 函数
##### 尽量多使用箭头函数， 箭头函数**取代Function.prototype.bind**，不应该用 self/ _this/ that 绑定 this
```

// 推荐写法
[1, 2, 3].map(x => x * x);
function concatAll(...args) {
    return Array.from(args);
}
function handleThings(opts = {}) {}

// 不推荐
function handleThings(opts) {
    opts = opts || {};
}

```

## 6 Map结构
Map 在语义上不同于 Object， Object表示描述一个实体，或者实例化一个对象 <br />
Map 表示一种 **映射关系**， 可以使用简单表示为 **key/value** 的关系。 <br />
Map 有两种一种是可遍历的map，一种是weakmap不提供遍历方法，其他和map用法一样 <br />
```
// set get has clear delete  常用操作
let map = new Map(arr);

// 得到所有key
for (let key of map.keys()) {
  console.log(key);
}

// 得到所有value
for (let value of map.values()) {
  console.log(value);
}

// 得到所有 key value
for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
```

