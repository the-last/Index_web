# Computed 计算属性

## 1 原理基于 Object.defineProperty 定义可观测的属性 
每个对象属性都可以被定义为 **可观测**
```
function defineProperty (obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log('我的属性被 读取');
            return val;
        }
        set(newValue) {
            console.log('我的属性被 重写');
            val = newValue;
        }
    });
}
function Observer (obj) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
        defineProperty(obj, key, obj[key]);
    });
}
const hero = Observer({
    health: 4000,
    IQ: 150
});     // hero 的属性被读取或重写时，会触发打印log，这是被观测对象触发回调的本质
```

## 2 根据已有属性获取新的属性值
