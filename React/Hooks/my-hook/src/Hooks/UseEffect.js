import React, { useState, useEffect } from 'react';

function UseEffect() {
	const [count, setCount] = useState(0);

	useEffect(() => {   // 功能和 生命周期中 componentDidMount  componentDidUpdate componentWillUnmount的组合
		document.title = `title记录 被点击了 ${count} 次`;   // 使用浏览器api 更新文档标题值
        let interval = setTimeout(() => {
			console.log('在定时器做些事');
		}, 300);

		return () => {
			clearTimeout(interval);
			console.log('清理上一次的Effect，类似Unmount效果');
		}
	});

	return (
		<div>
			<p>
				统计被点了 {count} 次
				<span
                    style={{
                        float: "right"
                    }}
                >
				    <button onClick={() => setCount(count + 1)}>
					    点我一下
					</button>
				</span>
			</p>
		</div>
	);
}

export default UseEffect;