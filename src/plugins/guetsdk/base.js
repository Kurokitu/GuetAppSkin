import axios from 'axios';

const API_BASE_URI = 'http://wx.gliet.com.cn:9028';


export const BASECLI = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: API_BASE_URI,
    method: 'post',
    headers: {
        //'Content-Type': 'application/json;charset=UTF-8'
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export default BASECLI;
