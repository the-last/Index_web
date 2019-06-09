## Diff优化策略
React 虚拟Dom更新优化 <br />

### 分层比较 
不会跨级比较，一层一层比较。如果只是换位置，用key换位置

### 比较算法：先序深度优先遍历。

- 1 如果节点类型不相同
直接采用替换模式{type: replace,newnode}

- 2 如果节点类型相同
再去判断属性类型是否相同，产生一个属性补丁包：
比如： {type: 'ATTRS',attrs: {class: 'list-group'}};
如果节点不存在，产生一个不存在补丁包
如果文本变化，{type: 'TEXT',text: 1}