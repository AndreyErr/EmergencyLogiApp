import {$authHost} from "./index";

export const getSettings = async () => {
    const settings = await $authHost.get('system/getSetting')
    return settings
}

export const getSetting = async (value) => {
    const settings = await $authHost.get('system/selectSetting?value='+value)
    return settings
}

export const updateValueInDb = async (id, value) => {
    const {data} = await $authHost.post('system/updateValue', {
        id: id,
        value: value
    })
    return data
}

export const updateDataInDb = async (id, dataSeting) => {
    const {data} = await $authHost.post('system/updateData', {
        id: id,
        name_text: dataSeting.name_text,
        descr: dataSeting.descr
    })
    return data
}