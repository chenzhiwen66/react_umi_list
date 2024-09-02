import axios from 'axios';

const request = axios.create({
    timeout: 15 * 1000
})

// http request 拦截器
request.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        return config
    },
    err => {
        return Promise.reject(err);
    })

request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                case 401:
                    break;
                case 404:
                    break;
                case 405:
                    break;
                case 500:
                    break;
                default:
                    ;
            }
        } else {}
        alert('请求接口失败，请联系管理员');
        return Promise.reject(error) // 返回接口返回的错误信息
    })

export default request