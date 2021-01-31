import request from '@/api/request'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}


export function logOut(data) {
    return request({
        url: '/user/logOut',
        method: 'post',
        data
    })
}

export function queryUserList(data) {
    return request({
        url: '/user/queryUserList',
        method: 'post',
        data
    })
}

export function deleteUser(id,userName) {
    return request({
        url: '/user/delete/'+id+'?userName='+userName,
        method: 'delete',
    })
}


export function queryUserMenu(id) {
    return request({
        url:'/user/menuTree?id='+id,
        method:'get'
    })
}

export function confirmUserMenu(data) {
    return request({
        url:'/user/confirmMenu',
        method:'post',
        data
    })
}
