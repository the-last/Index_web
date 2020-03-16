let obj = {name: 'kebi'}
let arr = [1,2,5]
let kebi = {name: 'kebi', status: {alive: 'no'}}

let proxy = new Proxy(kebi, {
    get(target, key){
        console.log('获取值：', key);
        // return target[key];       // 这种写法会有一定限制
        return Reflect.get(target, key)  // 这种写法，从target内部吧key映射出来了
    },
    set: (target, key, value) => {
        // target[key] = value;
        console.log('修改值：', key, value)
        return Reflect.set(target, key, value)
    }
})
// o.name = 'bulaiente'
// console.log(o.name)

/**
 * 问题1， 触发多次
 * */ 
//proxy.unshift(3);    // 因为 执行 unshift 操作数组内元素一次向后移动，对数组的修改和获取会多次触发的问题，需要修正
// 获取值： unshift
// 获取值： length
// 获取值： 2
// 修改值： 3 5
// 获取值： 1
// 修改值： 2 2
// 获取值： 0
// 修改值： 1 1
// 修改值： 0 3
// 修改值： length 4

/**
 * 问题2， 数组嵌套
 * */ 
proxy.status.alive = 'yes';

// 获取值： status 
// 并没有给status的alive赋值，只是读到 status 的值。Proxy 深层嵌套会有这样的问题，需要修正
