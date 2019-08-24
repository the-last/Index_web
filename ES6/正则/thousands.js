
// 第一种，toLocalString() 
a = new Number(123123.999);
a.toLocaleString(); 
// "123,123.999"
var date = new Date();
console.log(date.valueOf());
console.log(date.toString());
console.log(date.toLocaleString());
// 1566402166623
// Wed Aug 21 2019 23:42:46 GMT+0800 (中国标准时间)
// 2019/8/21 下午11:42:46


// 第二种，正则前瞻替换，替换被选中的项，或替换被选中的边界
'312312.12312'.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');  
// "312,312.12312"

'123456.33332'.replace(/(?=(\B\d{3})+\.)/g, ',');
// 123,456.3333


// 第三种，字符串分割
function thousands(num) {
    if (!typeof num === 'number') throw new Error('It is not a number.');

    let [integer, lit] = (num+'').split(/\./g);
    integer += '';
    let result = '';

    while (integer.length>3) {
        result = ',' + integer.slice(-3) + result;
        integer = integer.slice(0, integer.length - 3);
    }
    if (integer) {
        result = integer + result;
    }
    return lit ? result + '.' + lit : result;
}
thousands(123456.3333);
// 123,456.3333

