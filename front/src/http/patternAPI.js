import {$authHost} from "./index";

export const getAllPattern = async (filter) => {
    const data = await $authHost.get(`pattern/get?filter=${filter}&id=all`)
    return data.data
}

export const getPatternById = async (id) => {
    const data = await $authHost.get('pattern/get?id=' + id)
    return data.data
}

export const getCommonPatternByCodeName = async (codeName, type) => {
    const data = await $authHost.get(`pattern/getPatternCommon?codeName=${codeName}&type=${type}`)
    return data.data
}

export const createPattern = async (pattern, actionType) => {
    const sendData = {
        "pattern": pattern,
        "actionType": actionType
    }
    const data = await $authHost.post('pattern/create', sendData)
    return data
}