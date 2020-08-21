import instance from '@/utils/Interceptor.js'
// 获取验证码
export function GetSms(data){
    return instance.request({
        method: 'post',
        url: '/getSms/',
        data
    })
}