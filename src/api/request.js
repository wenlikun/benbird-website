import axios from 'axios';
import storeGetters from '@/store/getters'
import {getToken} from '@/utils/auth'

const BASE_URL = 'http://localhost:9001'

const service = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});
service.defaults.timeout = 10000;

service.interceptors.request.use(
    config => {
        if (storeGetters.token) {
            config.headers['Authorization'] =  getToken()
        }
        return config;
    },
    error => Promise.reject(error)
);
let isRefreshing = true;
service.interceptors.response.use(
    response => {
        console.log('api.interceptors.response'+response)
        if ((response.status === 200 || response.status === 201) && response.data.code === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },

    error => {
        console.log('api.interceptors.response'+error)
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    if (!error.request.responseURL.includes("api/token/")) {
                        if (isRefreshing) {
                            const refresh = JSON.stringify({
                                refresh: window.localStorage.getItem("refresh_token")
                            });
                            store.dispatch("requestRefresh", refresh);
                        }
                        isRefreshing = false;

                        window.localStorage.removeItem("access_token");
                    } else {
                        throw error;
                    }

                    break;

                case 403:
                    router.replace({
                        path: "/login",
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                case 404:
                    throw error;

                default:
                    throw error;
            }
            return Promise.reject(error.response);
        }
    }
);

export default service;
