### 几种获取对象key的方法及区别
- for-in 遍历可枚举属性，prototype 属性 <br >
- hasOwnProperty ，遍历可枚举属性 <br >
- object.keys() ， 遍历可以枚举属性 <br >
- getOwnPropertyNames()  返回可枚举属性和不可枚举属性，不包括prototype属性，不包括symbol类型的key <br >
- getOwnPropertySymbols()  返回symbol类型的key属性，不关心是否可枚举 <br >

