*前端写样式使用预处理语言开发，是最有效的和方便维护* <br >
下面解释下在 less 预处理样式开发中遇到的几个问题，以便后续开发参考 <br >

### 1 mixin & include & extend

#### @mixin
mixin 可以声明函数 并且会返回新的样式组合，相当于样式组合工具 <br>
可以声明多个重名的 mixin函数，参数可以不同，并且在调用的时候，会根据传入的参数个数匹配调用最合适的 mixin函数 <br >
mixin 中可以使用 @if 关键字按照条件返回合适的样式 <br>
mixin 语句可以声明函数或者变量，声明函数时，可以使用when关键字 <br >
```
.mixin (@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
```
mixin 可以是已有的样式，使用方式可以加()或者不加 <br >
可以给 mixin 加 !important 相当于是作用在普通样式上 <br>

#### @include
include 相当于函数的调用，或者是变量的引用，可以使用已有样式，或者使用mixin声明的样式函数返回的样式，样式只在当前作用域生效，且不影响其他样式产出结果。  <br >

#### @extend
有作用域，在 @media中使用，只会作用于当前 media，使用当前media内的样式 <br >
extend 相当于给当前样式的子样式 <br >
通常用在 & 父选择器，样式，id选择器的后面，作用是扩展子类样式 <br >


### 2 @import 的几种引入方式

**@import 默认引入less方式读取，出css之外：**
example:<br >

- @import "foo";      // foo.less 导入为less文件 <br >
- @import "foo.less"; // foo.less 导入为less文件<br >
- @import "foo.php";  // foo.php  导入为less文件<br >
- @import "foo.css";  // 语句保持原样，导入为css文件<br >

| 属性 | 作用 | 释义 |
| :------ | :------| :------ |
| reference | 使用该less文件但是不输出它 | 使用@import (reference) 导入外部文件，导入的样式不会添加到编译输出，除非该样式被引用。 |
| inline | 包括在源文件中输出，但是不作处理 | 当一个css文件可能无法被less所兼容时 |
| less | 将该文件视为less文件，无论扩展名是什么 |
| css | 将文件视为css文件，无论扩展名是什么 |
| once | 该文件仅可导入一次 (默认) | 文件只会被导入一次，后续的导入相同文件的语句会被忽略。 |
| multiple | 该文件可以多次导入 | 文件重复被引入多次 |
| optional | 当没有发现文件时仍然编译 | 避免导入不存在的less文件，如果没有这个参数会报 File Error 错误 |

举栗（可以使用多个关键字，同时生效）<br >
example: <br >
```
@import (optional, reference) "foo.less"; 
```