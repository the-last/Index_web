## 序列化接口的应用
JSON 是存储和交换文本信息的语法，是*JavaScript Object Notation* **js对象表示法** 的简称 JSON .<br >
### 深拷贝
```
const newObj = JSON.parse(JSON.stringify(obj)); // 简洁高效
```
但是，JSON处理对象种的 function 类型属性时，默认丢弃不做处理。 <br >
这个和预期的不一样，好在 .stringify .parse 接口提供了第二个参数val，我们按类型处理并返回 <br >

### JSON.stringify 改进
```
const newJSON = JSON.stringify(json, (key, val) => {
    if (typeof val === 'function') { // 因为函数可以直接转字符串，js有点任意门
        return val + '';
    }
    return val;
});
```

### JSON.parse 改进
```
const newParse = JSON.parse(string, (key, val) => {
    if (val.indexOf && val.indexOf('function') > -1) {
        return eval(`function(){return ${string}}()`);
    } else {
        return val;
    }
})
```

### 注意
JSON序列化，**对对象的Symbol类型key不会被输出！** <br>
JSON序列化，**对正则的RegExp的类型会返回{}** <br >
可以另做处理。