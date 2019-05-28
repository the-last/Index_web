##  webpack Build速度提升

### 提升构建速度的原理
webpack.DllPlugin 和 window.DllReferencePlugin。 <br />
提供分离包的形式 提升build构建速度。<br />
主要思想，是将一些不做修改部分，项目的依赖提前打包 <br />
这样在项目构建中就不用每次对这部分代码打包，因此可以节省时间。

### 使用步骤
- 生成固定依赖包的清单依赖
使用 webpack.DllPlugin 配置Webpack.dll.config.js 文件，生成依赖清单 <br />
输出为dll.js文件，引入到HTML中，输出 **-manifest.json文件 <br />
webpack.dll.config.js
```
const path    = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-redux',
            'babel-polyfill'       //提前打包这些不会修改的文件
        ]
    },
    output: {
        path: path.join(__dirname, './build/static/js'),   //放在项目的static/js目录下
        filename: '[name].dll.js',                         //提前打包的文件名，会在index.html中引用
        library: '[name]_library'                          //全局变量名
        //可选 vendor.dll.js中暴露出的全局变量名。需要和webpack.DllPlugin中的 name: '[name]_library' 保持一致。
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),    //生成清单文件
            name: '[name]_library'                                      //全局变量
        }),

        //压缩这些包
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console:true,  // 去掉console
                drop_debugger:true  // 去掉debugger
            },
            output:{
                comments: false,    // 去掉注释
            },
            sourceMap: true
        })
    ]
};
```

- 生成环境中引入DllPlugin的输出
生产环境 **plugins** 中添加 new window.DllReferencePlugin <br />
配置manifest传入DllPlugin输出的清单json。<br />
webpack.pro.config.js
```
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

plugins: [
    new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, '..'), 
        manifest: require('./vendor-manifest.json')     // 找打dll打包好的清单json
    }),

    //生成的vendor.dll.js 加上hash值再添加到 index.html 主页面
    new AddAssetHtmlPlugin([{
        filepath: path.resolve(__dirname, './build/static/js/vendor.dll.js'),
        outputPath: utils.assetsPath('js'),
        publicPath: path.posix.join(config.build.assetsPublicPath, 'static/js'),
        includeSourcemap: false,
        hash: true,
    }])
]
```

- 命令配置
package.json
```
"scripts": {
    "build": "cross-env NODE_ENV=production webpack -p",
    "build:dll": "webpack --config ./webpack.dll.config.js"
}
```