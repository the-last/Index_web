
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


// 字符串 slice 
'hello'.slice(start, end); // 按下标取字符 start开始算，到end之前结束

