### 字符串分割方法

#### substring(start, stop) 
不接受负数，从 start 开始，不包括stop，不支持数组 <br>
#### substr(start, length) 
从start开始，返回length长度字符，支持负数，不支持数组 <br>
#### slice(start, end) 
从start开始，到end结束，不包括end，支持数组分割，支持负数，返回数组 <br>
#### split(separator, length)
字符按照字符串或正则分割，length表示返回的长度，不支持数组 <br>
#### jion(separator)
将数组合并成字符串，用 separator隔离，不支持字符串<br>
#### splice(start, length, ...args)
数组操作函数，不支持字符串，返回数组，从 start开始，删除的length长度，并按args参数个数添加到 start位置 <br>