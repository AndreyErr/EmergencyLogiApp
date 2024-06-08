import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const getAddress = async (addr, coord = false) => {
    const data = await $authHost.get('geo/getAddress?q='+ addr + '&coord=' + coord)
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

export const check = async () => {
    if(localStorage.getItem('token')){
        const {data} = await $authHost.get('/user/auth')
        localStorage.setItem('token', data.accessToken)
        return jwtDecode(data.accessToken)
    }else{
        return null
    }
}