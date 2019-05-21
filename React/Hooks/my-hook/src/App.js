import React from 'react';
import './App.css';
import UseState from './Hooks/UseState';
import UseEffect from './Hooks/UseEffect';
import UseReducer from './Hooks/UseReducer';
import UseCustomize from './Hooks/UseCustomize';

function App() {
	return (
		<div className="App">
		    <div
			    style={{
					fontSize: 32,
					marginTop: 20
				}}
			>
			    React Hooks
			</div>
		    <p > -- <span className="title"> useState</span>  </p>
			<div>
				<UseState />
			</div>
			<p > -- <span className="title"> useEffect</span>  </p>
			<div>
				<UseEffect />
			</div>
			<p > -- <span className="title"> useReducer</span> </p>
			<div>
				<UseReducer />
			</div>
			<p > -- <span className="title"> 自定义Hook</span> </p>
			<div>
				<UseCustomize />
			</div>
		</div>
	);
}

export default App;
