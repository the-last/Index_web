## Typescript 数据类型
#### 1 bool 型
```
let isSuccess : boolean = true;               // 只有 true false，返回的是boolean类型值
let isSuccessObj : any = new Boolean(true);   // 返回 Boolean 对象
```
#### 2 数值类型
所有数字都是浮点数
```
var  pricecount : number = 3.04;
var  notANumber : number = NaN;
let  hexLiteral : number = 0xf00d;
let  binaryLiteral : number = 0b1010;
let  octalLiteral : number = 0o744;
console.log(pricecount, notANumber, hexLiteral, binaryLiteral, octalLiteral);
```

#### 3 string
```
let color: string = "blue";
           color  = 'red';

let myName: string = "June";
let myAge:  number = 21;
let mySay:  string = `Hello, ${ myName }`;
// 或者是可变字符
```

#### 4 数组
```
let list: Array<number> = [1, 2, 3, 4];
let x: [string, number]; // 指定类型的声明，指明数组具体位置的类型 Tuple
    x = ["hello", 10];   // 成功
    x = [10, "hello"];   // 失败 初始化出错

```

#### 5 枚举类型
```
enum Color { Red = 2, Green, Blur }
let c: Color = Color.Green;
console.log(c);  // 3
enum Color { Red = 2, Green = 4, Black, Blue = 8 }
let c: Color = Color.Green;
console.log(c);  // 4
let d: Color = Color.Black;
console.log(d);  // 5 未设置自定递增
```

#### 6 any类型
没有指明哪种类型，而且可以在不同类型切换。
```
let notSure: any = 4;  // 可变类型
    notSure      = "maybe a string instead";
    notSure      = false;
```

#### 7 void 类型
声明变量不合适，可视为不返回值的返回类型
```
function warnUser(): void {
  alert("this is my warning message");
}
// 
```

#### 8 null undefined
这两个类型是其他类型的子类型
```
let u: undefined = undefined;
let n: null      = null;
```