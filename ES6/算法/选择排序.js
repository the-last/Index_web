
// 选择排序，

function selectSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        // 从第二个开始找，如果有比 minIndex 下标还小的值，一遍for循环 minIndex 一定是最小值的下标。
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        console.log('一次寻找最小的值:--', minIndex, arr[minIndex])
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}