import request from '@/api/request'

export function queryGoddessList(data) {
    return request({
        url: '/goddess/queryGoddessList',
        method: 'post',
        data
    })
}

export function addGoddess(data) {
    return request({
        url: '/goddess/addGoddess',
        method: 'post',
        data
    })
}

export function modifyGoddess(data) {
    return request({
        url: '/goddess/modifyGoddess',
        method: 'put',
        data
    })
}

export function deleteGoddess(id,updatedBy) {
    return request({
        url: '/goddess/deleteGoddess/'+id+'?updatedBy='+updatedBy,
        method: 'delete'
    })
}
