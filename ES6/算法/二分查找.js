function binary(arr, a, j) {
    let len = arr.length;
    let flag = j || Math.floor(len / 2);

    if (arr[flag] < a) {
        let temp = flag + Math.floor((len-flag)/2);

        if (temp > len) {temp = len;}
        if (flag >= len) return 'undefined';

        return binary(arr, a, temp);

    } else if (arr[flag] > a) {
        if (flag < 0) return 'undefined';
        flag = Math.ceil(flag-(len-flag)/2);

        return binary(arr, a, flag);
    } else {
        return flag;
    }
}