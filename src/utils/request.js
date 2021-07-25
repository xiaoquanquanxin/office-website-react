import axios from 'axios';

//  定义中间件
axios.interceptors.response.use(
    (response) => {
        const data = response.data;
        //  如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        //  如果code === 0 ，则是正常请求
        if (response.status === 200 && +data.code === 0) {
            return Promise.resolve(data);
        }
        // 否则的话抛出错误
        return Promise.reject(data.msg);
        //  特殊处理
        //  const reg = /^\/xxx/;
        //  if ((response.status === 200 && +data.code === 1000) || reg.test(response.config.url)) {
    },
    // 服务器状态码不是2开头的的情况
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        return Promise.reject(error.response);
    }
);

//  封装请求
export function request(options) {
    return axios({
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            //                options.method.toLowerCase() === 'get'
            //                    ? 'application/json; charset=UTF-8'
            //                    : 'application/x-www-form-urlencoded',
        },
        method: options.method,
        url: options.url,
        params: options.params,
        data: options.data,
    })
        .catch(v => {
            return Promise.reject(v);
        });
}




