## 1, 如何将字符串 转换为 dom节点
使用 *DOMParser* 提供的 *parseFromString* api
```
let str='<h1>Interesting</h1>';
let parser = new DOMParser();
let doc = parser.parseFromString(str, "text/xml");

let node = doc.getElementsByTagName('h1')[0];

```