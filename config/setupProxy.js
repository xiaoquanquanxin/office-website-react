/* 代理，仅devServer */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app){
    app.use(
        //  常规换源，api换空字符串
        createProxyMiddleware('/api', {
            target: 'http://horizon.wx.h5work.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }),
        //  图片资源
        createProxyMiddleware('/upload', {
            target: 'http://horizon.wx.h5work.com/',
            changeOrigin: true,
        })
    );
};
