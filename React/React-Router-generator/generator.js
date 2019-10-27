
const fs = require('fs');
const routeConfigs = require('./ReactRouter');
console.log(routeConfigs, '模块信息-');
/**
<Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>

*/

class CompileRouter {
    constructor(array) {
        this.template = '';
        this.routerArray = array;
        if (Object.prototype.toString.call(array) !== '[object Array]') throw Error('请输入数组！');
    }
    // 返回没有子组件的 Route 结构
    compilerNochild(nochild_object) {
        const { path, component } = nochild_object;
        let router_nochild_template = `
            <Route
                path="${path}"
                component={${component}}
            />`;
        return router_nochild_template;
    }
    // 返回有子组件的 Route 结构
    compilerHavechild(child_object){
        const { path, component, children } = child_object;
        let childrenCompiler = children && children.length > 0 ? children.map(item => {
            if (item.hasOwnProperty('children')) {
                return this.compilerHavechild(item);
            } else {
                return this.compilerNochild(item);
            }
        }): '';
        let router_child_template = `
            <Route
                path="${path}"
                component={${component}}
            >
            ${childrenCompiler}
            </Route>`;

        return router_child_template;
    }

    // 编译一个路由对象返回
    compiler(singleObjRoute) {
        let tree = '';
        if (Object.prototype.toString.call(singleObjRoute) !== '[object Object]') throw Error('单个路由配置应为对象！');
        if (singleObjRoute.hasOwnProperty('children')) {
            tree += this.compilerHavechild(singleObjRoute);
        } else {
            tree += this.compilerNochild(singleObjRoute);
        }
        console.log(tree, '--有逗号？？打印一下这个字符串-');
        return tree;
    }


    // 解析所有 路由对象 的合集返回结果
    result() {
        let array = this.routerArray;
        let router_root_template = '';
        router_root_template = array.map(item => {
            return this.compiler(item);
        }).join('');
        const Router = `<Router>${router_root_template}</Router>`;
        this.writeRouterFile(Router);
        return Router;
    }

    // 创建 写文件操作
    writeRouterFile(data) {
        var write = fs.createWriteStream('routes.jsx');
        write.write(data, 'UTF-8');

        write.end();
        write.on('finish', function () {
            console.log('写入路由配置完成！');
        });
        write.on('error', function (err) {
            console.log('写入路由配置报错：', '\n', err.stack);
        });
    }
}


var compiler = new CompileRouter(routeConfigs);
compiler.result();
