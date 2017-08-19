/**
 * Created by fuweiping on 2017/6/5.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./public/javascripts/root.js",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3'],
                    plugins: [
                        ['react-html-attrs'], //添加组件的插件配置
                        ["import", { libraryName: "antd", style: "css" }] // `style: true` 会加载 less 文件
                    ]
                }
            },
            //下面是使用 ant-design 的配置文件
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    output: {
        path: path.join(__dirname, "./public/out"),
        publicPath: "./public/out",
        filename: "bundle.js"
    }
};