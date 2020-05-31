/**
 * Created by admin on 2017/8/19.
 */
    //配置webpack-dev-server，配置本地服务器，用以客户端打开页面
var webpack = require('webpack');//引用模块webpack，生成对象
var WebpackDevServer = require('webpack-dev-server');//引用模块webpack-dev-server，生成对象
var config = require('./webpack.config');//引用自定义webpack.config.js
//对webpack和webpack-dev-server进行配置
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
}).listen(3000, 'localhost', function (err) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:3000');
    });
