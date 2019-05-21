import React, { useState, useEffect } from 'react';


function useSquareCount() {
    let [count, setCount] = useState(10);

    useEffect(function sq() {
        console.log(count, '执行一次后的count');
        if (count<100) {
            setCount(count * count);
        }
        return () => {
            count = 10;
        };
    });
    console.log('count返回值', count);
    return count;
}

function UseCustomize () {
    let count = useSquareCount();
    
    return (
        <p>
            计算平方: {count}
            <span
                style={{
                    float: 'right'
                }}
            >
                初始值： 10
            </span>
        </p>
    )
}

export default UseCustomize;
