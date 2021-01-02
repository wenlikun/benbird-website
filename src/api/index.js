
import ajax from './ajax'

// local env
const BASE_URL = 'http://localhost:8088'
// test env
//const BASE_URL = 'http://8.136.137.176:8088'
// prod env
//const BASE_URL = 'http://8.136.135.82:8088'

// 登录请求
export const login = (loginForm) => ajax(`${BASE_URL}/login`,loginForm,'POST')

