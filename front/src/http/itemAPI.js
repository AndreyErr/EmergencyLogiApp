import {$authHost} from "./index";

export const fatchItems = async (limit = 20, page = 1, filter = 'all') => {
    const items = await $authHost.get('item/getItems?limit=' + limit + '&page=' + page + '&filter=' + filter)
    return items
}

export const searchItemsAct = async (str, limit = 10) => {
    const result = await $authHost.get('item/searchItems?str=' + str + '&limit=' + limit)
    return result
}

export const selectItemsTypes = async () => {
    const data = await $authHost.get('item/selectItemsTypes')
    return data.data
}

export const editCategory = async (data_cat, last_name_cat, add_flag) => {
    const {data} = await $authHost.post('item/editCategory', {
        name: data_cat.type_name,
        descr: data_cat.type_descr,
        flag: data_cat.type_flag,
        add_flag: add_flag,
        last_name: last_name_cat
    })
    return data
}

export const createItem = async (item_data) => {
    const {data} = await $authHost.post('item/createItem', {
        name: item_data.name,
        descr: item_data.descr,
        flag: item_data.flag,
        type: item_data.type
    })
    return data
}

export const editItem = async (item_data, last_name) => {
    const {data} = await $authHost.patch('item/editItem', {
        name: item_data.name,
        descr: item_data.descr,
        flag: item_data.flag,
        type: item_data.type,
        last_name: last_name
    })
    return data
}