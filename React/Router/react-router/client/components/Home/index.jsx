import React from 'react';
import './Home.scss'

const Home = () => (
    <div className="home">
        <h2>react-router 4.2 版本使用需要注意的写法</h2>
        <p>1, 路由使用 route 定制 </p>
        <p>2，route的path可以作为组件component的传参，类型是对象</p>
        <p>3，route 写在router内，每个route router只能有一个根节点</p>
        <p>4，Link to 可以写在其他位置</p>
        <p>5，Link to 也可以写Router标签内，router route都可以当做标签处理，可以加样式</p>
        <p>6，路由跳转，二级路由的时候，可以用二级路由传参的方式</p>
        <p>7，react route 具有render属性 可以在render上直接使用jsx返回值。</p>
    </div>
)

export default Home