import axios, { ResponseType } from 'axios';

interface IRequestConfig {
    params?: any;
    data?: any;
    responseType?: ResponseType;
    noAuthToken?: boolean;
}

const { protocol, hostname } = window.location;
const urlSeparator = '//'
const port = ':3000'
const API_URL = protocol + urlSeparator + hostname + port;
// const API_URL = process.env.REACT_APP_API_URL || 'api'

export const ApiManager = {
    async get<T>(path: string, config: IRequestConfig = {}) {
        const url = API_URL + path
        const { params, responseType } = config;
        const response = await axios.get<T>(url, { params, responseType });
        return response;
    },

    async post<T>(path: string, config: IRequestConfig = {}) {
        const url = API_URL + path;
        const { params, data, responseType } = config;
        const response = await axios.post<T>(url, data, { params, responseType });
        return response;
    },

    async put<T>(path: string, config: IRequestConfig = {}) {
        const url = API_URL + path;
        const { params, data, responseType } = config;
        const response = await axios.put<T>(url, data, { params, responseType });
        return response;
    },

    async delete<T>(path: string, config: IRequestConfig = {}) {
        const url = API_URL + path;
        const { params, responseType } = config;
        const response = await axios.delete<T>(url, { params, responseType });
        return response;
    },
};