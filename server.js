/**
 * Created by admin on 2017/8/19.
 */
    //����webpack-dev-server�����ñ��ط����������Կͻ��˴�ҳ��
var webpack = require('webpack');//����ģ��webpack�����ɶ���
var WebpackDevServer = require('webpack-dev-server');//����ģ��webpack-dev-server�����ɶ���
var config = require('./webpack.config');//�����Զ���webpack.config.js
//��webpack��webpack-dev-server��������
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
