
/**
 *  异步函数 异步执行等待
 * resolve 表示所在是promise异步请求已经完成
 * promise在事件流中属于 微观任务会立即执行
 * 在没有 resolve 的情况下 不影响之后代码的执行
 * 但是，在之后then方法回调，会一直等待。
 * */

function aw ( ) {
    console.log(1);
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve();
        }, 1000)
    });
    console.log(3);
}
aw(); // 1 3 2

/**
 * 异步函数 同步执行等待
 * async 函数可以被声明会一个同步等待异步回调的函数
 * generator的 * yield 的语法糖，对应 async await
 * await 后面函数必须是Promise对象，
 * 并且需要保证 Promise会有resolve()
 * 或者 执行reject并且有对应的错误处理
 * 否则await函数会一直等待
 * */

async function as () {
    console.log(1);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            reject('未解决异步任务');
        }, 1000);
    })
    .then(()=>{})
    .catch(er=>{console.log(er, 8)})
    console.log(3);
}
as(); // 1 2 未解决异步任务 8 3