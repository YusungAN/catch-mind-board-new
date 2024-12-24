import axios, { Axios, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { APIResponse } from './response';

const client: Axios = axios.create({
    baseURL: 'https://catch-mind-back.fly.dev',
    headers: {
        'Content-Type': 'application/json',
    }
});

client.defaults.withCredentials = true;

client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token: string | undefined = localStorage['cmb-token'];
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.get<APIResponse<T>>(url, config);
        return response.data;
    } catch (error) {
        throw new Error((error as {message: string}).message);
    }
};


export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.post<APIResponse<T>>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error((error as {message: string}).message);
    }
};