import {$authHost} from "./index";

export const getAllIncidents = async (limit, page) => {
    const data = await $authHost.get(`incident/get?id=all&limit=${limit}&page=${page}`)
    return data.data
}

export const getIncidentById = async (id) => {
    const data = await $authHost.get('incident/get?id=' + id)
    return data.data
}

export const getInputPattern = async (code_name) => {
    const data = await $authHost.get('incident/getInputPattern?code_name=' + code_name)
    return data.data
}

export const getTypes = async () => {
    const data = await $authHost.get('incident/types')
    return data.data
}

export const createIncident = async (coord, incidents) => {
    const finalData = {
        "coord": coord,
        "incidents": incidents
    }
    const data = await $authHost.post('incident/create', finalData)
    return data
}