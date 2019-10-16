/**
 * 
 * 对象 扩展 
 * 
 * object assign 对象扩展
 * 每次执行 assign 
 * 事实上是对 object 原来对象的扩展然后并返回这个新的对象，🐘
 * 原理的对象被修改
 * 
 * */

const row = {
    display: 'inline-block',
    height: '50px',
    lineHeight: '50px',
}
const rowLeft = Object.assign(row, {
    color: 'rgba(0,0,0,.4)'
});
const rowRight = Object.assign(row, {
    color: 'rgba(0,0,0,.6)'
});

console.log(rowLeft, rowRight, '同时都被修改为最新的assign值');

// display: 'inline-block',
// height: '50px',
// lineHeight: '50px',
// color: 'rgba(0,0,0,.6)'
// Object.assign 方法是对已有属性的修改会覆盖，新增但不能删除。
// 
// 这可以作为一种对象赋值的高效方式！

/**
 * 对象声明
 * 首选 {}
 * 
 * 对象赋值
 * 首选 对象内赋值
 */
function getKey(flag) {
    return `uniqued key ${flag}`;
}
const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,  // 可变key提前声明
};

/**
 * 对象对key的获取方式
 * 
*/

function getkey() {
    let obj = {
        a: 1,
        b: 2,
        c: 3
    };
    obj.prototype.d = 4;
    Object.defineProperty(obj, 'e', {
        writable: false,
        emutable: false,
        value: 5
    });
    Object.defineProperty(obj, 'f', {
        writable: false,
        emutable: true,
        value: 6
    });
    const symbolg = new Symbol('g');
    const symbolh = new Symbol('h');
    Object.defineProperty(obj, symbolg, {
        writable: false,
        emutable: false,
        value: 7
    });
    Object.defineProperty(obj, symbolh, {
        writable: false,
        emutable: true,
        value: 8
    });

    console.log()
    for (let key in obj) {
        console.log('-- for-in:', key);
        if (obj.hasOwnProperty(key)) {
            console.log('-- hasOwnProperty: ', key);
        }
    }
    console.log('-- getOwnPropertyNames: ', Object.getOwnPropertyNames(obj));
    console.log('-- getOwnPropertyDescriptor: ', Object.getOwnPropertyDescriptor(obj));
    console.log('-- getOwnPropertySymbols: ', Object.getOwnPropertySymbols(obj));
    console.log('-- keys: ', Object.keys(obj));
    
}