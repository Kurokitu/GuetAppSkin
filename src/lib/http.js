import axios from 'axios'
import Router from '../router/index'
import relogin from './relogin'

/*
* 增加请求拦截器
*/
axios.interceptors.request.use((config) => {
    // 预处理请求的信息
    return config
}, (error) => {
    // 预处理请求有异常error时抛出错误
    return Promise.reject(error)
})

/*
* 增加相应拦截器
*/
axios.interceptors.response.use((response) => {
    // 预处理相应的数据
    if (response.status === 200 && response.data.status) {
        let nc = response.data.status;
        if (nc === 1) {
            // localStorage.clear();
            // Router.push('/Login');
            // this.$toast('发生了一些错误。请重试。', 'error');
        }else if(nc === 3) {
            localStorage.clear();
            Router.push('/Login');
        } else if (nc === 4) {
            relogin.login();
        }
    }

    return response
}, (error) => {
    // 错误返回 状态码验证
    return Promise.reject(error)
})

/**
 * 返回axios方法
 * @param url（如果传绝对地址则baseURL不会追加到url之前）
 * @param method
 * @param timeout
 * @param data
 * @param headers
 * @param dataType
 * @returns {AxiosPromise}
 */
export default function (url, {
    // 默认求情方式post
    method = 'post',
    // 超时
    timeout = 3000,
    // 请求主题
    data = {},
    // 请求头
    headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;' },
    // 文件类型
    dataType = 'json'
}) {
    // 可根据不同method动态配置headers
    if (method === 'get') {
        headers = Object.assign({}, headers)
    } else {
        headers = Object.assign({}, headers)
    }
    const config = {
        method: method,
        timeout: timeout,
        url: url,
        // 在外部文件配置axios的基础路径 ip地址
        baseURL: process.env.VUE_APP_API_URL,
        data: data,
        headers: headers,
        dataType: dataType
    }
    return axios(config)
}