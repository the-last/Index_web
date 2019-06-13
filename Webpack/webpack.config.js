
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isPro = process.env.NODE_ENV === "production";
const path  = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const serverPort = 9000;

const config = {
    // mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.ejs$/,
                use: "ejs-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: "[local]___[hash:base64:5]",
                                importLoaders: 1
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: "[local]___[hash:base64:5]",
                                importLoaders: 2
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: "postcss",
                                plugins: loader => [autoprefixer()],
                                sourceMap: true
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: true,
                                modifyVars: {}  // 定义全局的样式样式变量
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|ttf|eot|svg|woff|woff2)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "[name].[sha512:hash:base64:7].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },

    devServer: {
        contentBase: [
            path.join(__dirname, "./public"),
            path.join(__dirname, "./src/")
        ],
        port: serverPort,
        proxy: {
            // "/gw": {
            //     target: "https://12.12.12.122/abcdefg/gw",
            //     pathRewrite: { "^/gw": "" },
            // }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Project",
            inject: true,
            hash: true,
            minify: {
                collapseWhitespace: isPro,
                minifyCSS: isPro,
                minifyJS: isPro
            },
            template: './public/index.html'
        }),
        new ExtractTextPlugin("styles.css")
    ]

};

module.exports = config;