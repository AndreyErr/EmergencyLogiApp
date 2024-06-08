import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const createUser = async (user_data) => {
    const {data} = await $authHost.post('user/userReg', {
        login: user_data.login,
        pass: user_data.pass,
        status: user_data.status,
        access: user_data.access,
        type: user_data.type,
        name: user_data.name,
        email: user_data.email,
        phone: user_data.phone,
        user_add: user_data.user_add,
        personal_data: user_data.personal_data
    })
    return data
}

export const editUser = async (user_data, edit_type) => {
    const {data} = await $authHost.patch('user/userEdit', {
        login: user_data.login,
        status: user_data.status,
        access: user_data.access,
        name: user_data.name,
        type: user_data.type,
        email: user_data.email,
        phone: user_data.phone,
        personal_data: user_data.personal_data,
        user_add: user_data.user_add,
        edit_type: edit_type
    })
    return data
}

export const loginServ = async (login, pass) => {
    const {data} = await $host.post('user/userLogin', {
        login: login,
        pass: pass
    })
    localStorage.setItem('token', data.accessToken)
    return jwtDecode(data.accessToken)
}

export const changePasswordServ = async (login, email, name, pass, type, old_pass = "") => {
    try {
        const requestData = {
            login: login,
            email: email,
            name: name,
            type: type,
            old_pass: old_pass
        };

        if (pass !== "") {
            requestData.pass = pass;
        }

        const { data } = await $authHost.patch('user/editPass', requestData);
        return data;
    } catch (error) {
        // Обработка ошибки, если требуется
        throw error;
    }
}

export const check = async () => {
    if(localStorage.getItem('token')){
        const {data} = await $authHost.get('/user/auth')
        localStorage.setItem('token', data.accessToken)
        return jwtDecode(data.accessToken)
    }else{
        return null
    }
}

export const selectUsersTypes = async () => {
    const data = await $authHost.get('/user/selectUsersTypes')
    return data.data
}

export const updateUserStatusAct = async (id, status) => {
    const data = await $authHost.post('user/updateUserStatus', {
        id: id,
        status: status
    })
    return data
}

export const fatchUsers = async (limit = 20, page = 1, filter = 'all') => {
    const users = await $authHost.get('/user/selectUsers?limit=' + limit + '&page=' + page + '&filter=' + filter)
    return users
}

export const getUser = async () => {
    const users = await $authHost.get('/user/getUser')
    return users
}

export const searchUsersAct = async (str, limit = 10) => {
    const result = await $authHost.get('/user/searchUsers?str=' + str + '&limit=' + limit)
    return result
}