# for 循环中的异步取值问题

## var 声明变量
```
for (var t1=0;t1<4;t1++){
   setTimeout(function(){console.log(t1)}, 1000)
}
// 4 4 4 4
```
```
for (var t1=0;t1<4;t1++){
   setTimeout(()=>{console.log(t1)}, 1000)
}
// 4 4 4 4
``` 
```
for (var t1=0;t1<4;t1++){
   (function(){
      setTimeout(()=>{console.log(t1)}, 1000)
   })(t1)
}
// 4 4 4 4
```
```
for (var t1=0;t1<4;t1++){
   (function(w){
      setTimeout(()=>{console.log(w)}, 1000)
   })(t1)
}
// 0 1 2 3
```

## let 声明变量
```
for (let t1=0;t1<4;t1++){
   setTimeout(()=>{console.log(t1)}, 1000)
}
// 0 1 2 3
```
```
for (let t1=0;t1<4;t1++){
   setTimeout(function(){console.log(t1)}, 1000)
}
// 0 1 2 3
```
```
for (let t1=0;t1<4;t1++){
   (function(e) {
     setTimeout(function(){console.log(e)}, 1000)
   })(t1);
}
// 0 1 2 3 
```
