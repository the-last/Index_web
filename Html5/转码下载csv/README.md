
### 数据处理
**查找Unicode字符并处理**
### - 编码 <br >
charCodeAt 返回 Unicode 编码范围是 0 - 65535 之间的整数 <br >
```
'T'.charCodeAt().toString(16); // 编码再转为 16进制
```
### - 解码 <br >
```
String.fromCharCode(parseInt('T'.charCodeAt().toString(16), 16)); // 16进制转10  从新获取编码前的字符
```
### Blob数据流 转 URL对象并下载
```
    let data = '姓名,年龄,职业\nthe-last,27,enginer\nthe-last2,28,processor'
    data = data.replace(/\\u0001/g, "\u0001");

    let compatible = "\uFEFF";
    let a = document.createElement('a');
    let blob = new Blob([compatible + data], {
        type: 'text/csv;charset=utf-8;'
    });

    a.download = 'download' + ".csv";
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(blob);

```