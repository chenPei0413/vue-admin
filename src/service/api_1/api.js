import axios from 'axios'
export default function ajax(url = '', params = {}, type = 'GET'){
	// 变量
	let promise;
	return new Promise((resolve, reject) => {
		if(type.toUpperCase() === 'GET'){
			let paramsStr = ''
			Object.keys(params).forEach(key => {
				paramsStr += key + '=' + params[key] + '&';
			})
			// 清除最后一个&
			if(paramsStr){
				paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
			}
			url += '?' + paramsStr;
			promise = axios.get(url)
		}else if(type.toUpperCase() === 'POST'){
			promise = axios.post(url, params)
		}
		promise.then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err)
		})
	})
}