function quick(array) {
    if (Object.prototype.toString.call(array) !== 'object Array') return;
    const sort = (arr, left = 0, right = arr.length - 1) => {
        if (left >= right) {
            return
        }
        let i = left
        let j = right
        const baseVal = arr[j]
        while (i < j) {
            while (i < j && arr[i] <= baseVal) {
                i++
            }
            arr[j] = arr[i];
            while (j > i && arr[j] >= baseVal) {
                j--
            }
            arr[i] = arr[j]
        }
        arr[j] = baseVal
        sort(arr, left, j - 1)
        sort(arr, j + 1, right)
    }

    sort(array)
    return array;
}