
/*
* 1，hooks用法，useState useEffect
* 2，useEffect 优化
*/


import React, { useState, useEffect } from "react";
export default function HookPage(props) {
    // 声明⼀一个叫 “count” 的 state 变量量，初始化为0 const [count, setCount] = useState(0);
    const [date, setDate] = useState(new Date());
    // 与 componentDidMount 和 componentDidUpdate相似 
    // 第二个参数，表示hooks的依赖，只有数组内提到的变量变化时才会执行 hook
    useEffect(() => {
        // 更更新 title
        document.title = `You clicked ${count} times`;
    }, [count]);
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => {clearInterval(timer)}
    }, []);
    return (
        <div>
            <h3>HookPage</h3>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <p>{useClock().toLocaleTimeString()}</p>
        </div>
    );
}

//⾃定义hook，命名必须以use开头， 内部是useState useEffect组合，返回计算值
function useClock() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return date;
}

/**
 * useReducer
 * Reducer在hooks中的应用
 * */ 
const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':  // 增加操作
            return { count: state.count + 1 };
        case 'decrement':  // 减少操作
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function UseReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <p>
            当前数量: {state.count}
            <span
                style={{
                    float: "right"
                }}
            >
                <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
            </span>
        </p>
    );
}
