import axios from './http'

var version = '1.1.46'

const requests = {
    bindLogin(data = {}) {
        // 正常登入请求接口，获取用户信息也是这个
        data.version = version;
        return axios('info/bind', {
            // 请求方法
            method: 'post',
            // 请求体
            data: data
        })
    },

    newLogin(data = {}) {
        // 加密密码登入请求接口
        data.version = version;
        return axios('gbh/login', {
            // 请求方法
            method: 'post',
            // 请求体
            data: data
        })
    },

    // EDU多任务接口
    eduport(data = {}) {
        // 加密密码登入请求接口
        data.version = version;
        return axios('gbh/edu', {
            // 请求方法
            method: 'post',
            // 请求体
            data: data
        })
    },

}

// 导出对象，然后在全局注册或在单个vue文件下调用
export default requests
