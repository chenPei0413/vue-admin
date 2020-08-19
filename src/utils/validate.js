export function stripscript(str){
    let pattern = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#¥……&*（）&;—|{}【】‘；：“”'。，、？]");
    let rs = "";
    for(let i = 0; i < str.length; i++){
        rs = rs + str.substr(i ,1).replace(pattern, '')
    }
    return rs;
} 
// 邮箱检测
export function validateEmail(str){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(str)
}

// 字符串过滤
export function strFilter(str){
    let reg = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#¥……&*（）&;—|{}【】‘；：“”'。，、？]");
    return reg.test(str)
}

// 密码长度检测
export function validatePass(str){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
    return reg.test(str)
}

export function validateVcode(str){
    let reg = /^[a-zA-Z0-9]{6}$/
    return reg.test(str)
}
