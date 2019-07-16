## 为什么一定要绑定this呢 
```
You have to be careful about the meaning of this in JSX callbacks. In JavaScript, class methods are not bound by default.
```
官网文档中大概意思是，提示在jsx语法中this默认不会绑定到当前的class上，es6中 class 并不需要绑定this. <br >

react的class在执行前会对class解析，解析中的表达式如果有()会立即执行，返回执行后的结果。 <br >
```
<div className="App">
    <button onClick={this.handleClick()}>点我</button> // 会理解执行且只执行一次并返回结果，随后的this指向就不明确了
</div>
```
结论： 造成this执行不明的原因是react的解析方式，并不是因为class语法所以这里在react中要注意绑定当前this。