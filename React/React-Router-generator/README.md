## 1 思路： 对象 -->  Router 步骤
### 创建编译器函数
##### 区分有 children 组件
##### 区分没有 children 的组件
##### 循环调用路由树型结构
   
##### 返回 路由格式的字符串数据

##### 调用fs模块将字符输出为jsx组件

##### 在开发环境对 监听路由配置文件，自动输出 Router 组件

#### 最后保存为路由配置文件流。

## 2 组件路由属性如下
```
route = {
    path: 'a',
    component: 'A',
    children: [
        {
            path: 'b',
            component: 'B'
        }
    ]
}
```
期望的结果输出Router配置文件。 <br>
```
<Route
    path="/a"
    component={A}
>
    <Route
        path="/b"
        component={B}
    />
</Route>
```
