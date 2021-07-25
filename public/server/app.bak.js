//const express = require('express');
//const compression = require('compression');
//const fs = require('fs');
//const { resolve } = require('path');
////  代理
//const { createProxyMiddleware } = require('http-proxy-middleware');
////  常量
//const {
//    RegApi,
//    apiTargetUrl,
//    RegUpload,
//    staticDir,
//    PORT,
//} = require('./constants');
//const cors = require('cors');
////  跨域插件
//const app = express();
//app.use(express.json());
//app.use(function (req, res, next){
//    if (req.url === '/index.html' || req.url === '/') {
////        console.log('🍉', res);
//        console.log('🍉', resolve(staticDir, 'index.html'));
//
//        let rs = fs.createReadStream(resolve(staticDir, 'index.html'));
//        rs.on('data', (buffer) => {
//            //  拿buffer
//            console.log('🍹buffer:', buffer);
//            //  拿到buffer，替换
//            const string = buffer.toString().replace('[[[title]]]', 'xxxxxx');
//            //  换成二进制
//            const result = Buffer.from(string);
//            //  console.log(result.toString());
//            //  设置body
//            res.body = result;
//            //  输出
//            res.send(result);
//        });
//    }
//    next();
//});
//app.use(cors());
////  写了这个就报错了
//// app.use(express.urlencoded({extended: false}));
//app.use(express.static(staticDir));
//app.use(compression());
//app.enable('trust proxy');
////  代理接口
//app.use(RegApi, createProxyMiddleware({
//    target: apiTargetUrl,
//    changeOrigin: true,
//    secure: false,
//    pathRewrite: {
//        '^/api': '',
//    },
//}));
////  代理资源文件
//app.use(RegUpload, createProxyMiddleware({
//    target: apiTargetUrl,
//    changeOrigin: true,
//    secure: false,
//}));
////  异常处理
//app.use(function (req, res, next){
//    res.status(404).send('404-node-server');
//    next();
//});
//
//app.listen(PORT, err => {
//    if (err) throw err;
//    else console.log(`监听在端口号:${PORT}`);
//});
