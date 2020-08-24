import instance from '@/utils/Interceptor.js'
// 获取验证码
export function GetSms(data){
    return instance.request({
        method: 'post',
        url: '/getSms/',
        data
    })
}
//登录
export function Login(data){
    return instance.request({
        method: 'post',
        url: '/login/',
        data
    })
}
// 注册
export function Register(data){
    return instance.request({
        method: 'post',
        url: '/register/',
        data
    })
}