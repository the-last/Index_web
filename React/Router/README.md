# React-Router
react路由模块
## 1 BrowserRouter & HashRouter
**<BrowserRouter>** 使用 HTML5 提供的 history 提供的（pushState, replaceState 和 popstate）事件保持URL和UI同步。 <br >
```
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter
  basename={string}  // 所在位置的基准URL。如果应用部署在的服务器上的根路径的子目录，则需要将basename设置为根路径，末尾不能有斜杠
  forceRefresh={bool} // 如果为true，在切换导航路径的时候，页面会刷新。可能会在不支持 history api的浏览器上使用
  getUserConfirmation={function}  // 切换路由的回调，可以是window.confirm()，确认后在进行路由跳转
  keyLength={number}  // location.key关键字长度，默认是6
>
  <App />
</BrowserRouter>
```
**<HashRouter>** 使用 URL 的hash部分，（window.location.hash）来保持 UI和URL 的同步。 <br >
Hash模式会多一个 hashType 类型。 <br >
```
import { HashRouter } from 'react-router-dom';
<HashRouter
  hashType={string} // slash 后面默认有斜杠 #hash1/hash2
                    // noslash 后面默认没有斜杠 #/hash1/hash2
>
  <App />
</HashRouter>
```

## 2 Link
为你的应用提供声明式的、可访问的链接。 <br >
```
import { Link } from 'react-router-dom';
<Link 
  to="/about"   // to: string pathname, search, hash
>
AboutTOString
</Link>

<Link
    to={{
        pathname: '/courses',  // 链接路径
        search: '?sort=name',  // 查询参数
        hash: '#the-hash',     // hash 地址
        state: {               // 存储在location中的额外状态数据，可用于传参
            fromDashboard: true
        }
    }}
    replace                    // replace 设置为true时，替换历史栈中的当前条目，不添加新条目
    innerRef={refCallback}     // 返回参数指向挂载的 DOM 元素，在卸载时为null
    other={...title, ...id, ...className}  // 其他属性
>
AboutToObject
</Link>
function refCallback = node => {
    //  node 指向最终挂载的 DOM元素
}
```
## 3 NavLink
一个特殊版本的 **<Link>** 
```
<NavLink 
  activeClassName: string   // 处于激活状态时 应用的类。和className属性一起使用
  activeStyle: string       // 同上
  exact: bool               // true 要求位置完全匹配时才应用激活的样式
  strict: bool              // true 在确定位置是否与当前 URL匹配时，将考虑位置的路径名后面的斜杠 to="/events/"
  isActive: func            // 返回激活判断的条件，函数返回值作为true false的判断值
>
About
</NavLink>
```

## 4 Prompt
*<Prompt>* 用于在位置跳转之前给予用户一写确认信息。

## 4 Link跳转

```
Link 跳转路径方式：
replace   // this.props.router.replace
push      // this.props.router.push


<Link to={path}>
path 可以是对象
如果需要给Link to 的组件
传递参数,方式如下
{
    pathname: '/dataMarket/dataDetail/:'+tableID,
    state: {
        tableinfo: JSON.stringify(tableInfo)
    },
    query: {
        tableinfo: JSON.stringify(tableInfo)
    }
}
或者是路径 '/dataMarket/dataDetail/:'+tableID

读取参数，方式如下
从location中可以获取 以下关键信息：
state query search pathname hash action

// this.props.location.state.tableinfo 

```
