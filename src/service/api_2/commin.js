import {GetCategory, GetCategoryAll} from '@/service/api_2/news.js'
import { reactive } from '@vue/composition-api'
export function common(){
    const category = reactive({
        item: []
    })
    const getInfoCategory = () => {
        GetCategory().then(res => {
            category.item = res.data.data.data
        }).catch(err => {
            console.log(err)
        })
    }
    
    const getInfoCategoryAll = () => {
        GetCategoryAll().then(res => {
            category.item = res.data.data.data
        }).catch(err => {
            console.log(err)
        })
    }

    return{
        getInfoCategory,
        getInfoCategoryAll,
        category
    }
}
