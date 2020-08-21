import instance from '@/utils/Interceptor.js'
// 获取验证码
export function GetSms(data){
    instance.request({
        method: 'post',
        url: '/getSms/',
        data
    })
}