
## 原生实现 call 方法
```
Function.prototype.callback = function(firstarg, ...args) {
    
    if (!firstarg) {
        firstarg = typeof window === 'undefined' ? 'global' : 'window';
    }
    firstarg.func = this;
    let res = null;

    if (args) {
        res = firstarg.func(args);
    } else {
        res = firstarg.func();
    }
    
    delete firstarg.func;
    return res;
}
```

## 原生实现 apply 方法
```
Function.prototype.apply = function(firstArg, arr) {
    if (arr && Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new Error('第二个参数应为数组');
    }
    if (!firstarg) {
        firstarg = typeof window === 'undefined' ? 'global' : 'window';
    }
    firstarg.func = this;
    let res = null;
    
    if (arr.length>0) {
        res = eval('firstarg.func('+arr.join(',')+')');
    } else {
        res = firstarg.func();
    }
    return res;
}
```
## 原生实现 bind 方法
```
Function.prototype.bind = function (ctx, ...formerArgs) {
    const _this = this;
    return (...laterArgs) => {
        return _this.apply(ctx, formerArgs.concat(laterArgs));
    }
}

```
