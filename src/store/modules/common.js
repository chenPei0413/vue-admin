import {GetCategory, GetCategoryAll} from '@/service/api_2/news.js'

const actions = {
    getInfoCategory(content, requestData){
        return new Promise((resolve, reject) => {
            GetCategory({}).then(res => {
                resolve(res.data.data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getInfoCategoryAll(content, requestData){
        return new Promise((resolve, reject) => {
            GetCategoryAll({}).then(res => {
                resolve(res.data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
}
export default {
    namespaced: true,
    actions
}