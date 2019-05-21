
import React, { useReducer } from 'react';
import './hooks.less';
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

export default UseReducer;