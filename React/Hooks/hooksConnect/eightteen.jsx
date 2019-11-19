import React, { useReducer } from 'react';
import { defaultState, reducer } from './reducer';
import EightteenChildThree from './EightteenChildThree';

const ExampleContext = React.createContext(null);  

/*
 useReducer
（reducer，initState，init）  返回 [state, dispatch]。
- reducer    返回state的函数，传参是 state，action
- initState  state值初始化
- init       接受第二个参数initState为参数，可以实现 lazy initState。
*/

// 定义组件
function ReducerCom() {
  const [exampleState, exampleDispatch] = useReducer(reducer, defaultState);

  return (
    <ExampleContext.Provider
      value={{ exampleState, dispatch: exampleDispatch }}
    >
      <EightteenChildThree></EightteenChildThree>
    </ExampleContext.Provider>
  );
}

export {
    ReducerCom,
    ExampleContext
}