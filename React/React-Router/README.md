#### React-Router

##### Link跳转

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
