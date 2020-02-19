/**
 * 输入四则运算表达式
 * 返回正确的计算结果
 * 不能使用eval
 * 
*/

// 字符串转数组方法，抽出数字和运算符，返回数组

function expressionToArray (str) {
    let arr = [];
    // 提取数字， 必须加g全局模式
    str.replace(/\d*/g, function (match, args) {
        if (match) {
            arr.push(match)
        } else if(str[args]) {
            arr.push(str[args])
        }
    })

    return arr;
}

function transformAfter (str) {
    let arr = expressionToArray(str) || [];
    
    const reg_1 = /[\+\-]/;
    const reg_2 = /[\*/]/;

    let stack_opt = [];
    let stack_num = [];

    // 按优先级重新排序
    for (let i = 0; i<arr.length; i++) {

        if (!isNaN(Number(arr[i]))) {
            stack_num.push(arr[i])
        } else if (arr[i].indexOf('(')>=0) {

            stack_opt.push(arr[i])

        } else if (arr[i].indexOf(')')>=0) {

            while (stack_opt.length>0 && stack_opt[stack_opt.length-1] != '(') {
                stack_num.push(stack_opt.pop())
            }
            stack_opt.pop()

        } else if ( reg_1.test(arr[i]) ) { 

            while (
                stack_opt[stack_opt.length-1]
                && stack_opt[stack_opt.length-1] != '('
            ) {
                stack_num.push(stack_opt.pop())
            }
            if (stack_opt[stack_opt.length-1] == '(') {
                stack_opt.pop()
            }
            // 运算法稍后进入 stack_num
            stack_opt.push(arr[i])

        } else if ( reg_2.test(arr[i]) ) {
            while (
                stack_opt[stack_opt.length-1]
                && reg_2.test(stack_opt[stack_opt.length-1])
                && stack_opt[stack_opt.length-1] != '('
            ) {
                stack_num.push(stack_opt.pop())
            }
            if (stack_opt[stack_opt.length-1] == '(') {
                stack_opt.pop()
            }
            // 运算法稍后进入 stack_num
            stack_opt.push(arr[i])
        }
    }
    while(stack_opt.length>0) {
        stack_num.push(stack_opt.pop())
    }
    
    stack_num = stack_num.filter(i => {
        return i !== '(' 
    })
    return stack_num;
}

function computeAfter (arr) {
    let newArr = []
    let l = 0;
    let r = 0;
    
    for (let i=0; i<arr.length; i++) {
        
        
        if ( /[\-\+\*/]/g.test(arr[i]) ) {
            r = newArr.pop();
            l = newArr.pop();
            if (arr[i] === '-') {
                newArr.push(l - r)
            } else if (arr[i] === '+') {
                newArr.push(l + r)
            } else if (arr[i] === '*') {
                newArr.push(l * r)
            } else if (arr[i] === '/') {
                newArr.push(l / r)
            }
        } else {
            newArr.push(Number(arr[i]))
        }
    }

    return newArr[0];
}

const express  = '3*(3+8)-9+23';
let res = computeAfter(transformAfter(express));
console.log('计算结果：--', res);
