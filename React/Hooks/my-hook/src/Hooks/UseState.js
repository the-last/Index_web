import React, { useState, useEffect } from 'react';
import './hooks.less';
function UseState() {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState('red'); // 变量名称写法么有要求，多个写法一样只有保持顺序一直
    
    return (
        <div>
            <p>
                点了{count}次，stop stop ...
                <span
                    style={{
                        float: 'right'
                    }}
                >
                    <button
                        onClick={() => {
                            setCount(count+1);
                        }}
                    >
                        点击会➕1
                    </button>
                </span>
            </p>
            <p>
                <span style={{color: color, fontSize: 26}}>这是您选中的颜色: {count}</span>
                <span
                    style={{
                        float: "right"
                    }}
                >
                    <button
                        onClick={() => {
                            let c = '#9900'+ Math.floor((Math.random() *99));   // 重新赋值
                            console.log(c, '获取新的颜色属性')
                            setColor(c);
                        }}
                    >
                        点击会改变颜色哦
                    </button>
                </span>
            </p>
        </div>
    )
}
export default UseState
