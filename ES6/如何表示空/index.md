## null和undefined的区别

### Null
不同语言会有不同刚表示空值的写法或关键字。 <br />
C++ 中用NULL，Java中用null，Python中None Null；JavaScript中用 undefined null 表示空。 <br />
是一个特殊性的对象。
```
typeof null        // "object"
Number(null)       // 0
parseInt(null)     // NaN
Number(undefined)  // NaN
5 + undefined      // NaN
```

### undefined
声明一个空，js语言设计者认为不应该是或最好不是对象，于是发明了undefined表示缺少值 <br />
表示此处应该有值，但是没有定义，转换为数值时表示未定义。
- 1 变量被声明但未赋值
- 2 调用函数时，应提供的参数未提供
- 3 访问对象的属性未定义
- 4 函数没有返回值
**以上情况会出现 undefined**