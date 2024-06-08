import {$authHost} from "./index";

export const getAllStorages = async (limit, page) => {
    const data = await $authHost.get(`storage/get?id=all&limit=${limit}&page=${page}`)
    return data.data
}

export const getStoragesCoords = async () => {
    const data = await $authHost.get('storage/getStoragesCoords')
    return data.data
}

export const getStorageById = async (id) => {
    const data = await $authHost.get('storage/get?id=' + id)
    return data.data
}

export const createStorage = async (storage_data) => {
    const data = await $authHost.post('storage/create', {
        "coord": storage_data.coord,
        "name": storage_data.name,
        "descr": storage_data.descr,
        "status": storage_data.status,
        "addres": storage_data.addres
    })
    return data
}

export const updateStorage = async (storage_data, id) => {
    const data = await $authHost.post('storage/update', {
        "coord": storage_data.coord,
        "name": storage_data.name,
        "descr": storage_data.descr,
        "status": storage_data.status,
        "addres": storage_data.addres,
        "id": id
    })
    return data
}

export const getItemsInStorage = async (storageId, filter = 'all', limit = 20, page = 1) => {
    const data = await $authHost.get(`storage/getItemsInStorage?storageId=${storageId}&filter=${filter}&page=${page}&limit=${limit}`)
    return data.data
}

export const addItemCountToStorage = async (id, count, type) => {
    const data = await $authHost.post('storage/addItemCountToStorage', {
        "id": id,
        "count": count,
        "type": type
    })
    return data
}

export const searchItemsAct = async (str, limit = 10, storageId = 0, type = "all") => {
    const result = await $authHost.get(`storage/searchItem?str=${str}&limit=${limit}&storageId=${storageId}&type=${type}`)
    return result
}

export const addItemToStorage = async (storage_id, item_id, count) => {
    const data = await $authHost.post('storage/addItemToStorage', {
        "storage_id": storage_id,
        "item_id": item_id,
        "count": count
    })
    return data
}

export const deleteItemFromStorage = async (id) => {
    const data = await $authHost.post('storage/deleteItemFromStorage', {
        "id": id
    })
    return data
}