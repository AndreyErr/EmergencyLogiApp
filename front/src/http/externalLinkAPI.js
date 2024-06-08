import {$authHost} from "./index";

export const createExternalLink = async (externalLinkData) => {
    const {data} = await $authHost.post('externalLink/create', {
        name: externalLinkData.link_name,
        descr: externalLinkData.link_descr,
        href: externalLinkData.link_href,
        body: externalLinkData.link_body,
        apikey: externalLinkData.link_apikey,
        status: externalLinkData.link_status
    })
    return data
}

export const deleteExternalLink = async (id) => {
    const {data} = await $authHost.post('externalLink/delete', {
        id: id
    })
    return data
}

export const testExternalLink = async (id) => {
    const {data} = await $authHost.post('externalLink/test', {
        id: id
    })
    return data
}

export const editExternalLink = async (externalLinkData) => {
    const {data} = await $authHost.patch('externalLink/edit', {
        name: externalLinkData.link_name,
        descr: externalLinkData.link_descr,
        href: externalLinkData.link_href,
        body: externalLinkData.link_body,
        apikey: externalLinkData.link_apikey,
        status: externalLinkData.link_status,
        id: externalLinkData.link_id
    })
    return data
}

export const getExternalLink = async (id, type = "all") => {
    const items = await $authHost.get('externalLink/get?id=' + id + '&type=' + type)
    return items.data
}