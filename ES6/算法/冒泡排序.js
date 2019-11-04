function bubble (arr) {
    if (Object.prototype.toString.call(arr) !== "[object Array]") return;
    let len = arr.length, temp = undefined;
    for (let i=0; i<len; i++) {
        for (let j=i+1; j<len; j++) {

            if (arr[i] > arr[j]) {
                // temp 临时变量从新的数组中获取
                // 循环每执行完一次就是一个新的数组
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
/**
算法复杂度计算方式：



*/