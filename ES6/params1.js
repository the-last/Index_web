/**
题目：
    解析出代码里所有的标识符(包括关键字 变量名 属性名 方法名)
    并统计标识符出现的次数 字符串里的不算 (再思考下是否还有别的例外)
返回：
    Map<key=标识符，value={count:次数,type:[1|2|3|4]}> 
    //1关键字 2 变量名 3 属性名 4 方法名 用一个object表示
*/
var aim_chart_global = [];
var getType = par => Object.prototype.toString.call(par).split(' ')[1].split(']')[0];
var combinKeywords = function (right) {
    for (let word of right) {
        aim_chart_global.push(word);
    }
    aim_chart_global = aim_chart_global.reduce((p, c) => {
        p.indexOf(c) === -1 && p.push(c);
    }, []);
}
var keywords = [
    'in',
    'of',
    'await',
    'as',
    'async',
    'break',
    'continue',
    'const',
    'catch',
    'constructor',
    'class',
    'delete',
    'extends',
    'function',
    'for',
    'let',
    'return',
    'switch',
    'while',
    'throw',
    'try',
    'var',
    'yield',
];

// 处理变量
function findParamsInitTypeAndHaveKeywords (str) {
    let types = ['let', 'var', 'const'];
    let regs_types = types.map(type => {
        return `${type} *[0-9a-zA-Z_]* *= *`
    });

    for (let i=0; i< regs_types.length; i++) {
        let reg = regs_types[i];
        reg = new RegExp(reg, 'g');
        if (reg && getType(reg) === 'RegExp') {
            let temp = reg.exec(str);
            while (temp) {
                let params = temp[0].match(/[ ]*\w*(?=[ ]*)/g);
                aim_chart_global.push(params[1].replace(/ /g, ''));
                temp = reg.exec(str);
            }
        }
    }
}

// 处理方法名
function findMethods (str) {
    const reg_statement_function = /(?<=function[ ]*)[0-9a-zA-Z_]*/g;
    const reg_statement_arrow = /[0-9a-zA-Z_]*(?= *= *\(\) * =>)/g;
    const reg_statement_params = /[0-9a-zA-Z_]*(?= *= *function)/g;

    let match_header = [];
    match_header.concat(reg_statement_function.match(str))
                .concat(reg_statement_arrow.match(str))
                .concat(reg_statement_params.match(str));
    match_header = match_header.reduce((p,v) => {
        if (v!=='') {
          p.push(v);
        }
        return p;
    }, []);
    combinKeywords(match_header);
}


// 统计结果
function statisticsKeywordsCount (keys, str) {
    if (keys && getType(keys) === 'Array' && keys.length >0) {
        return keys.reduce((p,c,i,a) => {
            let reg_temp = new RegExp(c, 'g');
            let mate_temp = reg_temp.exec(str);
            let count = 0;
            while (mate_temp) {
                count++;
                mate_temp = reg_temp.exec(str);
            }
            p.push({key: c, count});
            return p
        }, []);
    } else {
        return []
    }
}

// 处理传参
function find

const strTest = `function findParamsInitTypeAndHaveKeywords (str) {
    let types = ['let', 'var', 'const'];
    let regs_types = types.map(type => {
        return 
    });
    const oo = 'wuliao';
    regs_types.forEach(reg => {
        (function(reg){
            let temp = undefined;
            while (temp = reg.exec(str)) != null) {
                let params = temp[0].match(/[ ]*w*(?=[ ]*)/g);
                aim_chart_global.push(params[1].replace(/ /g, ''));
                temp = reg.exec(str);
            }
        })(reg)
    });`;

findParamsInitTypeAndHaveKeywords(strTest);

combinKeywords(keywords);

findMethods(strTest);



var aim_result = statisticsKeywordsCount(aim_chart_global, strTest);

console.log('统计代码中变量及出现次数：\n', aim_result);