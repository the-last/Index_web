# 正则

## 用法实例

```
// 正则 字符串 split
'abc 123'.split(/(\s)/g);  // ["abc", " ", "123"]
'abc 123'.split(/\s/g);    // ["abc", "123"]
'helhelhel'.split(/(l)/, 7); // ["he", "he", "he", ""] 第二个参数 number返回值的最大长度


// 正则 字符串 replace
'312312.12312'.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');  // "312,312.12312"
'abc 123'.replace(/\s/g, '空格');   // "abc空格123"


// 正则 exec
const re1 = /(\&)/g;
const st1 = 'file=0&human=900&man=0';
re1.exec(st1);
// ["&", index: 6, input: "file=0&human=900&man=0", groups: undefined]
// ["&", index: 16, input: "file=0&human=900&man=0", groups: undefined]
// null
/\s/g.exec('cba 123');     // [" ", index: 3, input: "cba 123"] null


// 正则 test
/\?/.test('fff?ll=9000');
// true


// 正则 compile
const g2 = new RegExp('g')
// /g/
g2.compile(/(\d)(?=(\d{3})+\.)/g);
// /(\d)(?=(\d{3})+\.)/g


// 正则 call 
// 和String.match 调用正则 结果一样，返回第一次匹配的数组包含【匹配项，下标】
const r2 = new RegExp('e');
r2.call(this ,'de');
// ["e", index: 1, input: "de", groups: undefined]


```

*解决开发中遇到的正则问题*
## RegExp.prototype : <br >

| api | 释义 |
| :------ | ------: |
| test | 用正则测试字符串 |
| compile | 重新编译一个正则，用已知正则 |
| exec | 处理字符串全部符合条件的段知道最后，注意正则需要是表达式的变量，需要加/g表示全局 |

## String   可以用正则的 prototype : <br >
| api | 释义 |
| :------ | ------: |
| replace | 替换掉符合规则的部分，用第二个参数 |
| match | 执行一次匹配返回值有匹配值、下标、目标值，和exec执行一次的结果一致 |
| search | 返回首次匹配到的下标 |
| split | 返回数组，并根据是否需要保存，返回有不同值的数组 |

## 细节
 ^ 表示非 或是 以某规则开头 <br >
 $ 是以某规则结尾<br >
 *零或多个<br >
 +1或多个<br >

## 是否保存
| 规则 | 作用 |
| :------ | ------: |
|(R)     | 保存匹配的量 | 
|(?:R)    | 不保存匹配的量(不写也不保存，可在必须用括号时用到) | 

## 前瞻
| 规则 | 作用 |
| :------ | ------: |
| (A)?=(B) | 目标是符合 B 的 A  | 
| (A)?!(B)  | 目标是不符合 B 的 A | 

## 后顾
| 规则 | 作用 |
| :------ | ------: |
| (?<=B)(A)  | 目标是符合 B 的 A | 
| (?>!B)(A)  | 目标是不符合 B 的符合 A  | 
