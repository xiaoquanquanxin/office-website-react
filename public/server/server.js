const express = require('express');
const compression = require('compression');
//  代理
const { createProxyMiddleware } = require('http-proxy-middleware');
//  常量
const {
    RegApi,
    apiTargetUrl,
    RegUpload,
    staticDir,
    PORT,
    errorStream,
} = require('./constants');
const cors = require('cors');
//  跨域插件
const app = express();
app.use(express.json());
app.use(function (req, res, next){
    if (req.url === '/robots.txt') {
        res.status(404).send(errorStream);
        return;
    }
    next();
});
app.use(cors());
//  写了这个就报错了
// app.use(express.urlencoded({extended: false}));
app.use(express.static(staticDir));
app.use(compression());
app.enable('trust proxy');
//  代理接口
app.use(RegApi, createProxyMiddleware({
    target: apiTargetUrl,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/api': '',
    },
}));
//  代理资源文件
app.use(RegUpload, createProxyMiddleware({
    target: apiTargetUrl,
    changeOrigin: true,
    secure: false,
}));
//  异常处理
app.use(function (req, res, next){
    res.status(404).send(errorStream);
});

app.listen(PORT, err => {
    if (err) throw err;
    else console.log(`监听在端口号:${PORT}`);
});
