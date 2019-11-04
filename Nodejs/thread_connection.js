// js是单线程执行，以下预期打印结果是 时间上的累加，one by one.

function fib (v) {
    if (v<=0) {return 0;}
    else if (v==1) {return 1;}
    else if (v>=2) {
        return fib(v-1) + fib(v-2);
    }
}

// const start = Date.now();
// console.log(fib(10), '\n', start);
// const fib1 = fib(40);
// console.log(Date.now() - start, fib1); // 1197

// const fib2 = fib(40);
// console.log(Date.now() - start, fib2); // 2374

// const fib3 = fib(40);
// console.log(Date.now() - start, fib3); // 3585

// 引入nodejs中的多线程概念，并行执行这些任务。

/**
 parentPort: 创建通信频道，创建跨线程通信。

 工作原理：
 在主线程内，定义工作线程，定好之后在工作线程执行运算，结果触发工作线程的 onmessage 事件，返回
**/

/**

Worker 线程执行参数
options：{
    stderr: true,   // 从 worker.stderr 写入到 process.stderr ，是一个可读流。
}
*/
console.log('__filename: 123', Date.now());
console.log('__dirname: 456', Date.now());

const {
    isMainThread,
    Worker,
    parentPort,
    workerData
} = require('worker_threads');

if (isMainThread) {
    const now = Date.now();
    
    // 声明多进程 这里的参数workerDate传值时，是深拷贝。
    // eval true 使用脚本的方式执行任务
    const worker1 = new Worker(`function fib (v) {
        if (v<=0) {return 0;}
        else if (v==1) {return 1;}
        else if (v>=2) {
            return fib(v-1+ fib(v-2);
        }
    };console.log(fib(10), 'hahhahah');`, {
        workerData: 20,
        eval: true,
        stderr: true
    });
    console.log(1, Date.now())
    worker1.on('message', (result) => {
        console.log(Date.now() - now, result);
    });
    worker1.on('error', (error) => {
        console.log('工作线程监听到的报错信息是工作线程内的报错，不是process发出的', error)
    });

    // 执行文件任务
    const worker2 = new Worker(__filename, {
        workerData:  30
    });
    console.log(2, Date.now())
    worker2.on('message', (result) => {
        console.log(Date.now() - now, result);
    });

    // 执行文件任务
    const worker3 = new Worker(__filename, {
        workerData:  40
    });
    console.log(3, Date.now())
    worker3.on('message', (result) => {
        console.log(Date.now() - now, result);
    });
} else {
    const number = workerData;   // workerData 是全局传值api
    const result = fib(number);
    parentPort.postMessage(result); // parentPort 定义传数据协议端口，发送工作进程的结果。
}

// 打印结果
/**

__filename: 123 1572748431498
 __dirname: 456 1572748431508
1 1572748431515
2 1572748431521
3 1572748431522
55 'hahhahah'
__filename: 123 1572748431579
__filename: 123 1572748431580
83 832040
 __dirname: 456 1572748431581
1226 102334155
 __dirname: 456 1572748431581

*/

/**
 * 多线程执行特点
 * 1，eval 为 true 时，执行脚本不生成新的worker线程，兼听不到message。
 * 2，new Worker 执行之后的代码都是按多线程同步执行在执行操作。所以打印的log不符合单线程的执行预期。
 * 时间几乎没有误差，几个毫秒会完成。
*/


