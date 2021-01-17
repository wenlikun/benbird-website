import request from '@/api/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
