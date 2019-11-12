## 区分原生和react事件更新

#### 原生事件内调用setState，每次都有效，每次都会render；例如在addEventListener setTimeout 内。注意，是先执行render，再执行setTimeout内之后的代码。

#### react事件内调用，只有最后一次的setState起作用，触发一次render；例如在componentWillMount componentDidmount

#### 在constructor setState 无效，constructor内 setTimeout setState 有效