// 拦截器
import axios from 'axios';
import {Message} from 'element-ui';
const BASEURL = process.env.NODE_ENV === 'production' ? '' : 'devApi';
// 创建拦截器
const instance = axios.create({
    baseURL: BASEURL,
    timeout: 1000
});
// 请求拦截器
instance.interceptors.request.use(function (config){
    return config;
}, function(err){
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(function (response){
    let data = response.data
    if(data.resCode !== 0){
        Message.error(data.message);
        return Promise.reject(data)
    }else{
        Message.success(data.message);
        return response;
    }
}, function(err){
    return Promise.reject(err)
})

export default instance;