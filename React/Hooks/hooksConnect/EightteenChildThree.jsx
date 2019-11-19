import React, {  useEffect, useContext } from 'react';


import { onChangeCount } from './actions';
import { ExampleContext } from './eightteen';


/*
 useContext(context)
在 Provider 组件内，可以使用 useContext 直接获取 Provider 设置的 value。
*/
const Example = () => {

    const exampleContext = useContext(ExampleContext);

    useEffect(() => {
        console.log('监听变化。')
    }, [exampleContext.exampleState.count]);

    return (
        <div>
            <p>值为{exampleContext.exampleState.count}</p>
            <button onClick={() => exampleContext.dispatch(onChangeCount(exampleContext.exampleState.count))}>点击加 1</button>
        </div>
    )
}

export default Example;
